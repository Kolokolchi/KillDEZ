import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

// Kept outside public/. Set LEADS_FILE for a persistent volume or isolated tests.
const file = process.env.LEADS_FILE || path.join(process.cwd(), "leads.json");

export function readLeads() {
  try {
    const leads = JSON.parse(
      fs.readFileSync(/* turbopackIgnore: true */ file, "utf8"),
    );
    return Array.isArray(leads) ? leads : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export function addLead(data) {
  // Synchronous read/rename prevents lost updates within the existing single-process store.
  const lead = {
    ...data,
    id: randomUUID(),
    received_at: new Date().toISOString(),
    status: "new",
  };
  const leads = readLeads();
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(
    temporary,
    JSON.stringify([lead, ...leads], null, 2),
    "utf8",
  );
  fs.renameSync(temporary, file);
  return lead;
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};
