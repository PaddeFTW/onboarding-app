"use client";

import Link from "next/link";

import { PageContainer } from "@/components/page-container";
import { useLocale } from "@/components/providers/locale-provider";

export default function InstallningarPage() {
  const { t } = useLocale();
  const items = [
    ["/foretag", t("settings.overviewTitle"), t("settings.overviewText")],
    ["/foretagsregister", t("settings.registryTitle"), t("settings.registryText")],
    ["/medarbetare", t("employeesPage.title"), t("employeesPage.description")],
    ["/register", t("settings.setupTitle"), t("settings.setupText")],
    ["/onboarding/templates", t("settings.templatesTitle"), t("settings.templatesText")],
    ["/inbjudan", t("settings.inviteTitle"), t("settings.inviteText")],
    ["/dokument-workspace", t("settings.documentsTitle"), t("settings.documentsText")],
    ["/dokument", t("settings.filesTitle"), t("settings.filesText")],
    ["/ordlista", t("settings.glossaryTitle"), t("settings.glossaryText")],
    ["/installera", t("settings.installTitle"), t("settings.installText")],
  ] as const;

  return (
    <PageContainer className="flex flex-col gap-4">
      <Link className="text-sm font-semibold text-primary" href="/">
        {t("common.backWorkspace")}
      </Link>
      <h1 className="text-2xl font-semibold">{t("settings.title")}</h1>
      <p className="text-sm text-muted-foreground">{t("settings.description")}</p>
      {items.map(([href, title, text]) => (
        <Link
          key={href}
          className="rounded-2xl border border-border bg-card px-4 py-3 text-card-foreground"
          href={href}
        >
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{text}</p>
        </Link>
      ))}
    </PageContainer>
  );
}
