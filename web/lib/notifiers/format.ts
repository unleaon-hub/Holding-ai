import type { NotifierEvent } from "./types";

export function formatNotifierMessage(event: NotifierEvent): string {
  if (event.type === "new_lead") {
    return [
      "New lead",
      `Project: ${event.projectSlug}`,
      `Name: ${event.name}`,
      `Contact: ${event.contact}`,
      `Message: ${event.message || "-"}`,
      `Lead ID: ${event.leadId}`,
      `Created: ${event.createdAt}`,
    ].join(" | ");
  }

  return "Unsupported notifier event";
}
