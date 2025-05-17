import { Check as MuiCheck, Clear as MuiX } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Box, Modal, Skeleton } from "@mui/material";
import { DateTime } from "luxon";

import Header from "components/Header";
import Search from "components/Search";

import {
  AppointmentEntity,
  AppointmentStatus,
  AppointmentStatusMap,
  IAppointmentSearchParameters,
} from "config/api/dto";
import api from "config/api";
import session from "config/session";
import SnackBar from "components/SnackBar";
import { ISnackBarParams } from "components/SnackBar/types";
import {
  DateContainer,
  ModalContainer,
  PatientCard,
  PatientCardContainer,
  PatientName,
  PatientsContainer,
  PatientsSearchContainer,
} from "pages/Patients/styles";
import { abbreviateName } from "utils/abbreviateName";
import { formatRelativeDate } from "utils/formatRelativeDate";
import { RelativeDate, Status, DescriptionForm } from "./styles";
import Input from "components/Input";
import Button from "components/Button";

function Appointments() {
  const user = session.getUserInfo();
  const field = session.isDoctor() ? "doctorId" : "patientId";

  const [paginatedParams, setPaginatedParams] =
    useState<IAppointmentSearchParameters>({
      [field]: user ? user.id : undefined,
    });
  const [appointments, setAppointments] = useState<AppointmentEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackBarProps, setSnackBarProps] = useState<ISnackBarParams>({
    open: false,
    message: "",
    severity: "success",
  });
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState("");

  async function getAppointments() {
    const response = await api.getAppointmentsPaginated(paginatedParams);

    setAppointments(response.data);
    setLoading(false);
  }

  async function markAppointmentAsDone(appointmentId: string) {
    try {
      await api.saveAppointment({
        id: appointmentId,
        status: AppointmentStatus.DONE,
      });

      await getAppointments();

      setSnackBarProps({
        open: true,
        message: "Consulta marcada como pronta!",
        severity: "success",
      });
    } catch {
      setSnackBarProps({
        open: true,
        message: "Ocorreu um erro inesperado. Tente novamente.",
        severity: "error",
      });
    }
  }

  useEffect(() => {
    getAppointments();
  }, [paginatedParams]);

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalContainer>
          <h2>Adicione uma descrição (opcional)</h2>
          <DescriptionForm>
            <Input
              placeholder="Descrição"
              width="70%"
              height="50px"
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Button text="CONCLUÍDO" width="200px" height="50px" />
          </DescriptionForm>
        </ModalContainer>
      </Modal>
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
        <PatientsSearchContainer>
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
          <PatientsContainer>
            <PatientCardContainer>
              {appointments.map((appointment: AppointmentEntity) => (
                <PatientCard key={appointment.id}>
                  <PatientName>
                    {abbreviateName(appointment.Patient.name)}
                  </PatientName>
                  <Status status={appointment.status}>
                    {AppointmentStatusMap.get(appointment.status)}
                  </Status>
                  <DateContainer>
                    <RelativeDate>
                      {formatRelativeDate(DateTime.fromISO(appointment.date!))}
                    </RelativeDate>
                    {[
                      AppointmentStatus.PENDING_DONE,
                      AppointmentStatus.SCHEDULED,
                    ].includes(appointment.status) ? (
                      <>
                        <MuiCheck
                          fontSize="medium"
                          sx={{
                            cursor: "pointer",
                            color: "#588157",
                          }}
                          onClick={async () => {
                            setOpenModal(true);
                          }}
                        />
                        <MuiX
                          fontSize="medium"
                          sx={{
                            cursor: "pointer",
                            color: "crimson",
                          }}
                          onClick={() => {
                            setOpenModal(true);
                          }}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </DateContainer>
                </PatientCard>
              ))}
            </PatientCardContainer>
          </PatientsContainer>
        </PatientsSearchContainer>
      )}
    </>
  );
}

export default Appointments;
