import { emailChannel } from "./channels/email";
import { telegramChannel } from "./channels/telegram";
import type { NotifierChannel, NotifierChannelId, NotifierEvent } from "./types";

const channelRegistry: Record<NotifierChannelId, NotifierChannel> = {
  telegram: telegramChannel,
  email: emailChannel,
};

export const enabledChannels: NotifierChannelId[] = ["telegram"];

export async function notify(event: NotifierEvent): Promise<void> {
  for (const channelId of enabledChannels) {
    const channel = channelRegistry[channelId];
    if (!channel) {
      continue;
    }
    try {
      await channel.send(event);
    } catch (error) {
      console.error(`[notifier] channel "${channelId}" failed`, error);
    }
  }
}
