import { DateTime } from "luxon";

export function nextValidTime(): DateTime {
  const now = DateTime.now();
  let next: DateTime;

  if (now.minute < 30)
    next = now.set({ minute: 30, second: 0, millisecond: 0 });
  else
    next = now.plus({ hours: 1 }).set({ minute: 0, second: 0, millisecond: 0 });

  return next;
}
