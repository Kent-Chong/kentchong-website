// Self-check for the only non-trivial server logic: the BigQuery row builder.
// Run: node --test netlify/functions/complete.test.js
import { test } from "node:test";
import assert from "node:assert";
import { buildRow } from "./complete.js";

test("buildRow hashes ip to 16 hex chars and caps text at 2000", () => {
  const row = buildRow({ prompt: "x".repeat(5000), reply: "y".repeat(5000), ip: "1.2.3.4" });
  assert.match(row.ip_hash, /^[0-9a-f]{16}$/);
  assert.strictEqual(row.prompt.length, 2000);
  assert.strictEqual(row.reply.length, 2000);
  assert.ok(!Number.isNaN(Date.parse(row.ts)));
  // same ip → same hash (dedupe works); different ip → different hash (no collision-by-design)
  assert.strictEqual(buildRow({ prompt: "a", reply: "b", ip: "1.2.3.4" }).ip_hash, row.ip_hash);
  assert.notStrictEqual(buildRow({ prompt: "a", reply: "b", ip: "9.9.9.9" }).ip_hash, row.ip_hash);
});
