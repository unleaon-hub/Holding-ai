import type { NotifierChannel } from "../types";

export const telegramChannel: NotifierChannel = {
  id: "telegram",
  async send(event) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3_000);

    try {
      const response = await fetch("/api/notifiers/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event }),
        signal: controller.signal,
      });

      if (!response.ok) {
        console.warn("[notifier:telegram] endpoint responded with non-200", response.status);
        return;
      }

      const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!data?.ok) {
        console.warn("[notifier:telegram] endpoint returned error", data?.error ?? "unknown_error");
      }
    } catch (error) {
      console.warn("[notifier:telegram] send failed", error);
    } finally {
      clearTimeout(timeoutId);
    }
  },
};
