"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createPosition,
  deletePosition,
  updatePosition,
  type RegistryPosition,
} from "@/lib/company-registry";
import { isRegistryMissingError, REGISTRY_MISSING_MESSAGE } from "@/lib/registry-errors";

export function PositionManager({
  organizationId,
  positions,
  onChange,
}: {
  organizationId: string;
  positions: RegistryPosition[];
  onChange: (positions: RegistryPosition[]) => void;
}) {
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleCreate() {
    if (!name.trim()) {
      toast.error(t("registry.positionNameRequired"));
      return;
    }
    setBusy(true);
    try {
      const created = await createPosition(organizationId, {
        name,
        role: role.trim() || t("registry.customRole"),
      });
      onChange([...positions, created].sort((a, b) => a.name.localeCompare(b.name, "sv")));
      setName("");
      setRole("");
      toast.success(t("registry.positionSaved"));
    } catch (error) {
      toast.error(
        isRegistryMissingError(error)
          ? REGISTRY_MISSING_MESSAGE
          : error instanceof Error
            ? error.message
            : t("registry.positionSaveError")
      );
    } finally {
      setBusy(false);
    }
  }

  function startEdit(position: RegistryPosition) {
    setEditingId(position.id);
    setEditName(position.name);
    setEditRole(position.role);
  }

  async function handleUpdate() {
    if (!editingId) return;
    setBusy(true);
    try {
      const updated = await updatePosition(editingId, {
        name: editName,
        role: editRole,
      });
      onChange(
        positions
          .map((item) => (item.id === updated.id ? updated : item))
          .sort((a, b) => a.name.localeCompare(b.name, "sv"))
      );
      setEditingId(null);
      toast.success(t("registry.positionUpdated"));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("registry.positionSaveError")
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(positionId: string) {
    setBusy(true);
    try {
      await deletePosition(positionId);
      onChange(positions.filter((item) => item.id !== positionId));
      toast.success(t("registry.positionDeleted"));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("registry.positionDeleteError")
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
        <p className="text-sm font-semibold">{t("registry.addPosition")}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="position-name">{t("registry.positionName")}</Label>
            <Input
              id="position-name"
              value={name}
              placeholder={t("registry.positionNamePlaceholder")}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="position-role">{t("registry.positionRole")}</Label>
            <Input
              id="position-role"
              value={role}
              placeholder={t("registry.customRole")}
              onChange={(event) => setRole(event.target.value)}
            />
          </div>
        </div>
        <Button type="button" className="w-fit" disabled={busy} onClick={() => void handleCreate()}>
          <Plus />
          {t("registry.addPosition")}
        </Button>
      </div>

      {positions.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("registry.noPositions")}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {positions.map((position) => (
            <li
              key={position.id}
              className="rounded-2xl border border-border bg-card px-4 py-3"
            >
              {editingId === position.id ? (
                <div className="flex flex-col gap-3">
                  <Input value={editName} onChange={(event) => setEditName(event.target.value)} />
                  <Input value={editRole} onChange={(event) => setEditRole(event.target.value)} />
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
                  <div>
                    <p className="font-semibold">{position.name}</p>
                    <p className="text-sm text-muted-foreground">{position.role || "—"}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => startEdit(position)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={busy}
                      onClick={() => void handleDelete(position.id)}
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
