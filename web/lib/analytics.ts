type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: EventPayload[];
    gtag?: (...args: unknown[]) => void;
    amplitude?: {
      track: (eventName: string, payload?: EventPayload) => void;
    };
  }
}

export function trackEvent(eventName: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const event = { event: eventName, ...payload };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }

  if (window.amplitude?.track) {
    window.amplitude.track(eventName, payload);
  }
}
