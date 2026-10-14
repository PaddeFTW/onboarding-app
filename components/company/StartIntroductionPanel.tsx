"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useGuidedOnboardingStore } from "@/components/providers/guided-onboarding-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isSmallCompany } from "@/lib/company-facts";
import type { RegistryEmployee, RegistryPosition } from "@/lib/company-registry";
import {
  loadIntroductionFormData,
  startIntroductionForEmployee,
} from "@/components/company/start-introduction";

export function StartIntroductionPanel({
  prefillEmployee,
  onCancel,
  onStarted,
}: {
  prefillEmployee?: RegistryEmployee | null;
  onCancel?: () => void;
  onStarted?: (instanceId: string) => void;
}) {
  const { t } = useLocale();
  const router = useRouter();
  const { addInstance } = useGuidedOnboardingStore();

  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [employees, setEmployees] = useState<RegistryEmployee[]>([]);
  const [positions, setPositions] = useState<RegistryPosition[]>([]);
  const [employeeCount, setEmployeeCount] = useState("");

  const [name, setName] = useState(prefillEmployee?.name ?? "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [positionId, setPositionId] = useState(prefillEmployee?.positionId ?? "");
  const [managerId, setManagerId] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [sendInvite, setSendInvite] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const data = await loadIntroductionFormData();
        setEmployees(data.employees);
        setPositions(data.positions);
        setEmployeeCount(data.employeeCount);
        if (!positionId) {
          setPositionId(
            prefillEmployee?.positionId || data.positions[0]?.id || ""
          );
        }
        const managers = data.employees.filter((item) => item.canManage);
        if (!managerId && managers[0]) setManagerId(managers[0].id);
        if (!mentorId) {
          const mentors = data.employees.filter((item) => item.canMentor);
          setMentorId(mentors[0]?.id || managers[0]?.id || "");
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : t("registry.loadError"));
      } finally {
        setReady(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load once on open
  }, []);

  useEffect(() => {
    if (!prefillEmployee) return;
    setName(prefillEmployee.name);
    if (prefillEmployee.positionId) setPositionId(prefillEmployee.positionId);
  }, [prefillEmployee]);

  const managers = useMemo(
    () => employees.filter((item) => item.canManage),
    [employees]
  );
  const mentors = useMemo(
    () => employees.filter((item) => item.canMentor),
    [employees]
  );
  const smallCompany = isSmallCompany(employeeCount);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = await startIntroductionForEmployee({
        employeeId: prefillEmployee?.id,
        name,
        email,
        password: password.trim() || undefined,
        positionId,
        managerId,
        mentorId: smallCompany ? managerId : mentorId,
        sendInvite,
      });
      addInstance(result.instance);
      toast.success(`Introduktion startad för ${result.employee.name}`);
      if (result.inviteStatus !== "skipped") {
        toast.message(result.inviteMessage);
      }
      onStarted?.(result.instance.id);
      router.push(`/onboarding/guided/${result.instance.id}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Kunde inte starta introduktionen.";
      setError(message);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  if (!ready) {
    return (
      <div className="rounded-3xl border border-border bg-card p-4 text-sm text-muted-foreground">
        Laddar formulär…
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 text-card-foreground"
    >
      <div>
        <h2 className="text-lg font-semibold">{t("company.startIntro")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Skapa eller välj medarbetare, bjud in via e-post och starta en guidad
          introduktion kopplad till personen.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="intro-name">{t("registry.employeeName")}</Label>
          <Input
            id="intro-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            disabled={Boolean(prefillEmployee)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="intro-email">E-post / användarnamn</Label>
          <Input
            id="intro-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="namn@foretag.se"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="intro-password">Tillfälligt lösenord (valfritt)</Label>
          <Input
            id="intro-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Valfritt — delas separat"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="intro-position">{t("registry.positionName")}</Label>
          {positions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t("registry.addPositionFirst")}
            </p>
          ) : (
            <select
              id="intro-position"
              className="h-12 w-full rounded-2xl border border-input bg-card px-4 text-sm"
              value={positionId}
              onChange={(event) => setPositionId(event.target.value)}
              required
              disabled={Boolean(prefillEmployee?.positionId)}
            >
              <option value="">{t("registry.choosePosition")}</option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="intro-manager">{t("registry.manager")}</Label>
          <select
            id="intro-manager"
            className="h-12 w-full rounded-2xl border border-input bg-card px-4 text-sm"
            value={managerId}
            onChange={(event) => setManagerId(event.target.value)}
            required
          >
            <option value="">Välj chef</option>
            {(managers.length ? managers : employees).map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>
        {!smallCompany ? (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="intro-mentor">{t("registry.mentor")}</Label>
            <select
              id="intro-mentor"
              className="h-12 w-full rounded-2xl border border-input bg-card px-4 text-sm"
              value={mentorId}
              onChange={(event) => setMentorId(event.target.value)}
              required
            >
              <option value="">Välj mentor</option>
              {(mentors.length ? mentors : employees).map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>

      <label className="flex items-center gap-2 text-sm">
        <Checkbox
          checked={sendInvite}
          onCheckedChange={(value) => setSendInvite(value === true)}
        />
        Skicka inbjudan så den nyanställde kan logga in
      </label>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={busy || positions.length === 0}>
          {busy ? <Loader2 className="size-4 animate-spin" /> : null}
          {t("company.startIntro")}
        </Button>
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel} disabled={busy}>
            Avbryt
          </Button>
        ) : null}
      </div>
    </form>
  );
}
