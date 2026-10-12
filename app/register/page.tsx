"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Plus, Save, Trash2 } from "lucide-react";

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
    await createClient().from("positions").update({ name: position.name.trim(), role: position.role.trim() }).eq("id", position.id);
    setEditingPosition(null); setStatus("Befattningen är uppdaterad."); await load();
  }
  async function deletePosition(id: string) {
    if (!confirm("Ta bort befattningen? Medarbetare kopplade till den blir utan befattning.")) return;
    await createClient().from("positions").delete().eq("id", id); setStatus("Befattningen är borttagen."); await load();
  }
  async function updateEmployee(employee: Employee, position_id: string) {
    await createClient().from("employees").update({ position_id: position_id || null }).eq("id", employee.id);
    setEmployees((current) => current.map((item) => item.id === employee.id ? { ...item, position_id: position_id || null } : item));
  }
  const positionName = (id: string | null) => positions.find((position) => position.id === id)?.name ?? "Ingen befattning";

  return <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><Link className="inline-flex items-center gap-1 text-sm font-semibold text-primary" href="/foretaget"><ArrowLeft className="size-4" />Till Företaget</Link><p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">Administration</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Företagsregistret</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">Här lägger du till, ändrar och administrerar företagets information. Översikten Företaget är platsen för att se hur allt hänger ihop.</p></div></header>
    <section className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><div className="rounded-3xl border bg-card p-6"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Företagsuppgifter</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm">Bransch<select className="mt-1 h-11 w-full rounded-xl border bg-background px-3" value={industry} onChange={(event) => setIndustry(event.target.value)}>{industries.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="text-sm">Antal anställda<select className="mt-1 h-11 w-full rounded-xl border bg-background px-3" value={employeeCount} onChange={(event) => setEmployeeCount(event.target.value)}>{["1–5", "6–20", "21–50", "51–250", "250+"].map((value) => <option key={value}>{value}</option>)}</select></label></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><Input aria-label="Arbetstider" placeholder="Arbetstider" value={facts.work_hours} onChange={(event) => setFacts({ ...facts, work_hours: event.target.value })} /><Input aria-label="Sjukanmälan" placeholder="Vem tar emot sjukanmälan?" value={facts.sick_contact} onChange={(event) => setFacts({ ...facts, sick_contact: event.target.value })} /></div><Button className="mt-5" onClick={() => void saveCompany()}><Save />Spara företagsuppgifter</Button></div><div className="rounded-3xl border bg-primary/5 p-6"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Snabb hjälp</p><h2 className="mt-2 text-xl font-semibold">Börja med befattningar</h2><p className="mt-2 text-sm text-muted-foreground">Skapa befattningar först. När du lägger till medarbetare väljer du sedan en befintlig befattning – utan att skapa samma befattning igen.</p><p className="mt-4 text-sm font-medium">Vald bransch: {industryById(industry)?.name ?? "–"}</p></div></section>
    <section id="befattningar" className="rounded-3xl border bg-card p-6"><div className="flex flex-col gap-1"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Register</p><h2 className="text-2xl font-semibold">Befattningar</h2><p className="text-sm text-muted-foreground">Befattningar är fristående och kan skapas innan någon medarbetare finns.</p></div><form className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]" onSubmit={createPosition}><Input required placeholder="Namn, till exempel Montör" value={newPosition.name} onChange={(event) => setNewPosition({ ...newPosition, name: event.target.value })} /><Input placeholder="Roll, till exempel Yrkesmedarbetare" value={newPosition.role} onChange={(event) => setNewPosition({ ...newPosition, role: event.target.value })} /><Button type="submit"><Plus />Skapa befattning</Button></form><div className="mt-5 divide-y">{positions.map((position) => <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between" key={position.id}>{editingPosition === position.id ? <div className="flex flex-1 gap-2"><Input value={position.name} onChange={(event) => setPositions(positions.map((item) => item.id === position.id ? { ...item, name: event.target.value } : item))} /><Input value={position.role} onChange={(event) => setPositions(positions.map((item) => item.id === position.id ? { ...item, role: event.target.value } : item))} /></div> : <div><p className="font-medium">{position.name}</p><p className="text-sm text-muted-foreground">{position.role}</p></div>}<div className="flex gap-2">{editingPosition === position.id ? <Button size="sm" onClick={() => void updatePosition(position)}><Save />Spara</Button> : <Button size="sm" variant="outline" onClick={() => setEditingPosition(position.id)}><Pencil />Redigera</Button>}<Button size="sm" variant="ghost" onClick={() => void deletePosition(position.id)} aria-label={`Ta bort ${position.name}`}><Trash2 /></Button></div></div>)}</div></section>
    <section id="medarbetare" className="rounded-3xl border bg-card p-6"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Register</p><h2 className="mt-1 text-2xl font-semibold">Medarbetare</h2><p className="text-sm text-muted-foreground">Koppla varje medarbetare till en befintlig befattning.</p></div><div className="mt-5 divide-y">{employees.map((employee) => <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between" key={employee.id}><div><p className="font-medium">{employee.name}</p><p className="text-sm text-muted-foreground">{employee.can_manage ? "Chef · " : ""}{employee.can_mentor ? "Mentor" : ""}</p></div><select className="h-10 rounded-xl border bg-background px-3 text-sm sm:w-64" aria-label={`Befattning för ${employee.name}`} value={employee.position_id ?? ""} onChange={(event) => void updateEmployee(employee, event.target.value)}><option value="">Ingen befattning</option>{positions.map((position) => <option key={position.id} value={position.id}>{position.name}</option>)}</select><span className="sr-only">Nuvarande: {positionName(employee.position_id)}</span></div>)}</div>{employees.length === 0 && <p className="mt-4 text-sm text-muted-foreground">Inga medarbetare registrerade ännu. Lägg till dem via Ny introduktion.</p>}</section>
    {status && <p className="text-sm text-muted-foreground" role="status">{status}</p>}
  </main>;
}
