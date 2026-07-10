export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);

  const suffix = hours >= 12 ? "pm" : "am";

  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutes.toString().padStart(2, "0")}${suffix}`;
}
