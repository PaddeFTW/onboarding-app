"use client";

import Link from "next/link";

import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/** Shown when company setup data is missing before starting an introduction. */
export function CompanyMissingPrompt({
  onStay,
}: {
  onStay?: () => void;
}) {
  const { t } = useLocale();
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 pt-6">
        <p className="text-sm leading-relaxed text-foreground">
          {t("missingCompany.title")}
        </p>
        <p className="text-sm text-muted-foreground">{t("missingCompany.body")}</p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/register">{t("missingCompany.yes")}</Link>
          </Button>
          {onStay ? (
            <Button type="button" variant="outline" onClick={onStay}>
              {t("missingCompany.no")}
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/">{t("missingCompany.no")}</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
