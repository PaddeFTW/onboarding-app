"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PageContainer } from "@/components/page-container";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { loadCompanyRegistry } from "@/lib/company-registry";
import { POLICY_CARDS, policyExampleFor } from "@/lib/policy-cards";

export default function PolicyerPage() {
  const { t } = useLocale();
  const [industry, setIndustry] = useState("general");
  const [companyPolicies, setCompanyPolicies] = useState("");

  useEffect(() => {
    void loadCompanyRegistry()
      .then((result) => {
        if (!result.ok) return;
        setIndustry(result.data.settings.industry || "general");
        setCompanyPolicies(result.data.facts.policies.trim());
      })
      .catch(() => undefined);
  }, []);

  const industryExample = policyExampleFor(industry);

  return (
    <PageContainer className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" className="-ml-3 mb-2 w-fit" asChild>
            <Link href="/">
              <ArrowLeft />
              {t("policies.back")}
            </Link>
          </Button>
          <h1 className="text-3xl font-semibold tracking-tight">{t("policies.title")}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {t("policies.description")}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/foretagsregister">{t("policies.openRegistry")}</Link>
        </Button>
      </div>

      {companyPolicies ? (
        <article className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
            {t("company.policiesHeading")}
          </p>
          <p className="mt-2 text-sm leading-relaxed">{companyPolicies}</p>
        </article>
      ) : null}

      <p className="text-sm text-muted-foreground">
        {t("policies.industryExample")}: {industryExample}
      </p>

      {POLICY_CARDS.map((card) => (
        <article
          key={card.title}
          className="rounded-2xl border border-border bg-card px-4 py-3 text-card-foreground"
        >
          <h2 className="font-semibold">{card.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{card.sentence}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("policies.example")}: {card.example}
          </p>
        </article>
      ))}
    </PageContainer>
  );
}
