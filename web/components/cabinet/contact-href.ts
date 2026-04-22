/** `tel:` / `mailto:` для действий по контакту (мягко). */
export function getContactActionHref(phone: string): string | undefined {
  const t = phone.trim();
  if (!t) {
    return undefined;
  }
  if (t.includes("@")) {
    return `mailto:${t}`;
  }
  const digits = t.replace(/[^\d+]/g, "");
  if (digits.length >= 4) {
    return `tel:${digits}`;
  }
  return undefined;
}
