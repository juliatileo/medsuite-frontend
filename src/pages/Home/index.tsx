import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { DateTime } from "luxon";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";

import { Tooltip, Typography, Skeleton, Box } from "@mui/material";
import { ptBR } from "@mui/x-date-pickers/locales";

import Header from "components/Header";
import api from "config/api";
import session from "config/session";
import { AppointmentEntity, UserEntity } from "config/api/dto";

import { Card, CardContent, CardsContainer, CardTitle } from "./styles";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

function Home() {
  const [appointments, setAppointments] = useState<AppointmentEntity[]>([]);

  const [user, setUser] = useState<UserEntity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setUser(session.getUserInfo() as UserEntity);
  }, []);

  useEffect(() => {
    async function getAppointments() {
      if (user && user.id) {
        const appointmentGetFunction = session.isPatient()
          ? api.listAppointmentsByPatientId(user.id)
          : api.listAppointmentsByDoctorId(user.id);

        const res = await appointmentGetFunction;

        setAppointments(res.data);

        setLoading(false);
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
          `${appointment.description || "Consulta"} às ${DateTime.fromISO(
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
        <CardsContainer>
          <Card>
            <CardTitle>Calendário de consultas</CardTitle>
            <LocalizationProvider
              dateAdapter={AdapterLuxon}
              localeText={
                ptBR.components.MuiLocalizationProvider.defaultProps.localeText
              }
            >
              <DateCalendar
                slots={{
                  day: CustomDay,
                }}
                readOnly
                sx={{ margin: 0, backgroundColor: "#F6F6F6" }}
              />
            </LocalizationProvider>
          </Card>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              backgroundColor: "red",
            }}
          >
            <Card style={{ width: "180px" }}>
              <CardTitle>Pacientes cadastrados</CardTitle>
              <CardContent>18</CardContent>
            </Card>
            <Card style={{ width: "180px" }}>
              <CardTitle>Consultas concluídas</CardTitle>
              <CardContent>187</CardContent>
            </Card>
            <Card style={{ width: "180px" }}>
              <CardTitle>Consultas pendentes</CardTitle>
              <CardContent>11</CardContent>
            </Card>
            <Card style={{ width: "180px" }}>
              <CardTitle>Consultas hoje</CardTitle>
              <CardContent>3</CardContent>
            </Card>
          </div>
        </CardsContainer>
      )}
    </>
  );
}

export default Home;
