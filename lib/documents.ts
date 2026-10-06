import { getCurrentCompanyId } from "@/lib/auth/ensure-company";
import { recordEvent } from "@/lib/history";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export async function uploadStepDocument(input: { guidedInstanceId: string; stepId: string; file: File }) {
  const supabase = getSupabaseBrowserClient();
  const companyId = await getCurrentCompanyId(supabase);
  const { data: userData } = await supabase.auth.getUser();
  const path = `${companyId}/${input.guidedInstanceId}/${input.stepId}/${crypto.randomUUID()}-${input.file.name}`;
  const { error: uploadError } = await supabase.storage.from("onboarding-documents").upload(path, input.file);
  if (uploadError) throw new Error("Filen kunde inte laddas upp.");
  const { error } = await supabase.from("onboarding_documents").insert({
    company_id: companyId,
    guided_instance_id: input.guidedInstanceId,
    step_id: input.stepId,
    title: input.file.name,
    storage_path: path,
    mime_type: input.file.type,
    created_by: userData.user?.id ?? null,
  });
  if (error) throw new Error("Dokumentet kunde inte kopplas till momentet.");
  await recordEvent({ eventType: "document.uploaded", resourceType: "guided_instance", resourceId: input.guidedInstanceId, summary: `Laddade upp ${input.file.name}` });
}

export async function saveWorkspaceText(guidedInstanceId: string, text: string) {
  const supabase = getSupabaseBrowserClient();
  const companyId = await getCurrentCompanyId(supabase);
  const { data: userData } = await supabase.auth.getUser();
  const path = `${companyId}/${guidedInstanceId}/workspace/latest.txt`;
  const { error: uploadError } = await supabase.storage.from("onboarding-documents").upload(path, new Blob([text], { type: "text/plain" }), { upsert: true });
  if (uploadError) throw new Error("Dokumentet kunde inte sparas.");
  await supabase.from("onboarding_documents").insert({
    company_id: companyId,
    guided_instance_id: guidedInstanceId,
    step_id: "workspace",
    title: "Dokumentutkast",
    storage_path: path,
    mime_type: "text/plain",
    created_by: userData.user?.id ?? null,
  });
  await recordEvent({ eventType: "document.saved", resourceType: "guided_instance", resourceId: guidedInstanceId, summary: "Sparade dokumentutkastet" });
}

export async function loadWorkspaceText(guidedInstanceId: string) {
  const supabase = getSupabaseBrowserClient();
  const companyId = await getCurrentCompanyId(supabase);
  const path = `${companyId}/${guidedInstanceId}/workspace/latest.txt`;
  const { data, error } = await supabase.storage.from("onboarding-documents").download(path);
  if (error || !data) return null;
  return data.text();
}

function pdfEscape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)").slice(0, 110);
}

export function downloadOnboardingPdf(input: { title: string; participant: string; lines: string[] }) {
  const plain = (value: string) => value.replace(/[åä]/g, "a").replace(/[ÅÄ]/g, "A").replace(/ö/g, "o").replace(/Ö/g, "O");
  const lines = [`Onboarding: ${input.title}`, `Deltagare: ${input.participant}`, ""].concat(input.lines).flatMap((line) => {
    const text = plain(line);
    const parts = [];
    for (let i = 0; i < text.length; i += 90) parts.push(text.slice(i, i + 90));
    return parts.length ? parts : [""];
  });
  const pages = [];
  for (let i = 0; i < lines.length; i += 40) pages.push(lines.slice(i, i + 40));
  const objects = ["1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj"];
  const kids = pages.map((_, index) => `${index + 3} 0 R`).join(" ");
  objects.push(`2 0 obj << /Type /Pages /Kids [${kids}] /Count ${pages.length} >> endobj`);
  pages.forEach((page, index) => {
    const stream = page.map((line, lineIndex) => `BT /F1 11 Tf 48 ${780 - lineIndex * 18} Td (${pdfEscape(line)}) Tj ET`).join("\n");
    const contentId = 3 + pages.length + index;
    objects.push(`${index + 3} 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${3 + pages.length * 2} 0 R >> >> >> endobj`);
    objects.push(`${contentId} 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`);
  });
  objects.push(`${3 + pages.length * 2} 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj`);
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => { pdf += `${String(offset).padStart(10, "0")} 00000 n \n`; });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "onboarding.pdf";
  link.click();
  URL.revokeObjectURL(url);
}

