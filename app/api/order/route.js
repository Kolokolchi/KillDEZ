import { addLead, corsHeaders } from "../../../lib/leads";

export const runtime = "nodejs";

export async function POST(request) {
  let data;
  try {
    data = await request.json();
    if (!data || typeof data !== "object" || Array.isArray(data))
      throw new Error("Invalid order");
  } catch {
    return Response.json(
      { error: "Некорректная заявка" },
      { status: 400, headers: corsHeaders },
    );
  }
  try {
    const lead = addLead(data);
    return Response.json(
      { success: true, lead_id: lead.id },
      { headers: corsHeaders },
    );
  } catch {
    return Response.json(
      { error: "Не удалось сохранить заявку" },
      { status: 500, headers: corsHeaders },
    );
  }
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
