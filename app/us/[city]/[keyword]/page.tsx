import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import WhatsAppLeadForm from "../../../../components/WhatsAppLeadForm";
import { US_CITIES, US_KEYWORDS, US_CONTENT_UPDATED, getAllUsPages, getUsPath } from "../../../../lib/us-pages";
import { getUsContent, getUsFaqs } from "../../../../lib/us-content";

const SITE_URL = "https://technostripe.com";
export const dynamicParams = false;
export const dynamic = "force-static";
type Props = { params: { city: string; keyword: string } };
function resolve(params: Props["params"]) {
 const city = US_CITIES.find(c => c.slug === params.city);
 const keyword = US_KEYWORDS.find(k => k.slug === params.keyword);
 if (!city || !keyword) notFound();
 return { city, keyword };
}
export function generateStaticParams() {
 return getAllUsPages().map(({city, keyword}) => ({city: city.slug, keyword: keyword.slug}));
}
export function generateMetadata({params}: Props): Metadata {
 const {city, keyword} = resolve(params);
 const title = `${keyword.title} in ${city.name}, ${city.state}`;
 const description = `${keyword.title} for ${city.name} businesses. Explore ${keyword.deliverables.slice(0,2).join(" and ").toLowerCase()}, project planning, and remote delivery. Discuss your brief with Technostripe.`;
 const url = `${SITE_URL}${getUsPath(city, keyword)}`;
 return {title, description, keywords: [keyword.keyword], alternates: {canonical: url}, robots: {index:true, follow:true}, openGraph: {title, description, url, type:"website", images:[{url:`${SITE_URL}/services/${keyword.service === "shopify" ? "e-commerce" : "paid-ads"}.png`}]}, twitter: {card:"summary_large_image", title, description, images:[`${SITE_URL}/services/${keyword.service === "shopify" ? "e-commerce" : "paid-ads"}.png`]} };
}
export default function UsServicePage({params}: Props) {
 const {city, keyword} = resolve(params);
 const sections = getUsContent(city, keyword);
 const faqs = getUsFaqs(city, keyword);
 const development = keyword.service === "shopify";
 const sameCity = US_KEYWORDS.filter(k => k.service === keyword.service && k.slug !== keyword.slug);
 const otherCities = US_CITIES.filter(c => c.slug !== city.slug);
 const canonical = `${SITE_URL}${getUsPath(city, keyword)}`;
 const schema = {"@context":"https://schema.org","@graph":[
  {"@type":"Service", "@id":`${canonical}#service`, name:`${keyword.title} in ${city.name}`, description:keyword.focus, serviceType:development ? "Shopify development" : "Meta advertising", url:canonical, provider:{"@type":"Organization",name:"Technostripe Solutions",url:SITE_URL}, areaServed:{"@type":"City",name:city.name,containedInPlace:{"@type":"Country",name:"United States"}}, availableChannel:{"@type":"ServiceChannel", serviceUrl:`${SITE_URL}/contact`}},
  {"@type":"BreadcrumbList",itemListElement:[{name:"Home",item:SITE_URL},{name:"United States",item:`${SITE_URL}/us`},{name:city.name,item:`${SITE_URL}/us/${city.slug}`},{name:keyword.title,item:canonical}].map((item,i)=>({"@type":"ListItem",position:i+1,...item}))}
 ]};
 return <>
  <Navbar />
  <main id="main-content" className="bg-[#f5f4ef] text-black pt-28 sm:pt-32">
   <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}} />
   <section className="mx-auto max-w-7xl px-6 pb-16 sm:pb-24">
    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-xs text-black/60"><Link href="/">Home</Link><span>/</span><Link href="/us">United States</Link><span>/</span><Link href={`/us/${city.slug}`}>{city.name}</Link><span>/</span><span>{keyword.title}</span></nav>
    <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
     <div className="lg:pt-5">
      <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#ed1238]">{development ? "Build a better buying experience" : "Make acquisition decisions with evidence"}</p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[1.08]">{keyword.title}<span className="block text-[#ed1238] mt-2">in {city.name}, {city.state}</span></h1>
      <p className="mt-7 text-lg leading-relaxed text-black/70 max-w-2xl">{keyword.focus}</p>
      <p className="mt-5 text-sm text-black/60">Remote delivery for your US business. Clear scope, practical milestones, and business-owned accounts.</p>
      <ul className="my-7 grid gap-3 sm:grid-cols-2">{keyword.deliverables.map(item=><li key={item} className="border-l-2 border-[#ed1238] pl-3 text-sm font-medium">{item}</li>)}</ul>
      <a href="#engagement" className="inline-flex border-b border-black pb-1 text-sm font-semibold">Explore the project guide ↓</a>
     </div>
     <div id="enquiry" className="rounded-3xl bg-[#ebe9e1] p-3 sm:p-5">
      <h2 className="px-2 pt-2 text-xl font-bold">Tell us about your project</h2>
      <p className="px-2 mt-2 mb-5 text-sm text-black/65">Share your website and goals. Review your enquiry in WhatsApp before sending.</p>
      <WhatsAppLeadForm context={`${keyword.title} — ${city.name}, ${city.state}, USA`} preselectedService={development ? "Shopify Development & Redesign" : "Meta Ads (Facebook & Instagram)"} serviceOptions={["Shopify Development & Redesign", "Meta Ads (Facebook & Instagram)"]} usMarket />
     </div>
    </div>
   </section>
   <div className="border-y border-black/10 bg-white/60">
    <div className="mx-auto max-w-7xl px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-xs text-black/60"><span>By Technostripe Solutions · Updated <time dateTime={US_CONTENT_UPDATED}>November 17, 2026</time></span><span>Serving {city.name}, {city.state} remotely · United States</span></div>
   </div>
   <div className="mx-auto max-w-7xl px-6 py-14 lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
    <aside className="mb-12 lg:mb-0"><nav aria-label="On this page" className="lg:sticky lg:top-28 max-h-[70vh] overflow-auto"><p className="text-xs font-mono uppercase font-bold text-[#ed1238] mb-4">In this guide</p><ul className="space-y-3 text-xs leading-relaxed">{sections.map(s=><li key={s.id}><a className="text-black/60 hover:text-[#ed1238]" href={`#${s.id}`}>{s.title}</a></li>)}</ul></nav></aside>
    <article className="max-w-3xl">{sections.map((section,i)=><section id={section.id} key={section.id} className="scroll-mt-28 mb-12"><p className="font-mono text-xs text-[#ed1238] mb-3">{String(i+1).padStart(2,"0")}</p><h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5">{section.title}</h2>{section.paragraphs.map((paragraph,n)=><p key={n} className="text-base leading-8 text-black/70 mb-5">{paragraph}</p>)}</section>)}
     <section id="questions" className="scroll-mt-28 border-t border-black/15 pt-10"><h2 className="text-3xl font-bold mb-6">Questions before you start</h2>{faqs.map(f=><details key={f.question} className="border-b border-black/10 py-5"><summary className="font-semibold cursor-pointer">{f.question}</summary><p className="mt-4 text-black/70 leading-7">{f.answer}</p></details>)}</section>
     <section className="mt-12 rounded-2xl bg-black p-8 text-white"><h2 className="text-2xl font-bold">Build the right brief first.</h2><p className="mt-3 text-white/70 leading-7">Share the current setup, the problem you need to solve, and your target launch window. We’ll use those inputs to discuss scope and next steps.</p><a href="#enquiry" className="mt-5 inline-block rounded-full bg-[#ed1238] px-6 py-3 font-semibold text-sm">Discuss your project ↑</a><Link href="/portfolio" className="ml-5 inline-block mt-4 text-sm underline">View our portfolio</Link></section>
    </article>
   </div>
   <section className="border-t border-black/10 bg-white/60"><div className="mx-auto max-w-7xl px-6 py-14"><h2 className="text-2xl font-bold">Compare project scopes in {city.name}</h2><p className="mt-3 text-sm text-black/60">Choose the brief that best matches your requirement. Similar terms may describe overlapping work.</p><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{sameCity.map(k=><Link key={k.slug} className="text-sm underline underline-offset-4 hover:text-[#ed1238]" href={getUsPath(city,k)}>{k.title}</Link>)}</div><h2 className="text-2xl font-bold mt-12">This service in other US cities</h2><div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">{otherCities.map(c=><Link key={c.slug} className="text-sm underline underline-offset-4 hover:text-[#ed1238]" href={getUsPath(c,keyword)}>{c.name}, {c.state}</Link>)}</div><Link className="mt-8 inline-block font-semibold text-sm" href={`/us/${city.slug}`}>All services for {city.name} →</Link></div></section>
  </main>
  <Footer />
 </>;
}
