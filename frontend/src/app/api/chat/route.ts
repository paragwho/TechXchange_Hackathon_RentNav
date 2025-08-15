export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.text();
  let message = "";
  try {
    const parsed = JSON.parse(body);
    message = parsed.message || "";
  } catch {}

  const reply = `You asked: "${message}".\n\n(Demo) This is a dummy response from the /api/chat route.`;
  return new Response(JSON.stringify({ reply }), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
