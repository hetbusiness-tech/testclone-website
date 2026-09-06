import fs from "fs";
import path from "path";
import type { CaseStudy } from "./types";

export function getCaseStudyMarkdownContent(caseStudy: CaseStudy): string {
  if (!caseStudy.contentFile) return "";

  try {
    const fullPath = path.isAbsolute(caseStudy.contentFile)
      ? caseStudy.contentFile
      : path.join(process.cwd(), caseStudy.contentFile);

    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, "utf-8").replace(/^---[\s\S]*?---\s*/, "");
    }
  } catch (error) {
    console.error(`Failed to read case-study content file: ${caseStudy.contentFile}`, error);
  }

  return "";
}
