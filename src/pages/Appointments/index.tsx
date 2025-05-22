import { useEffect, useState } from "react";
import { Box, Modal, Skeleton } from "@mui/material";
import {
  Check as MuiCheck,
  Clear as MuiX,
  Visibility as MuiVisibility,
} from "@mui/icons-material";
import { DateTime } from "luxon";

import api from "config/api";
import session from "config/session";
import {
  AppointmentEntity,
  AppointmentStatus,
  AppointmentStatusMap,
  AppointmentStatusReverseMap,
  IAppointmentSearchParameters,
} from "config/api/dto";

import { abbreviateName } from "utils/abbreviateName";
import { formatRelativeDate } from "utils/formatRelativeDate";

import {
  CreatePatientButton,
  ModalContainer,
  PatientCardContainer,
  PatientName,
  PatientsContainer,
  PatientsSearchContainer,
} from "pages/Patients/styles";

import Header from "components/Header";
import Search from "components/Search";
import SnackBar from "components/SnackBar";
import { ISnackBarParams } from "components/SnackBar/types";
import Input from "components/Input";
import Button from "components/Button";

import {
  RelativeDate,
  Status,
  DescriptionForm,
  DateContainer,
  AppointmentCard,
} from "./styles";
import Select from "components/Select";

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
  const [descriptionModalOptions, setDescriptionModalOptions] = useState<{
    open: boolean;
    status?: AppointmentStatus;
    appointmentId?: string;
  }>({
    open: false,
  });
  const [updateModalOptions, setUpdateModalOptions] = useState<{
    open: boolean;
  }>({
    open: false,
  });
  const [description, setDescription] = useState("");
  const [appointment, setAppointment] = useState<AppointmentEntity | null>(
    null
  );

  async function getAppointments() {
    const response = await api.getAppointmentsPaginated(paginatedParams);

    setAppointments(response.data);
    setLoading(false);
  }

  async function markAppointmentAsStatus(
    appointmentId: string,
    status: AppointmentStatus
  ) {
    const messageStatus =
      status === AppointmentStatus.DONE ? "pronta" : "cancelada";

    try {
      await api.saveAppointment({
        id: appointmentId,
        status,
        description,
      });

      await getAppointments();

      setDescriptionModalOptions({ open: false });
      setSnackBarProps({
        open: true,
        message: `Consulta marcada como ${messageStatus}!`,
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

  async function updateAppointment() {
    if (appointment) {
      try {
        await api.saveAppointment(appointment);

        await getAppointments();

        setUpdateModalOptions({ open: false });
        setAppointment(null);
        setSnackBarProps({
          open: true,
          message: "Consulta atualizada com sucesso!",
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
  }

  function handleOptions(appointment: AppointmentEntity): JSX.Element {
    if (
      [AppointmentStatus.PENDING_DONE, AppointmentStatus.SCHEDULED].includes(
        appointment.status
      ) &&
      session.isDoctor()
    ) {
      if (DateTime.fromISO(appointment.date) < DateTime.now()) {
        return (
          <>
            <MuiCheck
              fontSize="medium"
              sx={{
                cursor: "pointer",
                color: "#588157",
              }}
              onClick={async () => {
                setDescriptionModalOptions({
                  ...descriptionModalOptions,
                  open: true,
                  status: AppointmentStatus.DONE,
                  appointmentId: appointment.id,
                });
              }}
            />
            <MuiX
              fontSize="medium"
              sx={{
                cursor: "pointer",
                color: "crimson",
              }}
              onClick={() => {
                setDescriptionModalOptions({
                  ...descriptionModalOptions,
                  open: true,
                  status: AppointmentStatus.CANCELED,
                  appointmentId: appointment.id,
                });
              }}
            />
          </>
        );
      } else {
        return (
          <>
            <MuiX
              fontSize="medium"
              sx={{
                cursor: "pointer",
                color: "crimson",
              }}
              onClick={() => {
                setDescriptionModalOptions({
                  ...descriptionModalOptions,
                  open: true,
                  status: AppointmentStatus.CANCELED,
                  appointmentId: appointment.id,
                });
              }}
            />
          </>
        );
      }
    } else {
      return <></>;
    }
  }

  useEffect(() => {
    getAppointments();
  }, [paginatedParams]);

  console.log(appointment);

  return (
    <>
      <Modal
        open={descriptionModalOptions.open}
        onClose={() =>
          setDescriptionModalOptions({
            ...descriptionModalOptions,
            open: false,
          })
        }
      >
        <ModalContainer>
          <h2>Adicione uma descrição (opcional)</h2>
          <DescriptionForm
            onSubmit={async (e) => {
              e.preventDefault();

              if (
                descriptionModalOptions.status &&
                descriptionModalOptions.appointmentId
              ) {
                await markAppointmentAsStatus(
                  descriptionModalOptions.appointmentId,
                  descriptionModalOptions.status
                );
              }
            }}
          >
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
      <Modal
        open={updateModalOptions.open}
        onClose={() =>
          setUpdateModalOptions({ ...updateModalOptions, open: false })
        }
      >
        <ModalContainer>
          <h2>Atualizar consulta</h2>
          <DescriptionForm
            onSubmit={async (e) => {
              e.preventDefault();
              await updateAppointment();
            }}
          >
            <Input
              placeholder={appointment?.description || "Descrição"}
              width="70%"
              height="50px"
              type="text"
              value={appointment?.description || ""}
              onChange={(e) => {
                if (appointment) {
                  setAppointment({
                    ...appointment,
                    description: e.target.value,
                  });
                }
              }}
            />
            <Select
              height="50px"
              width="50%"
              disabled={
                ![
                  AppointmentStatus.PENDING_DONE,
                  AppointmentStatus.SCHEDULED,
                ].includes(appointment?.initialStatus!)
              }
              onChange={(e) => {
                if (appointment) {
                  console.log({
                    value: e.target.value,
                    reverse: AppointmentStatusReverseMap.get(e.target.value),
                  });

                  setAppointment({
                    ...appointment,
                    status: AppointmentStatusReverseMap.get(
                      e.target.value
                    ) as AppointmentStatus,
                  });
                }
              }}
              options={[
                ...(appointment
                  ? [AppointmentStatusMap.get(appointment.initialStatus!) || ""]
                  : []),
                ...[AppointmentStatus.CANCELED, AppointmentStatus.DONE].map(
                  (status) => AppointmentStatusMap.get(status) || ""
                ),
              ]}
              value={
                appointment ? AppointmentStatusMap.get(appointment.status!) : ""
              }
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
          <CreatePatientButton onClick={() => {}}>
            ADICIONAR CONSULTA
          </CreatePatientButton>
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
                <AppointmentCard key={appointment.id}>
                  <PatientName>
                    {session.isDoctor()
                      ? abbreviateName(appointment.Patient.name)
                      : abbreviateName(appointment.Doctor.name)}
                  </PatientName>
                  <Status status={appointment.status}>
                    {AppointmentStatusMap.get(appointment.status)}
                  </Status>
                  <DateContainer>
                    <RelativeDate>
                      {formatRelativeDate(DateTime.fromISO(appointment.date!))}
                    </RelativeDate>
                    {handleOptions(appointment)}
                    <MuiVisibility
                      fontSize="medium"
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setAppointment({
                          ...appointment,
                          initialStatus: appointment.status,
                        });
                        setUpdateModalOptions({ open: true });
                      }}
                    />
                  </DateContainer>
                </AppointmentCard>
              ))}
            </PatientCardContainer>
          </PatientsContainer>
        </PatientsSearchContainer>
      )}
    </>
  );
}

export default Appointments;
