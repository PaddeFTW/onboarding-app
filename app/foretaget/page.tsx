"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Building2, Pencil, Users } from "lucide-react";

import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { industryById } from "@/lib/industries";

type Position = { id: string; name: string; role: string };
type Employee = { id: string; name: string; position_id: string | null; can_manage: boolean; can_mentor: boolean };
type CompanyData = { industry: string; employeeCount: string; facts: Record<string, string>; positions: Position[]; employees: Employee[] };

const factLabels: Record<string, string> = { work_hours: "Arbetstider", sick_contact: "Sjukanmälan", safety_rep: "Skyddsombud", policies: "Policyer", has_alarm: "Larm", follow_up_days: "Uppföljning" };

export default function CompanyPage() {
  const [data, setData] = useState<CompanyData | null>(null);

  useEffect(() => {
    void (async () => {
      const supabase = createClient();
      const { data: user } = await supabase.auth.getUser();
      const { data: member } = await supabase.from("organization_members").select("organization_id").eq("user_id", user.user?.id).limit(1).maybeSingle();
      if (!member) return;
      const [settings, facts, positions, employees] = await Promise.all([
        supabase.from("company_settings").select("industry,employee_count").eq("organization_id", member.organization_id).maybeSingle(),
        supabase.from("company_facts").select("work_hours,sick_contact,safety_rep,policies,has_alarm,follow_up_days").eq("organization_id", member.organization_id).maybeSingle(),
        supabase.from("positions").select("id,name,role").eq("organization_id", member.organization_id).order("name"),
        supabase.from("employees").select("id,name,position_id,can_manage,can_mentor").eq("organization_id", member.organization_id).order("name"),
      ]);
      setData({ industry: settings.data?.industry ?? "", employeeCount: settings.data?.employee_count ?? "", facts: (facts.data ?? {}) as Record<string, string>, positions: positions.data ?? [], employees: employees.data ?? [] });
    })();
  }, []);

  const positionName = (id: string | null) => data?.positions.find((position) => position.id === id)?.name ?? "Ingen befattning kopplad";
  const filledFacts = Object.entries(data?.facts ?? {}).filter(([, value]) => value);
  const unassignedCount = data?.employees.filter((employee) => !employee.position_id).length ?? 0;

  return (
    <PageContainer className="flex flex-col gap-8">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">Översikt</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Företaget</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Din samlade bild av företaget. Här tittar du på informationen — ändringar görs i Företagsregistret.</p>
        </div>
        <Button asChild><Link href="/register"><Pencil data-icon="inline-start" />Administrera i registret</Link></Button>
      </header>

      <section className="grid gap-3 sm:grid-cols-3" aria-label="Sammanfattning">
        {[{ label: "Medarbetare", value: data?.employees.length ?? "–", icon: Users, href: "/register#medarbetare" }, { label: "Befattningar", value: data?.positions.length ?? "–", icon: BriefcaseBusiness, href: "/register#befattningar" }, { label: "Företagsstorlek", value: data?.employeeCount || "–", icon: Building2, href: "/register#foretagsuppgifter" }].map(({ label, value, icon: Icon, href }) => <Link className="group" href={href} key={label}><Card className="flex items-center gap-4 p-5 transition-colors group-hover:border-primary/40"><div className="rounded-2xl bg-primary/10 p-3 text-primary"><Icon className="size-5" /></div><div className="min-w-0"><p className="truncate text-2xl font-semibold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div><ArrowRight className="ml-auto text-muted-foreground transition-transform group-hover:translate-x-1" /></Card></Link>)}
      </section>

      {unassignedCount > 0 && <Card className="border-amber-500/30 bg-amber-500/5 p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{unassignedCount} medarbetare saknar befattning</p><p className="mt-1 text-sm text-muted-foreground">Koppla dem till en befintlig befattning i registret för en komplett översikt.</p></div><Button variant="outline" size="sm" asChild><Link href="/register#medarbetare">Koppla befattning <ArrowRight data-icon="inline-end" /></Link></Button></div></Card>}

      <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
        <Card className="p-6" id="grunduppgifter"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Företagsuppgifter</p><h2 className="mt-2 text-xl font-semibold">Er verksamhet</h2></div><Badge variant="secondary">{industryById(data?.industry ?? "")?.name ?? "Bransch ej vald"}</Badge></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><div><p className="text-xs text-muted-foreground">Bransch</p><p className="mt-1 font-medium">{industryById(data?.industry ?? "")?.name ?? "Inte registrerad"}</p></div><div><p className="text-xs text-muted-foreground">Antal anställda</p><p className="mt-1 font-medium">{data?.employeeCount || "Inte registrerat"}</p></div></div></Card>
        <Card className="p-6"><p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Rutiner</p><h2 className="mt-2 text-xl font-semibold">Viktigt i vardagen</h2><div className="mt-4 grid gap-3">{filledFacts.length ? filledFacts.map(([key, value]) => <div className="flex justify-between gap-4 border-b pb-2 text-sm last:border-0 last:pb-0" key={key}><span className="text-muted-foreground">{factLabels[key] ?? key}</span><span className="text-right font-medium">{key === "follow_up_days" ? `Efter ${value} dagar` : value}</span></div>) : <p className="text-sm text-muted-foreground">Inga rutiner registrerade ännu.</p>}</div></Card>
      </div>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="p-6"><div className="flex items-start justify-between gap-3"><div><h2 className="text-xl font-semibold">Medarbetare</h2><p className="mt-1 text-sm text-muted-foreground">{data?.employees.length ?? 0} registrerade</p></div><Button variant="ghost" size="sm" asChild><Link href="/register#medarbetare">Administrera <ArrowRight data-icon="inline-end" /></Link></Button></div><div className="mt-5 grid gap-2">{data?.employees.length ? data.employees.map((employee) => <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 p-3" key={employee.id}><div className="min-w-0"><p className="truncate font-medium">{employee.name}</p><p className="text-sm text-muted-foreground">{positionName(employee.position_id)}</p></div><div className="flex shrink-0 gap-1">{employee.can_manage && <Badge variant="outline">Chef</Badge>}{employee.can_mentor && <Badge variant="outline">Mentor</Badge>}</div></div>) : <p className="text-sm text-muted-foreground">Inga medarbetare registrerade ännu.</p>}</div></Card>
        <Card className="p-6"><div className="flex items-start justify-between gap-3"><div><h2 className="text-xl font-semibold">Befattningar</h2><p className="mt-1 text-sm text-muted-foreground">{data?.positions.length ?? 0} registrerade · kan delas av flera</p></div><Button variant="ghost" size="sm" asChild><Link href="/register#befattningar">Administrera <ArrowRight data-icon="inline-end" /></Link></Button></div><div className="mt-5 grid gap-2">{data?.positions.length ? data.positions.map((position) => <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 p-3" key={position.id}><div><p className="font-medium">{position.name}</p><p className="text-sm text-muted-foreground">{position.role}</p></div><Badge variant="secondary">{data.employees.filter((employee) => employee.position_id === position.id).length} medarbetare</Badge></div>) : <p className="text-sm text-muted-foreground">Inga befattningar registrerade ännu.</p>}</div></Card>
      </section>
    </PageContainer>
  );
}
