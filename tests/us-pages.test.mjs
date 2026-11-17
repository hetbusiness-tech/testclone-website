import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

// Load the source without requiring a separate TypeScript runtime dependency.
const modules = new Map();
function loadTs(filename) {
 const file = path.resolve(filename);
 if (modules.has(file)) return modules.get(file);
 const exports = {};
 modules.set(file, exports);
 const { outputText } = ts.transpileModule(readFileSync(file,"utf8"), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}});
 vm.runInNewContext(outputText,{exports, require:(specifier)=>{
  const base=path.resolve(path.dirname(file),specifier);
  return loadTs(existsSync(`${base}.ts`) ? `${base}.ts` : `${base}/index.ts`);
 }},{filename:file});
 return exports;
}
const data=loadTs("lib/us-pages.ts");
const content=loadTs("lib/us-content/index.ts");
const pages=data.getAllUsPages();

test("the US inventory contains exactly the approved 40 keywords across 25 cities",()=>{
 assert.equal(data.US_CITIES.length,25);
 assert.equal(data.US_KEYWORDS.filter(k=>k.service==="shopify").length,20);
 assert.equal(data.US_KEYWORDS.filter(k=>k.service==="meta").length,20);
 assert.equal(pages.length,1000);
 assert.equal(new Set(pages.map(p=>p.path)).size,1000);
 assert.equal(new Set(data.US_CITIES.map(c=>c.slug)).size,25);
 for(const city of data.US_CITIES) {
  assert.match(city.state,/^(NY|MO|MN|IN|CA|MA|NC|IL|NE|AK|PA|WA|OR|TX|VA|DC|OK|OH|FL|CO)$/);
  assert.doesNotThrow(()=>new Intl.DateTimeFormat("en-US",{timeZone:city.timezone}));
 }
});

test("every guide has at least 2,000 substantive article words and valid unique section anchors",()=>{
 for(const {city,keyword,path} of pages) {
  assert(content.getUsWordCount(city,keyword)>=2000,`${path}: short article`);
  const sections=content.getUsContent(city,keyword);
  assert.equal(new Set(sections.map(s=>s.id)).size,sections.length,path);
  for(const section of sections) {
   assert.match(section.id,/^[a-z0-9-]+$/);
   assert(section.paragraphs.every(p=>p.trim().length>0));
  }
  assert.equal(content.getUsFaqs(city,keyword).length,5);
 }
});

test("all generated city and related-service links resolve to an approved URL",()=>{
 const inventory=new Set(pages.map(p=>p.path));
 for(const city of data.US_CITIES) for(const keyword of data.US_KEYWORDS) assert(inventory.has(data.getUsPath(city,keyword)));
});
