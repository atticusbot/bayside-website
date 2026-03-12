import { createClient } from "@vercel/kv";
import fs from "fs";
import path from "path";

const KV_KEY = "dashboard:status";

async function main() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.error("Missing KV_REST_API_URL or KV_REST_API_TOKEN env vars");
    process.exit(1);
  }

  const kv = createClient({ url, token });

  const filePath = path.join(__dirname, "..", "public", "status.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  await kv.set(KV_KEY, data);
  console.log(`Seeded KV key "${KV_KEY}" with ${raw.length} bytes from status.json`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
