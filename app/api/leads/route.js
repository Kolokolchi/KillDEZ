import { readLeads, corsHeaders } from "../../../lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  try {
    return Response.json(readLeads(), { headers: corsHeaders });
  } catch {
    return Response.json(
      { error: "Не удалось прочитать заявки" },
      { status: 500, headers: corsHeaders },
    );
  }
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
