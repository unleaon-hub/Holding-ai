import { formatNotifierMessage } from "@/lib/notifiers/format";
import type { NotifierEvent } from "@/lib/notifiers/types";
import { NextResponse } from "next/server";

const MAX_MESSAGE_LENGTH = 1000;
const DEBUG_NOTIFIER = process.env.NOTIFIER_DEBUG === "true";

function isValidTelegramEvent(payload: unknown): payload is NotifierEvent {
  if (!payload || typeof payload !== "object") {
    return false;
  }
  const candidate = payload as Record<string, unknown>;
  return candidate.type === "new_lead" && typeof candidate.projectSlug === "string" && candidate.projectSlug.trim().length > 0;
}

function trimMessage(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 3)}...`;
}

export async function POST(request: Request) {
  if (DEBUG_NOTIFIER) {
    console.log("[notifier:telegram:route] incoming request");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    if (DEBUG_NOTIFIER) {
      console.log("[notifier:telegram:route] invalid JSON body", error);
    }
    return NextResponse.json({ ok: false, error: "invalid_json" });
  }

  const event = (body as { event?: unknown } | null)?.event;
  if (!isValidTelegramEvent(event)) {
    if (DEBUG_NOTIFIER) {
      console.log("[notifier:telegram:route] invalid payload shape");
    }
    return NextResponse.json({ ok: false, error: "invalid_payload" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    if (DEBUG_NOTIFIER) {
      console.log("[notifier:telegram:route] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing");
    }
    return NextResponse.json({ ok: false, error: "telegram_not_configured" });
  }

  const text = trimMessage(formatNotifierMessage(event), MAX_MESSAGE_LENGTH);

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    if (!telegramResponse.ok) {
      const details = await telegramResponse.text();
      if (DEBUG_NOTIFIER) {
        console.log("[notifier:telegram:route] Telegram API error", telegramResponse.status, details);
      }
      return NextResponse.json({ ok: false, error: "telegram_api_error" });
    }

    if (DEBUG_NOTIFIER) {
      console.log("[notifier:telegram:route] Telegram message sent");
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (DEBUG_NOTIFIER) {
      console.log("[notifier:telegram:route] request to Telegram failed", error);
    }
    return NextResponse.json({ ok: false, error: "telegram_request_failed" });
  }
}
