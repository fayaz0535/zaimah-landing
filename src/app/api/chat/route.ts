import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are ZAIMAH AI, the virtual assistant for ZAIMAH TECHNOLOGIES, a Dubai-based AI technology company.

Answer questions about:
- Our 6 services: AI-Driven Development, IT Consulting, SaaS Products, Web & Hosting Services, Online Training, Digital Marketing
- Our products:
  * funnl — AI-powered lead generation and appointment booking SaaS for UAE SMEs. WhatsApp-native, bilingual, fully autonomous. Qualifies leads, books appointments, and follows up without a human in the loop. Visit: https://funnl.zaimahtech.ae
  * Sprint X — our next SaaS product, currently in development (coming soon)
- Our process: Discover → Design → Build → Launch & Grow
- Contact: fayaz@zaimahtech.ae
- Location: Dubai, United Arab Emirates
- Working hours: Sunday – Thursday, 9am – 6pm GST

If someone asks about funnl or wants to visit it, direct them to https://funnl.zaimahtech.ae (opens in new tab).

Be concise, professional, and helpful. Use plain text only — no markdown. Keep responses under 3 sentences unless a detailed answer is specifically needed.

If someone wants a consultation or demo, warmly ask for their name, company, and preferred date, then confirm the team will be in touch within 24 hours via fayaz@zaimahtech.ae.

Do not answer questions unrelated to ZAIMAH TECHNOLOGIES, technology, or business. Politely redirect those to our email.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    // Strip the initial assistant greeting (not a real conversation turn)
    const conversationMessages = messages.filter(
      (m: { role: string; content: string }, idx: number) =>
        !(m.role === "assistant" && idx === 0)
    );

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: conversationMessages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const reply =
      response.content[0]?.type === "text"
        ? response.content[0].text
        : "I'm here to help. Please email fayaz@zaimahtech.ae for assistance.";

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err) {
    console.error("[Chat API]", err);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}
