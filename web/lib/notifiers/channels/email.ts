import { formatNotifierMessage } from "../format";
import type { NotifierChannel } from "../types";

export const emailChannel: NotifierChannel = {
  id: "email",
  async send(event) {
    console.log("[notifier:email] queued", formatNotifierMessage(event));
  },
};
