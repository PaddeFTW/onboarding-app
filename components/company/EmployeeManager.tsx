"use client";

import { useMemo, useState } from "react";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useLocale } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createEmployee,
  deleteEmployee,
  updateEmployee,
  type RegistryEmployee,
  type RegistryPosition,
} from "@/lib/company-registry";
import { isRegistryMissingError, REGISTRY_MISSING_MESSAGE } from "@/lib/registry-errors";

export function EmployeeManager({
  organizationId,
  positions,
  employees,
  onChange,
}: {
  organizationId: string;
  positions: RegistryPosition[];
  employees: RegistryEmployee[];
  onChange: (employees: RegistryEmployee[]) => void;
}) {
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [positionId, setPositionId] = useState(positions[0]?.id ?? "");
  const [canManage, setCanManage] = useState(false);
  const [canMentor, setCanMentor] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPositionId, setEditPositionId] = useState("");
  const [editManage, setEditManage] = useState(false);
  const [editMentor, setEditMentor] = useState(true);
  const [busy, setBusy] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...employees].sort((a, b) => a.name.localeCompare(b.name, "sv")),
    [employees]
  );

  async function handleCreate() {
    if (!name.trim()) {
      toast.error(t("registry.employeeNameRequired"));
      return;
    }
    if (positions.length === 0) {
      toast.error(t("registry.addPositionFirst"));
      return;
    }
    if (!positionId) {
      toast.error(t("registry.choosePosition"));
      return;
    }
    setBusy(true);
    try {
      const created = await createEmployee(organizationId, {
        name,
        positionId,
        canManage,
        canMentor,
      });
      onChange([...employees, created]);
      setJustAddedId(created.id);
      setName("");
      setCanManage(false);
      setCanMentor(true);
      setPositionId(positions[0]?.id ?? "");
      toast.success(`${t("registry.employeeSaved")}: ${created.name}`);
    } catch (error) {
      toast.error(
        isRegistryMissingError(error)
          ? REGISTRY_MISSING_MESSAGE
          : error instanceof Error
            ? error.message
            : t("registry.employeeSaveError")
      );
    } finally {
      setBusy(false);
    }
  }

  function startEdit(employee: RegistryEmployee) {
    setEditingId(employee.id);
    setEditName(employee.name);
    setEditPositionId(employee.positionId ?? "");
    setEditManage(employee.canManage);
    setEditMentor(employee.canMentor);
  }

  async function handleUpdate() {
    if (!editingId) return;
    setBusy(true);
    try {
      const updated = await updateEmployee(editingId, {
        name: editName,
        positionId: editPositionId,
        canManage: editManage,
        canMentor: editMentor,
      });
      onChange(employees.map((item) => (item.id === updated.id ? updated : item)));
      setEditingId(null);
      toast.success(t("registry.employeeUpdated"));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("registry.employeeSaveError")
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(employeeId: string) {
    setBusy(true);
    try {
      await deleteEmployee(employeeId);
      onChange(employees.filter((item) => item.id !== employeeId));
      toast.success(t("registry.employeeDeleted"));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("registry.employeeDeleteError")
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
        <p className="text-sm font-semibold">{t("registry.addEmployee")}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="employee-name">{t("registry.employeeName")}</Label>
            <Input
              id="employee-name"
              value={name}
              placeholder={t("registry.employeeNamePlaceholder")}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="employee-position">{t("registry.positionName")}</Label>
            {positions.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("registry.addPositionFirst")}</p>
            ) : (
              <select
                id="employee-position"
                className="h-12 w-full rounded-2xl border border-input bg-card px-4 text-sm"
                value={positionId}
                onChange={(event) => setPositionId(event.target.value)}
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
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={canManage} onCheckedChange={(value) => setCanManage(value === true)} />
            {t("registry.manager")}
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={canMentor} onCheckedChange={(value) => setCanMentor(value === true)} />
            {t("registry.mentor")}
          </label>
        </div>
        <Button
          type="button"
          className="w-fit"
          disabled={busy || positions.length === 0}
          onClick={() => void handleCreate()}
        >
          <Plus />
          {t("registry.addEmployee")}
        </Button>
      </div>

      {sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("registry.noEmployees")}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {sorted.map((employee) => (
            <li
              key={employee.id}
              className="rounded-2xl border border-border bg-card px-4 py-3"
            >
              {editingId === employee.id ? (
                <div className="flex flex-col gap-3">
                  <Input value={editName} onChange={(event) => setEditName(event.target.value)} />
                  <select
                    className="h-12 w-full rounded-2xl border border-input bg-card px-4 text-sm"
                    value={editPositionId}
                    onChange={(event) => setEditPositionId(event.target.value)}
                  >
                    {positions.map((position) => (
                      <option key={position.id} value={position.id}>
                        {position.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={editManage}
                        onCheckedChange={(value) => setEditManage(value === true)}
                      />
                      {t("registry.manager")}
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={editMentor}
                        onCheckedChange={(value) => setEditMentor(value === true)}
                      />
                      {t("registry.mentor")}
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" size="sm" disabled={busy} onClick={() => void handleUpdate()}>
                      {t("common.save")}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                    >
                      {t("common.back")}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {justAddedId === employee.id ? (
                        <Check className="size-4 text-success" />
                      ) : null}
                      <p className="font-semibold">{employee.name}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {employee.positionName || t("home.positionMissing")}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant={employee.canManage ? "default" : "outline"}>
                        {t("registry.manager")}: {employee.canManage ? t("common.yes") : t("common.no")}
                      </Badge>
                      <Badge variant={employee.canMentor ? "default" : "outline"}>
                        {t("registry.mentor")}: {employee.canMentor ? t("common.yes") : t("common.no")}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => startEdit(employee)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={busy}
                      onClick={() => void handleDelete(employee.id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
