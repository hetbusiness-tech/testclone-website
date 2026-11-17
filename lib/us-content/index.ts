import type { City, Keyword } from "../us-pages";
import { COMMON_SECTIONS, type ContentSection } from "./common";
import { SHOPIFY_SECTIONS } from "./shopify";
import { META_SECTIONS } from "./meta";

export function getUsContent(city: City, keyword: Keyword): ContentSection[] {
 const development = keyword.service === "shopify";
 return [
  { id: "engagement", title: `${keyword.title}: the engagement focus`, paragraphs: [
   keyword.focus,
   `For a business in ${city.name}, ${city.state}, the starting point is a written brief that connects this service to the actual customer journey. This page describes a remote engagement with Technostripe, not a claim of a staffed office in the city. Your store or campaign may serve a national audience even when the decision-making team is based locally. Share the intended customer geography separately from the location of your business so the project is planned around the right audience.`,
   `The proposed outputs for this scope are ${keyword.deliverables.map(d => d.toLowerCase()).join(", ")}. These are discussion points for an agreed statement of work, not a promise that every item fits every business or platform configuration. Bring the current setup, the constraint you need to solve, and the people responsible for approvals. Discovery should confirm what can be delivered, what depends on your inputs, and which adjacent services should remain outside this engagement.`
  ] },
  { id: "local-planning", title: `Planning delivery with your ${city.name} team`, paragraphs: [
   city.planning,
   `Use ${city.timezone} as the reference time zone when proposing review meetings, release windows, and approval deadlines. Daylight-saving changes and the working hours of other participants should be checked when scheduling rather than assuming a permanent UTC offset. Agree the actual overlap with the project team before committing to a timetable. A local city label does not imply on-site attendance, same-day support, or a regional office; those requirements should be discussed explicitly if they are important to your business.`,
   development ? `For the ${city.name} project brief, identify where orders are fulfilled and which customer regions the store will serve. Record any pickup options, location-dependent delivery restrictions, and support contact details that need to appear in the customer experience. Shipping and tax behavior should be configured against verified business requirements and reviewed by the appropriate merchant advisers. Avoid treating the business address as proof that every customer should see the same fulfillment promise.` : `For the ${city.name} campaign brief, distinguish the location of your team from the geography of the buyers you want to reach. A business based in this city may advertise nationally, while another may have a strict delivery area. Confirm the actual permitted customer locations, service boundaries, product availability, and fulfillment limitations before configuring campaigns. Evaluate regional performance only when the data is sufficient; do not invent city-level results from an account-wide total.`
  ] },
  ...(development ? SHOPIFY_SECTIONS : META_SECTIONS),
  ...COMMON_SECTIONS,
 ];
}
export function getUsFaqs(city: City, keyword: Keyword) {
 return [
  { question: `Do you have an office in ${city.name}?`, answer: `This is a remote service offering for businesses in ${city.name}, ${city.state}. It does not represent a staffed local office. Confirm meeting arrangements and time-zone overlap when discussing your brief.` },
  { question: `What does ${keyword.keyword} include?`, answer: `${keyword.focus} Proposed outputs include ${keyword.deliverables.join(", ").toLowerCase()}. The final statement of work defines inclusions, dependencies, and acceptance criteria.` },
  { question: "How much does the engagement cost?", answer: "Pricing follows an assessment of the current setup, required outputs, dependencies, and support needs. Request an itemized proposal. Platform subscriptions, third-party tools, production assets, and advertising spend should be distinguished from professional fees." },
  { question: "Can you guarantee a launch date or revenue result?", answer: "A delivery schedule can be agreed after dependencies and approvals are understood. Revenue and advertising outcomes depend on factors beyond implementation, including product demand, pricing, competition, fulfillment, and measurement. No fixed commercial result is promised on this page." },
  { question: "How do we get started?", answer: "Use the form to share your name, business, website, and project goal. It opens WhatsApp with your enquiry so you can review and send it. Do not include passwords, private customer records, or advertising account credentials." },
 ];
}
export function getUsWordCount(city: City, keyword: Keyword) {
 const content = getUsContent(city, keyword);
 return content.flatMap(s => [s.title, ...s.paragraphs]).join(" ").trim().split(/\s+/).length;
}
