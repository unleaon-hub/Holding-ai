export type NotificationType = "new_lead" | "info";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  projectSlug?: string;
};

export type PushNotificationInput = {
  type: NotificationType;
  title: string;
  message: string;
  projectSlug?: string;
};

export type NotificationsStateV1 = {
  version: 1;
  notifications: Notification[];
};
