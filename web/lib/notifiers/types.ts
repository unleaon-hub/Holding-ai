export type LeadEvent = {
  type: "new_lead";
  projectSlug: string;
  leadId: string;
  name: string;
  contact: string;
  message: string;
  createdAt: string;
};

export type NotifierEvent = LeadEvent;

export type NotifierChannelId = "telegram" | "email";

export type NotifierChannel = {
  id: NotifierChannelId;
  send: (event: NotifierEvent) => Promise<void>;
};
