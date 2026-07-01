import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { CHECKLIST_TEMPLATE } from "@/lib/onboarding";
import { getOnboardingDocumentSlug } from "@/lib/document-links";

export type OnboardingDocumentBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; rows: string[][] };

export interface OnboardingDocumentContent {
  slug: string;
  title: string;
  sourcePath: string;
  blocks: OnboardingDocumentBlock[];
}

interface DocumentDescriptor {
  fileName: string;
  name: string;
  sourcePath: string;
}

function getAllowedDocuments() {
  const documents = new Map<string, DocumentDescriptor>();

  for (const item of CHECKLIST_TEMPLATE) {
    for (const doc of item.documents) {
      if (!doc.sourcePath) {
        continue;
      }

      const slug = getOnboardingDocumentSlug(doc.sourcePath);
      if (!slug) {
        continue;
      }

      documents.set(slug, {
        fileName: `${slug}.md`,
        name: doc.name,
        sourcePath: doc.sourcePath,
      });
    }
  }

  return documents;
}

function stripFrontmatter(content: string) {
  if (!content.startsWith("---\n")) {
    return { body: content, frontmatter: {} as Record<string, string> };
  }

  const endIndex = content.indexOf("\n---\n", 4);
  if (endIndex === -1) {
    return { body: content, frontmatter: {} as Record<string, string> };
  }

  const frontmatterContent = content.slice(4, endIndex);
  const body = content.slice(endIndex + 5);
  const frontmatter: Record<string, string> = {};

  for (const line of frontmatterContent.split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    if (key) {
      frontmatter[key] = value;
    }
  }

  return { body, frontmatter };
}

function cleanInlineMarkdown(text: string) {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .trim();
}

function parseTableRow(line: string) {
  return line
    .split("|")
    .slice(1, -1)
    .map((cell) => cleanInlineMarkdown(cell));
}

function parseMarkdownBlocks(body: string): OnboardingDocumentBlock[] {
  const lines = body.split("\n");
  const blocks: OnboardingDocumentBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({
        type: "heading",
        level: 3,
        text: cleanInlineMarkdown(line.slice(4)),
      });
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({
        type: "heading",
        level: 2,
        text: cleanInlineMarkdown(line.slice(3)),
      });
      index += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push({
        type: "heading",
        level: 1,
        text: cleanInlineMarkdown(line.slice(2)),
      });
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];

      while (index < lines.length) {
        const listLine = lines[index].trim();
        if (!listLine.startsWith("- ")) {
          break;
        }

        items.push(cleanInlineMarkdown(listLine.slice(2)));
        index += 1;
      }

      blocks.push({ type: "list", items });
      continue;
    }

    if (line.startsWith("|")) {
      const rows: string[][] = [];

      while (index < lines.length) {
        const tableLine = lines[index].trim();
        if (!tableLine.startsWith("|")) {
          break;
        }

        const isDivider = /^\|[\s:-|]+\|$/.test(tableLine);
        if (!isDivider) {
          rows.push(parseTableRow(tableLine));
        }
        index += 1;
      }

      if (rows.length > 0) {
        blocks.push({ type: "table", rows });
      }
      continue;
    }

    const paragraphLines: string[] = [];

    while (index < lines.length) {
      const paragraphLine = lines[index].trim();
      if (
        !paragraphLine ||
        paragraphLine.startsWith("#") ||
        paragraphLine.startsWith("- ") ||
        paragraphLine.startsWith("|")
      ) {
        break;
      }

      paragraphLines.push(cleanInlineMarkdown(paragraphLine));
      index += 1;
    }

    if (paragraphLines.length > 0) {
      blocks.push({
        type: "paragraph",
        text: paragraphLines.join(" "),
      });
      continue;
    }

    index += 1;
  }

  return blocks;
}

export async function getOnboardingDocumentContent(
  slug: string
): Promise<OnboardingDocumentContent | null> {
  const documents = getAllowedDocuments();
  const descriptor = documents.get(slug);

  if (!descriptor) {
    return null;
  }

  const absolutePath = path.join(
    process.cwd(),
    "docs",
    "onboarding",
    descriptor.fileName
  );
  const rawContent = await readFile(absolutePath, "utf8");
  const { body, frontmatter } = stripFrontmatter(rawContent);
  const blocks = parseMarkdownBlocks(body);

  return {
    slug,
    title: cleanInlineMarkdown(frontmatter.title ?? descriptor.name),
    sourcePath: descriptor.sourcePath,
    blocks,
  };
}
