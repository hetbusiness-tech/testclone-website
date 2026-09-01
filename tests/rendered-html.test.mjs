import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Navbar Digital landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Navbar Digital \| Digital Marketing Agency in New Zealand<\/title>/i,
  );
  assert.match(html, /Scaling E-commerce/i);
  assert.match(html, /conversion-focused Shopify experiences/i);
  assert.match(html, /Full-stack digital growth/i);
  assert.match(html, /Proof, not promises/i);
  assert.match(html, /Let(?:'|&apos;)s build your digital future\./i);
  assert.doesNotMatch(html, /codex-preview/i);
  assert.doesNotMatch(html, /react-loading-skeleton/i);
  assert.doesNotMatch(html, /SkeletonPreview/i);
});

test("removes the disposable starter preview", async () => {
  const [css, page, layout] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Navbar Digital/);
  assert.match(page, /Kiwiana Immigration/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.match(
    layout,
    /siteTitle = "Navbar Digital \| Digital Marketing Agency in New Zealand"/,
  );
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.match(css, /\.font-display/);
  assert.match(css, /\.marquee-track/);

  await assert.rejects(
    access(new URL("public/_sites-preview", templateRoot)),
  );
  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
});
