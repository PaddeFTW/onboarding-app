import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";

import { PageContainer } from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getOnboardingDocumentContent,
  type OnboardingDocumentBlock,
} from "@/lib/onboarding-documents.server";

function renderBlock(block: OnboardingDocumentBlock, index: number) {
  if (block.type === "heading") {
    if (block.level === 1) {
      return (
        <h2 key={index} className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {block.text}
        </h2>
      );
    }

    if (block.level === 2) {
      return (
        <h3 key={index} className="text-lg font-semibold tracking-tight sm:text-xl">
          {block.text}
        </h3>
      );
    }

    return (
      <h4 key={index} className="text-base font-semibold tracking-tight">
        {block.text}
      </h4>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={index} className="space-y-2 pl-5 text-sm leading-relaxed text-foreground/90">
        {block.items.map((item) => (
          <li key={item} className="list-disc">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "table") {
    const [header, ...rows] = block.rows;

    return (
      <div key={index} className="overflow-x-auto rounded-2xl border border-border/90">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-secondary/40">
            <tr>
              {header.map((cell, cellIndex) => (
                <th key={cellIndex} className="px-4 py-3 font-semibold text-foreground">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-border/80">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-3 align-top text-foreground/85">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <p key={index} className="text-sm leading-relaxed text-foreground/90 sm:text-base">
      {block.text}
    </p>
  );
}

export default async function OnboardingDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = await getOnboardingDocumentContent(slug);

  if (!document) {
    notFound();
  }

  return (
    <PageContainer className="flex flex-col gap-8 sm:gap-10">
      <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
        <Link href="/">
          <ArrowLeft />
          Startsidan
        </Link>
      </Button>

      <header className="flex flex-col gap-4 animate-fade-up">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <FileText className="size-3.5" />
          Dokumentation
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-[2rem] font-semibold tracking-tight sm:text-5xl">
            {document.title}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Innehållet hämtas direkt från den låsta dokumentationen i
            {" "}
            <span className="font-medium">{document.sourcePath}</span>.
          </p>
        </div>
      </header>

      <Card className="flex flex-col gap-6 p-5 sm:gap-7 sm:p-7">
        {document.blocks.map((block, index) => renderBlock(block, index))}
      </Card>
    </PageContainer>
  );
}
