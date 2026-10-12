"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Pencil, Plus, Save, Trash2, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { industries, industryById } from "@/lib/industries";

type Position = { id: string; name: string; role: string };
type Employee = { id: string; name: string; position_id: string | null; can_manage: boolean; can_mentor: boolean };
const emptyFacts = { work_hours: "", sick_contact: "", safety_rep: "", policies: "", has_alarm: "", follow_up_days: "" };

export default function RegisterPage() {
  const [orgId, setOrgId] = useState<string | null>(null);
  const [industry, setIndustry] = useState("construction");
  const [employeeCount, setEmployeeCount] = useState("1–5");
  const [positions, setPositions] = useState<Position[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newPosition, setNewPosition] = useState({ name: "", role: "" });
  const [editingPosition, setEditingPosition] = useState<string | null>(null);
  const [facts, setFacts] = useState(emptyFacts);
  const [status, setStatus] = useState<string | null>(null);

  async function load() {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();
    const { data: member } = await supabase.from("organization_members").select("organization_id").eq("user_id", user.user?.id).limit(1).maybeSingle();
    if (!member) return;
    setOrgId(member.organization_id);
    const [settings, savedFacts, positionRows, employeeRows] = await Promise.all([
      supabase.from("company_settings").select("industry,employee_count").eq("organization_id", member.organization_id).maybeSingle(),
      supabase.from("company_facts").select("work_hours,sick_contact,safety_rep,policies,has_alarm,follow_up_days").eq("organization_id", member.organization_id).maybeSingle(),
      supabase.from("positions").select("id,name,role").eq("organization_id", member.organization_id).order("name"),
      supabase.from("employees").select("id,name,position_id,can_manage,can_mentor").eq("organization_id", member.organization_id).order("name"),
    ]);
    if (settings.data?.industry) setIndustry(settings.data.industry);
    if (settings.data?.employee_count) setEmployeeCount(settings.data.employee_count);
    if (savedFacts.data) setFacts({ ...emptyFacts, ...savedFacts.data, follow_up_days: savedFacts.data.follow_up_days == null ? "" : String(savedFacts.data.follow_up_days) });
    setPositions(positionRows.data ?? []); setEmployees(employeeRows.data ?? []);
  }
  // Hydrate the register once when it opens.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, []);

  async function saveCompany() {
    if (!orgId) return;
    const supabase = createClient();
    await supabase.from("company_settings").upsert({ organization_id: orgId, industry, employee_count: employeeCount });
    await supabase.from("company_facts").upsert({ organization_id: orgId, ...facts, follow_up_days: facts.follow_up_days ? Number(facts.follow_up_days) : null });
    setStatus("Företagsuppgifterna är sparade.");
  }
  async function createPosition(event: FormEvent) {
    event.preventDefault(); if (!orgId || !newPosition.name.trim()) return;
    await createClient().from("positions").insert({ organization_id: orgId, name: newPosition.name.trim(), role: newPosition.role.trim() || "Egen befattning" });
    setNewPosition({ name: "", role: "" }); setStatus("Befattningen är skapad."); await load();
  }
  async function updatePosition(position: Position) {
    if (!position.name.trim()) return;
    await createClient().from("positions").update({ name: position.name.trim(), role: position.role.trim() || "Egen befattning" }).eq("id", position.id);
    setEditingPosition(null); setStatus("Befattningen är uppdaterad."); await load();
  }
  async function deletePosition(id: string) {
    if (!confirm("Ta bort befattningen? Medarbetare kopplade till den blir utan befattning.")) return;
    await createClient().from("positions").delete().eq("id", id); setStatus("Befattningen är borttagen."); await load();
  }
  async function updateEmployee(employee: Employee, position_id: string) {
    await createClient().from("employees").update({ position_id: position_id || null }).eq("id", employee.id);
    setEmployees((current) => current.map((item) => item.id === employee.id ? { ...item, position_id: position_id || null } : item));
    setStatus(`${employee.name} är kopplad till ${position_id ? positions.find((position) => position.id === position_id)?.name : "ingen befattning"}.`);
  }

  return <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
    <header className="flex flex-col gap-5"><div className="flex items-start justify-between gap-4"><div><Link className="inline-flex items-center gap-1 text-sm font-semibold text-primary" href="/foretaget"><ArrowLeft className="size-4" />Till Företaget</Link><p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">Administration</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Företagsregistret</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Här ändrar du företagets uppgifter, skapar befattningar och kopplar medarbetare. När du vill se helheten går du tillbaka till Företaget.</p></div><Button variant="outline" asChild><Link href="/foretaget">Visa översikten</Link></Button></div>
      <nav className="flex flex-wrap gap-2 border-b pb-4" aria-label="Hoppa till"><a className="rounded-full border px-3 py-1.5 text-sm hover:bg-muted" href="#foretagsuppgifter">Företagsuppgifter</a><a className="rounded-full border px-3 py-1.5 text-sm hover:bg-muted" href="#befattningar">Befattningar <span className="text-muted-foreground">{positions.length}</span></a><a className="rounded-full border px-3 py-1.5 text-sm hover:bg-muted" href="#medarbetare">Medarbetare <span className="text-muted-foreground">{employees.length}</span></a></nav>
    </header>

    <section className="scroll-mt-6 rounded-3xl border bg-card p-6" id="foretagsuppgifter"><div className="flex flex-col gap-1"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Steg 1</p><h2 className="text-2xl font-semibold">Företagsuppgifter</h2><p className="text-sm text-muted-foreground">Information om verksamheten som visas på Företaget.</p></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm">Bransch<select className="mt-1 h-11 w-full rounded-xl border bg-background px-3" value={industry} onChange={(event) => setIndustry(event.target.value)}>{industries.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="text-sm">Antal anställda<select className="mt-1 h-11 w-full rounded-xl border bg-background px-3" value={employeeCount} onChange={(event) => setEmployeeCount(event.target.value)}>{["1–5", "6–20", "21–50", "51–250", "250+"].map((value) => <option key={value}>{value}</option>)}</select></label></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><Input aria-label="Arbetstider" placeholder="Arbetstider" value={facts.work_hours} onChange={(event) => setFacts({ ...facts, work_hours: event.target.value })} /><Input aria-label="Sjukanmälan" placeholder="Vem tar emot sjukanmälan?" value={facts.sick_contact} onChange={(event) => setFacts({ ...facts, sick_contact: event.target.value })} /></div><Button className="mt-5" onClick={() => void saveCompany()}><Save data-icon="inline-start" />Spara företagsuppgifter</Button></section>

    <section className="scroll-mt-6 rounded-3xl border bg-card p-6" id="befattningar"><div className="flex flex-col gap-1"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Steg 2 · Fristående</p><h2 className="text-2xl font-semibold">Befattningar</h2><p className="text-sm text-muted-foreground">Skapa befattningar här först. En befattning kan sedan kopplas till flera medarbetare.</p></div><form className="mt-5 grid gap-3 rounded-2xl bg-muted/50 p-4 sm:grid-cols-[1fr_1fr_auto]" onSubmit={createPosition}><Input required aria-label="Befattningens namn" placeholder="Namn, till exempel Montör" value={newPosition.name} onChange={(event) => setNewPosition({ ...newPosition, name: event.target.value })} /><Input aria-label="Beskrivning av rollen" placeholder="Beskrivning, till exempel Yrkesmedarbetare" value={newPosition.role} onChange={(event) => setNewPosition({ ...newPosition, role: event.target.value })} /><Button type="submit"><Plus data-icon="inline-start" />Skapa</Button></form><div className="mt-5 divide-y">{positions.length ? positions.map((position) => <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between" key={position.id}>{editingPosition === position.id ? <div className="grid flex-1 gap-2 sm:grid-cols-2"><Input aria-label="Befattningens namn" value={position.name} onChange={(event) => setPositions(positions.map((item) => item.id === position.id ? { ...item, name: event.target.value } : item))} /><Input aria-label="Beskrivning av rollen" value={position.role} onChange={(event) => setPositions(positions.map((item) => item.id === position.id ? { ...item, role: event.target.value } : item))} /></div> : <div className="min-w-0"><p className="font-medium">{position.name}</p><p className="text-sm text-muted-foreground">{position.role} · {employees.filter((employee) => employee.position_id === position.id).length} kopplade</p></div>}<div className="flex gap-2">{editingPosition === position.id ? <Button size="sm" onClick={() => void updatePosition(position)}><Check data-icon="inline-start" />Klar</Button> : <Button size="sm" variant="outline" onClick={() => setEditingPosition(position.id)}><Pencil data-icon="inline-start" />Redigera</Button>}<Button size="sm" variant="ghost" onClick={() => void deletePosition(position.id)} aria-label={`Ta bort ${position.name}`}><Trash2 /></Button></div></div>) : <p className="py-5 text-sm text-muted-foreground">Inga befattningar ännu. Skapa den första ovan — du behöver inte lägga till en medarbetare först.</p>}</div></section>

    <section className="scroll-mt-6 rounded-3xl border bg-card p-6" id="medarbetare"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Steg 3 · Koppla</p><h2 className="text-2xl font-semibold">Medarbetare</h2><p className="text-sm text-muted-foreground">Välj en befintlig befattning för varje medarbetare. Ändringen sparas direkt.</p></div><Button variant="outline" size="sm" asChild><Link href="/onboarding/new"><UserPlus data-icon="inline-start" />Lägg till medarbetare</Link></Button></div><div className="mt-5 divide-y">{employees.map((employee) => <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between" key={employee.id}><div><p className="font-medium">{employee.name}</p><p className="text-sm text-muted-foreground">{employee.can_manage ? "Chef · " : ""}{employee.can_mentor ? "Mentor" : ""}</p></div><select className="h-10 rounded-xl border bg-background px-3 text-sm sm:w-72" aria-label={`Befattning för ${employee.name}`} value={employee.position_id ?? ""} onChange={(event) => void updateEmployee(employee, event.target.value)}><option value="">Ingen befattning ännu</option>{positions.map((position) => <option key={position.id} value={position.id}>{position.name}</option>)}</select></div>)}</div>{employees.length === 0 && <p className="mt-5 rounded-2xl bg-muted/50 p-4 text-sm text-muted-foreground">Inga medarbetare registrerade ännu. Lägg till den första med knappen ovan.</p>}</section>
    {status && <p className="sticky bottom-4 self-start rounded-full border bg-background px-4 py-2 text-sm shadow-sm" role="status">{status}</p>}
  </main>;
}
