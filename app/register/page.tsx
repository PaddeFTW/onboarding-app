"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { industries, industryById } from "@/lib/industries";

type Position = { id: string; name: string; role: string };
type Employee = { id: string; name: string; position_id: string; can_manage: boolean; can_mentor: boolean };

export default function RegisterPage() {
  const [orgId, setOrgId] = useState<string | null>(null);
  const [industry, setIndustry] = useState("construction");
  const [employeeCount, setEmployeeCount] = useState("1–5");
  const [positions, setPositions] = useState<Position[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState("");
  const [positionId, setPositionId] = useState("");
  const [canManage, setCanManage] = useState(false);
  const [canMentor, setCanMentor] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  async function load() {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();
    const { data: member } = await supabase.from("organization_members").select("organization_id").eq("user_id", user.user?.id).limit(1).maybeSingle();
    if (!member) return;
    setOrgId(member.organization_id);
    const { data: settings } = await supabase.from("company_settings").select("industry,employee_count").eq("organization_id", member.organization_id).maybeSingle();
    if (settings?.industry) setIndustry(settings.industry);
    if (settings?.employee_count) setEmployeeCount(settings.employee_count);
    const { data: positionRows } = await supabase.from("positions").select("id,name,role").eq("organization_id", member.organization_id);
    setPositions(positionRows ?? []);
    const { data: employeeRows } = await supabase.from("employees").select("id,name,position_id,can_manage,can_mentor").eq("organization_id", member.organization_id);
    setEmployees(employeeRows ?? []);
  }

  useEffect(() => { void load(); }, []);

  async function saveIndustry() {
    if (!orgId) return;
    const supabase = createClient();
    await supabase.from("company_settings").upsert({ organization_id: orgId, industry, employee_count: employeeCount });
    const suggestions = industryById(industry)?.positions ?? [];
    if (positions.length === 0) {
      await supabase.from("positions").insert(suggestions.map(([name, role]) => ({ organization_id: orgId, name, role })));
    }
    setStatus("Branschen är sparad.");
    await load();
  }

  async function addEmployee(event: FormEvent) {
    event.preventDefault();
    if (!orgId || !positionId) return;
    const supabase = createClient();
    await supabase.from("employees").insert({ organization_id: orgId, name, position_id: positionId, can_manage: canManage, can_mentor: canMentor });
    setName("");
    setStatus("Medarbetaren är tillagd.");
    await load();
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-5 px-4 py-10">
      <Link className="text-sm font-semibold text-[#5b4dff]" href="/">Tillbaka</Link>
      <h1 className="text-2xl font-semibold">Företagsregister</h1>
      <p className="text-sm text-neutral-500">Bransch, befattningar och medarbetare. Ny introduktion väljer härifrån.</p>
      <label className="text-sm">Bransch
        <select className="mt-1 h-12 w-full rounded-full border px-4" value={industry} onChange={(event) => setIndustry(event.target.value)}>
          {industries.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </label>
      <label className="text-sm">Antal anställda
        <select className="mt-1 h-12 w-full rounded-full border px-4" value={employeeCount} onChange={(event) => setEmployeeCount(event.target.value)}>
          {['1–5', '6–20', '21–50', '51–250', '250+'].map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <Button className="h-12 w-fit rounded-full" onClick={() => void saveIndustry()}>Spara företagsuppgifter</Button>
      <section className="rounded-2xl border p-4">
        <h2 className="font-semibold">Befattningar</h2>
        {positions.length === 0 ? <p className="mt-2 text-sm text-neutral-500">Spara branschen för att få förslag.</p> : positions.map((item) => <p key={item.id} className="mt-1 text-sm">{item.name} · {item.role}</p>)}
      </section>
      <form className="flex flex-col gap-3 rounded-2xl border p-4" onSubmit={addEmployee}>
        <h2 className="font-semibold">Lägg till medarbetare</h2>
        <Input required placeholder="Namn" value={name} onChange={(event) => setName(event.target.value)} />
        <select className="h-12 rounded-full border px-4" required value={positionId} onChange={(event) => setPositionId(event.target.value)}>
          <option value="">Välj befattning</option>
          {positions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
        <label className="text-sm"><input type="checkbox" checked={canManage} onChange={(event) => setCanManage(event.target.checked)} /> Kan vara ansvarig chef</label>
        <label className="text-sm"><input type="checkbox" checked={canMentor} onChange={(event) => setCanMentor(event.target.checked)} /> Kan vara mentor</label>
        <Button className="h-12 rounded-full" type="submit">Lägg till</Button>
      </form>
      {employees.map((item) => <p key={item.id} className="text-sm">{item.name}{item.can_manage ? " · chef" : ""}{item.can_mentor ? " · mentor" : ""}</p>)}
      {status ? <p className="text-sm text-neutral-600">{status}</p> : null}
    </main>
  );
}
