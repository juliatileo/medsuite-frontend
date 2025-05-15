import { DateTime } from "luxon";
import { captalize } from "./captalize";

export function formatRelativeDate(date: DateTime): string {
  const today = DateTime.local().startOf("day");
  const targetDate = date.startOf("day");
  const diffInDays = targetDate.diff(today, "days").days;

  if (diffInDays === 0) {
    return `Hoje às ${date.toFormat("HH:mm")}`;
  } else if (diffInDays === 1) {
    return `Amanhã às ${date.toFormat("HH:mm")}`;
  } else if (diffInDays > 1 && targetDate.weekNumber === today.weekNumber) {
    return `${captalize(targetDate.setLocale("pt-BR").toFormat("cccc"))} às ${date.toFormat("HH:mm")}`;
  } else if (diffInDays < 0) {
    return `Há ${Math.abs(diffInDays)}d`;
  } else {
    return targetDate.setLocale("pt-BR").toFormat("dd/MM/yyyy");
  }
}
