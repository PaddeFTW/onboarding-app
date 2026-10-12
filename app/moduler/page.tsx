"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

import { PageContainer } from "@/components/page-container";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { knowledgeModules } from "@/lib/knowledge-modules";

export default function ModulerPage() {
  const { t } = useLocale();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return knowledgeModules;
    return knowledgeModules.filter(
      (item) =>
        item.module.toLowerCase().includes(needle) ||
        item.title.toLowerCase().includes(needle) ||
        item.text.toLowerCase().includes(needle)
    );
  }, [query]);

  return (
    <PageContainer className="flex flex-col gap-6">
      <div>
        <Button variant="ghost" size="sm" className="-ml-3 mb-2 w-fit" asChild>
          <Link href="/">
            <ArrowLeft />
            {t("modules.back")}
          </Link>
        </Button>
        <h1 className="text-3xl font-semibold tracking-tight">{t("modules.title")}</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          {t("modules.description")}
        </p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("modules.searchPlaceholder")}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("modules.emptySearch")}</p>
      ) : (
        filtered.map((item) => (
          <article
            key={item.stepId}
            className="rounded-2xl border border-border bg-card px-4 py-3 text-card-foreground"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {item.module}
            </p>
            <h2 className="mt-1 font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
          </article>
        ))
      )}
    </PageContainer>
  );
}
