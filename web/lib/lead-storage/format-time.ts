/** Подпись времени для списка лидов (от ISO `createdAt`). */
export function formatLeadTimeLabel(iso: string, now: Date = new Date()): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return "—";
  }
  const dayStart = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const t = dayStart(d);
  const t0 = dayStart(now);
  const diffDays = Math.round((t0 - t) / 86400000);
  if (diffDays === 0) {
    return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  }
  if (diffDays === 1) {
    return "вчера";
  }
  if (diffDays < 7) {
    return `${diffDays} дн.`;
  }
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}
