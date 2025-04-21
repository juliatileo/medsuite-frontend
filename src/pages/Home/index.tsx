import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { DateTime } from "luxon";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { Tooltip, Typography, Skeleton, Box } from "@mui/material";
import { ptBR } from "@mui/x-date-pickers/locales";

import Header from "components/Header";
import api from "config/api";
import session from "config/session";
import { AppointmentEntity, UserEntity } from "config/api/dto";

import { CalendarContainer } from "./styles";

function Home() {
  const [appointments, setAppointments] = useState<AppointmentEntity[]>([]);

  const [user, setUser] = useState<UserEntity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setUser(session.getUserInfo() as UserEntity);
  }, []);

  useEffect(() => {
    async function getAppointments() {
      if (user) {
        const appointmentGetFunction = session.isPatient()
          ? api.listAppointmentsByPatientId(user?.id)
          : api.listAppointmentsByDoctorId(user?.id);

        await appointmentGetFunction
          .then((res) => {
            setAppointments(res.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }

    getAppointments();
  }, [user]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomDay = ({ day, selectedDate, ...pickersDayProps }: any) => {
    const appointmentsForDay = appointments.filter(
      (appointment) =>
        DateTime.fromISO(appointment.date)
          .startOf("day")
          .toFormat("yyyy-MM-dd") === day.startOf("day").toFormat("yyyy-MM-dd")
    );

    const descriptions = appointmentsForDay
      .map(
        (appointment) =>
          `${appointment.description} às ${DateTime.fromISO(
            appointment.date
          ).toFormat("HH:mm")}`
      )
      .join("\n");

    return appointmentsForDay.length ? (
      <Tooltip
        title={
          <Typography
            component="span"
            sx={{ whiteSpace: "pre-line", fontSize: "14px" }}
          >
            {descriptions}
          </Typography>
        }
        arrow
      >
        <PickersDay
          key={v4()}
          {...pickersDayProps}
          day={day}
          selectedDate={selectedDate}
          sx={{
            backgroundColor: "#588157",
            color: "#fefefe",
            ":hover": {
              backgroundColor: "#588157",
              color: "#fefefe",
            },
            cursor: "pointer",
          }}
        >
          <div>{day.day}</div>
        </PickersDay>
      </Tooltip>
    ) : (
      <PickersDay
        key={v4()}
        {...pickersDayProps}
        day={day}
        selectedDate={selectedDate}
        sx={{
          backgroundColor: "transparent",
          color: "#333",
          ":hover": {
            backgroundColor: "#588157",
            color: "#fefefe",
          },
          cursor: "default",
        }}
      >
        <div>{day.day}</div>
      </PickersDay>
    );
  };

  return (
    <>
      <Header />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            margin: "30px 0 0 30px",
          }}
        >
          <Skeleton variant="rectangular" width={300} height={250} />
          <Skeleton variant="text" width={150} />
          <Skeleton variant="text" width={200} />
        </Box>
      ) : (
        <LocalizationProvider
          dateAdapter={AdapterLuxon}
          localeText={
            ptBR.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <CalendarContainer>
            <DateCalendar
              slots={{
                day: CustomDay,
              }}
              readOnly
              sx={{ margin: 0 }}
            />
          </CalendarContainer>
        </LocalizationProvider>
      )}
    </>
  );
}

export default Home;
