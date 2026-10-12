"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PageContainer } from "@/components/page-container";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { listEvents } from "@/lib/history";

export default function HistorikPage() {
  const { t, locale } = useLocale();
  const [rows, setRows] = useState<
    Array<{ id: string; summary: string; created_at: string; event_type?: string }>
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void listEvents()
      .then(setRows)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Kunde inte läsa historiken.");
      });
  }, []);

  return (
    <PageContainer className="flex flex-col gap-6">
      <div>
        <Button variant="ghost" size="sm" className="-ml-3 mb-2 w-fit" asChild>
          <Link href="/">
            <ArrowLeft />
            {t("history.back")}
          </Link>
        </Button>
        <h1 className="text-3xl font-semibold tracking-tight">{t("history.title")}</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          {t("history.description")}
        </p>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {rows.length === 0 && !error ? (
        <p className="text-sm text-muted-foreground">{t("history.empty")}</p>
      ) : null}
      <ul className="flex flex-col gap-2">
        {rows.map((row) => (
          <li
            key={row.id}
            className="rounded-2xl border border-border bg-card px-4 py-3 text-card-foreground"
          >
            <p className="text-sm">{row.summary}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {new Date(row.created_at).toLocaleString(locale)}
            </p>
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}
