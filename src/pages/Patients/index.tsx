import { useEffect, useState } from "react";
import { Box, Skeleton, Modal } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { DateTime } from "luxon";

import Button from "components/Button";
import Input from "components/Input";
import Header from "components/Header";
import api from "config/api";
import { UserEntity } from "config/api/dto";
import { abbreviateName } from "utils/abbreviateName";

import {
  CreatePatientButton,
  DateContainer,
  ModalContainer,
  ModalInputsContainer,
  PatientCard,
  PatientCardContainer,
  PatientName,
} from "./styles";

function Patients() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<UserEntity[]>([]);
  const [openEditPatient, setOpenEditPatient] = useState(false);
  const [openCreatePatient, setOpenCreatePatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<UserEntity | null>(
    null
  );
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );

  const handleOpenEditPatient = () => setOpenEditPatient(true);
  const handleCloseEditPatient = () => setOpenEditPatient(false);
  const handleOpenCreatePatient = () => setOpenCreatePatient(true);
  const handleCloseCreatePatient = () => setOpenCreatePatient(false);

  useEffect(() => {
    async function getPatients() {
      await api
        .listPatients()
        .then((res) => {
          setPatients(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    getPatients();
  }, []);

  useEffect(() => {
    async function getUserById() {
      if (selectedPatientId !== null) {
        await api
          .getUserById(selectedPatientId)
          .then((res) => {
            setSelectedPatient(res.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }

    getUserById();
  }, [selectedPatientId]);

  return (
    <>
      <Header />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            marginTop: "30px",
            alignItems: "center",
          }}
        >
          <Skeleton variant="rectangular" width={1250} height={80} />
          <Skeleton variant="rectangular" width={1250} height={80} />
          <Skeleton variant="rectangular" width={1250} height={80} />
          <Skeleton variant="rectangular" width={1250} height={80} />
          <Skeleton variant="rectangular" width={1250} height={80} />
          <Skeleton variant="rectangular" width={1250} height={80} />
          <Skeleton variant="rectangular" width={1250} height={80} />
          <Skeleton variant="rectangular" width={1250} height={80} />
          <Skeleton variant="rectangular" width={1250} height={80} />
        </Box>
      ) : (
        <>
          <PatientCardContainer>
            {patients.map((patient) => (
              <PatientCard key={patient.id}>
                <PatientName>{abbreviateName(patient.name)}</PatientName>
                <DateContainer>
                  <span>
                    {DateTime.fromISO(patient.createdAt).toFormat("dd/MM/yyyy")}
                  </span>
                  <FaEye
                    size={18}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedPatientId(patient.id);
                      handleOpenEditPatient();
                    }}
                  />
                </DateContainer>
              </PatientCard>
            ))}
          </PatientCardContainer>
          <CreatePatientButton onClick={handleOpenCreatePatient}>
            ADICIONAR PACIENTE
          </CreatePatientButton>
          <Modal open={openEditPatient} onClose={handleCloseEditPatient}>
            <ModalContainer>
              <span> Editar paciente</span>
              <ModalInputsContainer>
                <Input
                  placeholder={
                    selectedPatient?.name ? selectedPatient.name : "Nome"
                  }
                  width="550px"
                  height="60px"
                  type="text"
                  onChange={() => {}}
                />
                <Input
                  placeholder={
                    selectedPatient?.cellphone
                      ? selectedPatient.cellphone
                      : "Telefone"
                  }
                  width="350px"
                  height="60px"
                  type="text"
                  onChange={() => {}}
                />
                <Input
                  placeholder={
                    selectedPatient?.email ? selectedPatient.email : "E-mail"
                  }
                  width="450px"
                  height="60px"
                  type="text"
                  onChange={() => {}}
                />
                <Input
                  placeholder={"Data de nascimento"}
                  width="450px"
                  height="60px"
                  type="date"
                  onChange={() => {}}
                />
                <Input
                  placeholder={
                    selectedPatient?.patientInfo?.height
                      ? selectedPatient.patientInfo.height.toString()
                      : "Altura"
                  }
                  width="150px"
                  height="60px"
                  type="number"
                  center
                  onChange={() => {}}
                />
                <Input
                  placeholder={
                    selectedPatient?.patientInfo?.weight
                      ? selectedPatient.patientInfo.weight.toString()
                      : "Altura"
                  }
                  width="150px"
                  height="60px"
                  type="number"
                  center
                  onChange={() => {}}
                />
                <Input
                  placeholder={
                    selectedPatient?.patientInfo?.bloodType
                      ? selectedPatient.patientInfo.bloodType
                      : "Altura"
                  }
                  width="150px"
                  height="60px"
                  type="text"
                  center
                  onChange={() => {}}
                />
                <Input
                  placeholder={
                    selectedPatient?.patientInfo?.sex
                      ? selectedPatient.patientInfo.sex
                      : "Altura"
                  }
                  width="150px"
                  height="60px"
                  type="text"
                  center
                  onChange={() => {}}
                />
              </ModalInputsContainer>
              <Button
                text="CONCLUÍDO"
                width="280px"
                height="50px"
                onClick={() => {
                  handleCloseEditPatient();
                }}
              />
            </ModalContainer>
          </Modal>
          <Modal open={openCreatePatient} onClose={handleCloseCreatePatient}>
            <ModalContainer>
              <span>Criar paciente</span>
              <ModalInputsContainer>
                <Input
                  placeholder="Nome"
                  width="550px"
                  height="60px"
                  type="text"
                  onChange={() => {}}
                />
                <Input
                  placeholder="Telefone"
                  width="350px"
                  height="60px"
                  type="text"
                  onChange={() => {}}
                />
                <Input
                  placeholder="E-mail"
                  width="450px"
                  height="60px"
                  type="text"
                  onChange={() => {}}
                />
                <Input
                  placeholder="Data de nascimento"
                  width="450px"
                  height="60px"
                  type="date"
                  onChange={() => {}}
                />
                <Input
                  placeholder="Altura"
                  width="150px"
                  height="60px"
                  type="number"
                  center
                  onChange={() => {}}
                />
                <Input
                  placeholder="Peso"
                  width="150px"
                  height="60px"
                  type="number"
                  center
                  onChange={() => {}}
                />
                <Input
                  placeholder="Tipo sanguíneo"
                  width="150px"
                  height="60px"
                  type="text"
                  center
                  onChange={() => {}}
                />
                <Input
                  placeholder="Sexo"
                  width="150px"
                  height="60px"
                  type="text"
                  center
                  onChange={() => {}}
                />
              </ModalInputsContainer>
              <Button
                text="CONCLUÍDO"
                width="280px"
                height="50px"
                onClick={() => {
                  handleCloseCreatePatient();
                }}
              />
            </ModalContainer>
          </Modal>
        </>
      )}
    </>
  );
}

export default Patients;
