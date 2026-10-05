import type { CaseStudy } from "./types";
import { CASE_STUDY_MARKDOWN } from "./data";

export function getCaseStudyMarkdownContent(caseStudy: CaseStudy): string {
  if (!caseStudy?.contentFile) return "";
  return CASE_STUDY_MARKDOWN[caseStudy.contentFile] || "";
}

