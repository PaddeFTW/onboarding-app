"use client";

import { useState } from "react";
import {
  FileText,
  FileOutput,
  Mail,
  Printer,
  Copy,
  Download,
  Check,
} from "lucide-react";
import { toast } from "sonner";

import { buildOnboardingExport, type ExportIncludeOptions } from "@/lib/export";
import type { OnboardingRecord } from "@/lib/onboarding";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ── Format options ─────────────────────────────────────────────────────
const FORMAT_OPTIONS = [
  {
    id: "pdf",
    label: "PDF",
    icon: FileText,
    description: "Ladda ner som PDF",
    action: "pdf",
  },
  {
    id: "word",
    label: "Word",
    icon: FileOutput,
    description: "Ladda ner Word-dokument",
    action: "word",
  },
  {
    id: "email",
    label: "E-post",
    icon: Mail,
    description: "Skicka via e-post",
    action: "email",
  },
  {
    id: "print",
    label: "Skriv ut",
    icon: Printer,
    description: "Skriv ut dokument",
    action: "print",
  },
  {
    id: "copy",
    label: "Kopiera",
    icon: Copy,
    description: "Kopiera till urklipp",
    action: "copy",
  },
  {
    id: "download",
    label: "Ladda ner",
    icon: Download,
    description: "Ladda ner textfil",
    action: "download",
  },
] as const;

const INCLUDE_OPTIONS = [
  { id: "checklist", label: "Checklista", defaultChecked: true },
  { id: "policy", label: "Policy", defaultChecked: true },
  { id: "work-env", label: "Arbetsmiljöguide", defaultChecked: true },
  { id: "signatures", label: "Signaturer", defaultChecked: true },
  { id: "attachments", label: "Bilagor", defaultChecked: false },
  { id: "comments", label: "Kommentarer", defaultChecked: false },
] as const;

const DEFAULT_INCLUDE_OPTIONS: ExportIncludeOptions = {
  checklist: true,
  policy: true,
  "work-env": true,
  signatures: true,
  attachments: false,
  comments: false,
};

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onboarding: OnboardingRecord;
}

export function ExportDialog({
  open,
  onOpenChange,
  onboarding,
}: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>("pdf");
  const [include, setInclude] = useState<ExportIncludeOptions>(DEFAULT_INCLUDE_OPTIONS);
  const [exporting, setExporting] = useState(false);

  function toggleInclude(id: keyof ExportIncludeOptions) {
    setInclude((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function openPrintableDocument(html: string, title: string) {
    const printWindow = window.open("", "_blank", "noopener,noreferrer");

    if (!printWindow) {
      throw new Error("Kunde inte öppna utskriftsvyn.");
    }

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.document.title = title;
    printWindow.focus();
    printWindow.print();
  }

  function downloadBlob(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function handleExport() {
    setExporting(true);

    try {
      await new Promise((r) => setTimeout(r, 300));

      const format = FORMAT_OPTIONS.find((f) => f.id === selectedFormat);
      if (!format) {
        throw new Error("Kunde inte hitta valt exportformat.");
      }

      const exportDocument = buildOnboardingExport(onboarding, include);

      switch (format.action) {
        case "print":
          openPrintableDocument(exportDocument.html, exportDocument.title);
          toast.success("Öppnar utskriftsdialog");
          break;
        case "email":
          window.location.href = `mailto:?subject=${encodeURIComponent(
            exportDocument.title
          )}&body=${encodeURIComponent(
            `Hej,\n\nHär kommer onboardingrapporten.\n\n${exportDocument.text}`
          )}`;
          toast.success("Öppnar e-postklient");
          break;
        case "copy":
          await navigator.clipboard.writeText(exportDocument.text);
          toast.success("Kopierat till urklipp");
          break;
        case "download": {
          const blob = new Blob([exportDocument.text], { type: "text/plain;charset=utf-8" });
          downloadBlob(blob, exportDocument.fileName);
          toast.success("Fil nedladdad");
          break;
        }
        case "word": {
          const blob = new Blob([exportDocument.html], {
            type: "application/msword;charset=utf-8",
          });
          downloadBlob(blob, `${exportDocument.baseFileName}.doc`);
          toast.success("Word-dokument nedladdat");
          break;
        }
        case "pdf":
          openPrintableDocument(exportDocument.html, exportDocument.title);
          toast.success("Öppnar PDF-vy för utskrift eller spara som PDF");
          break;
      }

      onOpenChange(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Exporten kunde inte genomföras.";
      toast.error(message);
    } finally {
      setExporting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Exportera onboarding</DialogTitle>
          <DialogDescription>
            Välj format och vad som ska inkluderas i exporten.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {FORMAT_OPTIONS.map((fmt) => {
            const Icon = fmt.icon;
            const active = selectedFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                type="button"
                onClick={() => setSelectedFormat(fmt.id)}
                className={cn(
                  "flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-center transition-all duration-200",
                  "hover:-translate-y-px hover:border-primary/35 hover:bg-accent/70 hover:shadow-soft-sm",
                  active
                    ? "border-primary/35 bg-accent/80 text-accent-foreground shadow-soft-sm"
                    : "border-border/90 bg-card"
                )}
              >
                <Icon
                  className={cn(
                    "size-[1.1rem]",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span className="text-[0.72rem] font-medium leading-tight">
                  {fmt.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Vad ska inkluderas?</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {INCLUDE_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200",
                  include[opt.id]
                    ? "border-primary/25 bg-accent/60 shadow-soft-xs"
                    : "border-border/90 bg-card hover:bg-secondary/60"
                )}
              >
                <Checkbox
                  id={opt.id}
                  checked={include[opt.id]}
                  onCheckedChange={() => toggleInclude(opt.id)}
                />
                <Label
                  htmlFor={opt.id}
                  className="cursor-pointer text-sm font-normal leading-snug"
                >
                  {opt.label}
                </Label>
              </label>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Avbryt
          </Button>
          <Button onClick={handleExport} disabled={exporting}>
            {exporting ? (
              "Exporterar…"
            ) : (
              <>
                <Check className="size-4" />
                Exportera
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
