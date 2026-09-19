import { caseStudies } from "../app/case-studies/constants";
export type { CaseStudy, CaseStudyMetric } from "../app/case-studies/types";

export { caseStudies };

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((item) => item.slug);
}

export function getAllCaseStudies() {
  return [...caseStudies];
}
