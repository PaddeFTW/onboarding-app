"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

import { PageContainer } from "@/components/page-container";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { terms } from "@/lib/terms";

export default function OrdlistaPage() {
  const { t } = useLocale();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return terms;
    return terms.filter(
      (item) =>
        item.term.toLowerCase().includes(needle) ||
        item.definition.toLowerCase().includes(needle)
    );
  }, [query]);

  return (
    <PageContainer className="flex flex-col gap-6">
      <div>
        <Button variant="ghost" size="sm" className="-ml-3 mb-2 w-fit" asChild>
          <Link href="/">
            <ArrowLeft />
            {t("common.back")}
          </Link>
        </Button>
        <h1 className="text-3xl font-semibold tracking-tight">{t("glossary.title")}</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          {t("glossary.description")}
        </p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("glossary.searchPlaceholder")}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("glossary.emptySearch")}</p>
      ) : (
        <dl className="flex flex-col gap-3">
          {filtered.map((item) => (
            <div
              key={item.term}
              className="rounded-2xl border border-border bg-card px-4 py-3 text-card-foreground"
            >
              <dt className="font-semibold">{item.term}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{item.definition}</dd>
              <dd className="mt-2 text-sm text-muted-foreground">
                {t("glossary.templateLabel")}: {item.template}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </PageContainer>
  );
}
