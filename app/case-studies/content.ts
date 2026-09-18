import type { CaseStudy } from "./types";

import aurraPerfume from "../../content/case-studies/aurra-perfume.md";
import baboBotanicals from "../../content/case-studies/babo-botanicals.md";
import experimentBeauty from "../../content/case-studies/experiment-beauty.md";
import kayaaSkincare from "../../content/case-studies/kayaa-skincare.md";
import linenWay from "../../content/case-studies/linen-way.md";
import luxeJewellery from "../../content/case-studies/luxe-jewellery.md";
import manaYerbaMate from "../../content/case-studies/mana-yerba-mate.md";
import matildaJewellery from "../../content/case-studies/matilda-jewellery.md";
import miniclasix from "../../content/case-studies/miniclasix.md";
import morMatcha from "../../content/case-studies/mor-matcha.md";
import taneva from "../../content/case-studies/taneva.md";
import teesclub from "../../content/case-studies/teesclub.md";
import theBlueSky from "../../content/case-studies/the-blue-sky.md";
import theSkinDiary from "../../content/case-studies/the-skin-diary.md";

const markdownByFile: Record<string, string> = {
  "content/case-studies/aurra-perfume.md": aurraPerfume,
  "content/case-studies/babo-botanicals.md": baboBotanicals,
  "content/case-studies/experiment-beauty.md": experimentBeauty,
  "content/case-studies/kayaa-skincare.md": kayaaSkincare,
  "content/case-studies/linen-way.md": linenWay,
  "content/case-studies/luxe-jewellery.md": luxeJewellery,
  "content/case-studies/mana-yerba-mate.md": manaYerbaMate,
  "content/case-studies/matilda-jewellery.md": matildaJewellery,
  "content/case-studies/miniclasix.md": miniclasix,
  "content/case-studies/mor-matcha.md": morMatcha,
  "content/case-studies/taneva.md": taneva,
  "content/case-studies/teesclub.md": teesclub,
  "content/case-studies/the-blue-sky.md": theBlueSky,
  "content/case-studies/the-skin-diary.md": theSkinDiary,
};

export function getCaseStudyMarkdownContent(caseStudy: CaseStudy): string {
  if (!caseStudy.contentFile) return "";

  return (markdownByFile[caseStudy.contentFile] ?? "").replace(/^---[\s\S]*?---\s*/, "");
}
