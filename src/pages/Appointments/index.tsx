import Header from "components/Header";
import Search from "components/Search";

import {
  AppointmentCard,
  AppointmentCardContainer,
  AppointmentsContainer,
} from "./styles";
import { useEffect, useState } from "react";
import {
  AppointmentEntity,
  IAppointmentSearchParameters,
} from "config/api/dto";
import api from "config/api";
import session from "config/session";
import SnackBar from "components/SnackBar";
import { ISnackBarParams } from "components/SnackBar/types";
import { Box, Skeleton } from "@mui/material";

function Appointments() {
  const user = session.getUserInfo();
  const field = session.isDoctor() ? "doctorId" : "patientId";

  const [paginatedParams, setPaginatedParams] =
    useState<IAppointmentSearchParameters>({
      offset: 0,
      limit: 10,
      page: 0,
      [field]: user ? user.id : undefined,
    });
  const [appointments, setAppointments] = useState<AppointmentEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackBarProps, setSnackBarProps] = useState<ISnackBarParams>({
    open: false,
    message: "",
    severity: "success",
  });

  async function getAppointments() {
    const response = await api.getAppointmentsPaginated(paginatedParams);

    setAppointments(response.data.rows);
    setLoading(false);
  }

  useEffect(() => {
    getAppointments();
  }, [paginatedParams]);

  return (
    <>
      <Header />
      <SnackBar
        severity={snackBarProps.severity}
        open={snackBarProps.open}
        setOpen={setSnackBarProps}
        message={snackBarProps.message}
      />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 3,
            marginTop: "30px",
            justifyContent: "center",
          }}
        >
          <Skeleton variant="rectangular" width={800} height={250} />
          <Skeleton variant="rectangular" width={800} height={250} />
          <Skeleton variant="rectangular" width={800} height={250} />
          <Skeleton variant="rectangular" width={800} height={250} />
          <Skeleton variant="rectangular" width={800} height={250} />
          <Skeleton variant="rectangular" width={800} height={250} />
          <Skeleton variant="rectangular" width={800} height={250} />
          <Skeleton variant="rectangular" width={800} height={250} />
        </Box>
      ) : (
        <AppointmentsContainer>
          <Search
            onChange={(e) => {
              const value = e.target.value;

              clearTimeout((window as any).searchDebounceTimeout);

              (window as any).searchDebounceTimeout = setTimeout(() => {
                setPaginatedParams({
                  ...paginatedParams,
                  doctorName: value,
                  patientName: value,
                });
              }, 1000);
            }}
          />
          <AppointmentCardContainer>
            {appointments.map((appointment) => (
              <AppointmentCard>{appointment.Patient.name}</AppointmentCard>
            ))}
          </AppointmentCardContainer>
        </AppointmentsContainer>
      )}
    </>
  );
}

export default Appointments;
