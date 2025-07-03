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

import {
  Card,
  CardContent,
  CardsContainer,
  CardTitle,
  SmallCardContainer,
} from "./styles";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

function Home() {
  const user = session.getUserInfo() as UserEntity;

  const [appointments, setAppointments] = useState<AppointmentEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboard, setDashboard] = useState<{
    totalUsers: number;
    concludedAppointments: number;
    scheduledAppointments: number;
    canceledAppointments: number;
    pendingAppointments: number;
    todayAppointments: number;
  }>({
    totalUsers: 0,
    concludedAppointments: 0,
    scheduledAppointments: 0,
    canceledAppointments: 0,
    pendingAppointments: 0,
    todayAppointments: 0,
  });

  useEffect(() => {
    async function getAppointments() {
      if (user && user.id) {
        const appointmentGetFunction = session.isPatient()
          ? api.listAppointmentsByPatientId(user.id)
          : api.listAppointmentsByDoctorId(user.id);

        const res = await appointmentGetFunction;

        setAppointments(res.data);
      }
    }

    async function getDashboard() {
      if (user && user.id) {
        const res = await api.getDashboard(user.id);

        setDashboard(res.data);
      }
    }

    getDashboard();
    getAppointments();

    setLoading(false);
  }, []);

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
          <SmallCardContainer>
            <Card>
              <CardTitle>
                {session.isDoctor()
                  ? "Pacientes cadastrados"
                  : "Doutores disponíveis"}{" "}
              </CardTitle>
              <CardContent>{dashboard.totalUsers}</CardContent>
            </Card>
            <Card>
              <CardTitle>Consultas concluídas</CardTitle>
              <CardContent>{dashboard.concludedAppointments}</CardContent>
            </Card>
            <Card>
              <CardTitle>Consultas pendentes</CardTitle>
              <CardContent>{dashboard.pendingAppointments}</CardContent>
            </Card>
            <Card>
              <CardTitle>Consultas agendadas</CardTitle>
              <CardContent>{dashboard.scheduledAppointments}</CardContent>
            </Card>
            <Card>
              <CardTitle>Consultas canceladas</CardTitle>
              <CardContent>{dashboard.canceledAppointments}</CardContent>
            </Card>
            <Card>
              <CardTitle>Consultas hoje</CardTitle>
              <CardContent>{dashboard.todayAppointments}</CardContent>
            </Card>
          </SmallCardContainer>
        </CardsContainer>
      )}
    </>
  );
}

export default Home;
