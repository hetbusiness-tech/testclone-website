export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  projectName: string;
  category: string;
  description: string;
  contentFile?: string;
  caseStudyTitle?: string;
  story?: {
    heading: string;
    paragraphs: string[];
  }[];
  coverImage: string;
  mobileImage?: string;
  designTools?: string;
  backend?: string;
  programmingLanguage?: string;
  projectLink?: string;
  metrics?: CaseStudyMetric[];
  gallery?: string[];
  featured?: boolean;
}
