import { DateTime } from "luxon";

export function nextValidTime(appointmentsTime: string[]): DateTime {
  const now = DateTime.now();
  let next: DateTime;

  if (now.minute < 30)
    next = now.set({ minute: 30, second: 0, millisecond: 0 });
  else
    next = now.plus({ hours: 1 }).set({ minute: 0, second: 0, millisecond: 0 });

  const isOccupied = (dt: DateTime) =>
    appointmentsTime?.some((time) => time === dt.toISO());

  while (
    next.weekday > 5 ||
    next.hour < 8 ||
    next.hour >= 18 ||
    isOccupied(next)
  ) {
    if (next.hour >= 18 || next.weekday > 5) {
      do {
        next = next
          .plus({ days: 1 })
          .set({ hour: 8, minute: 0, second: 0, millisecond: 0 });
      } while (next.weekday > 5);
    } else if (next.hour < 8) {
      next = next.set({ hour: 8, minute: 0, second: 0, millisecond: 0 });
    } else {
      next = next.plus({ minutes: 30 });

      if (next.hour >= 18) {
        do {
          next = next
            .plus({ days: 1 })
            .set({ hour: 8, minute: 0, second: 0, millisecond: 0 });
        } while (next.weekday > 5);
      }
    }
  }

  return next;
}
