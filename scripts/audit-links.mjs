/**
 * Auditoria de links externos (FASE 1) — RotaClara
 * Faz UMA requisição HEAD (fallback GET) por URL única, com timeout.
 * Somente leitura; sem scraping (1 req/URL).
 */
import { readFile } from "node:fs/promises";

const files = [
  "src/data/destinations/group-one.ts",
  "src/data/destinations/group-two.ts",
  "src/data/guides/group-one.ts",
  "src/data/guides/group-two.ts",
  "src/data/listings.ts",
  "src/app/metodologia/page.tsx",
  "src/app/sobre/page.tsx",
  "src/app/afiliados/page.tsx",
  "src/lib/affiliate/affiliate.ts",
];

const urls = new Set();
for (const f of files) {
  try {
    const txt = await readFile(f, "utf8");
    for (const m of txt.matchAll(/https?:\/\/[^\s"'`)]+/g)) {
      const u = m[0].replace(/[.,;]+$/, "");
      if (!u.includes("localhost")) urls.add(u);
    }
  } catch {}
}

async function check(url) {
  const opts = { redirect: "follow", signal: AbortSignal.timeout(12000), headers: { "user-agent": "RotaClara-linkcheck/1.0 (+auditoria editorial)" } };
  try {
    const r = await fetch(url, { ...opts, method: "HEAD" });
    if (r.status === 405 || r.status === 403 || r.status === 404) {
      const g = await fetch(url, { ...opts, method: "GET" });
      return { url, status: g.status };
    }
    return { url, status: r.status };
  } catch (e) {
    return { url, status: "ERR", err: String(e.cause?.code ?? e.name ?? e).slice(0, 60) };
  }
}

const list = [...urls];
const results = [];
const CONC = 8;
let i = 0;
async function worker() {
  while (i < list.length) {
    const idx = i++;
    results[idx] = await check(list[idx]);
  }
}
await Promise.all(Array.from({ length: CONC }, worker));

const bad = results.filter((r) => r.status === "ERR" || (typeof r.status === "number" && r.status >= 400));
const ok = results.filter((r) => typeof r.status === "number" && r.status < 400);
console.log(`TOTAL=${results.length} OK=${ok.length} PROBLEM=${bad.length}`);
for (const b of bad.sort((a, x) => String(a.status).localeCompare(String(x.status)))) {
  console.log(`${b.status}\t${b.url}${b.err ? "\t" + b.err : ""}`);
}
