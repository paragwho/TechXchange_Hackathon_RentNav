import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000/chat";

    const backendRes = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: message }),
    });

    if (!backendRes.ok) {
      const errorBody = await backendRes.text();
      console.error("Backend error:", errorBody);
      return NextResponse.json(
        { error: "Error from backend" },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json({ reply: data.answer });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}