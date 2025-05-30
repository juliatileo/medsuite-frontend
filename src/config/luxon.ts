import { Settings, Info } from "luxon";

Settings.defaultWeekSettings = {
  firstDay: 1,
  minimalDays: Info.getMinimumDaysInFirstWeek(),
  weekend: [6, 7],
};
