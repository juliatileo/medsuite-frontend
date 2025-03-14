import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import Header from "components/Header";

function Home() {
  const highlightedDays = [1, 2, 3];

  return (
    <>
      <Header />
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DateCalendar
          slots={{
            day: <span></span>,
          }}
          slotProps={{
            day: {
              highlightedDays,
            } as any,
          }}
          readOnly
        />
      </LocalizationProvider>
    </>
  );
}

export default Home;
