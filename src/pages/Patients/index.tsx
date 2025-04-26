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
  const handleCloseEditPatient = () => {
    setSelectedPatient(null);
    setSelectedPatientId(null);
    setOpenEditPatient(false);
  };
  const handleOpenCreatePatient = () => setOpenCreatePatient(true);
  const handleCloseCreatePatient = () => setOpenCreatePatient(false);

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

  useEffect(() => {
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

  function handleEditPatient(
    res: React.ChangeEvent<HTMLInputElement>,
    field: string,
    patientInfoField?: boolean
  ): void {
    if (patientInfoField) {
      setSelectedPatient((prev) => {
        if (!prev || !prev.patientInfo) return null;

        return {
          ...prev,
          patientInfo: {
            ...prev.patientInfo,
            [field]: res.target.value,
          },
        };
      });
    } else
      setSelectedPatient((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          [field]: res.target.value,
        };
      });
  }

  async function handleUpdatePatient(): Promise<void> {
    if (selectedPatient) {
      await api.updateUser(selectedPatient);

      await getPatients();
    }
  }

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
                  placeholder="Nome"
                  value={selectedPatient?.name ? selectedPatient.name : ""}
                  width="550px"
                  height="60px"
                  type="text"
                  center="false"
                  onChange={(res) => {
                    handleEditPatient(res, "name");
                  }}
                />
                <Input
                  placeholder="Telefone"
                  value={
                    selectedPatient?.cellphone ? selectedPatient.cellphone : ""
                  }
                  width="350px"
                  height="60px"
                  type="text"
                  center="false"
                  onChange={(res) => {
                    handleEditPatient(res, "cellphone");
                  }}
                />
                <Input
                  placeholder="E-mail"
                  value={selectedPatient?.email ? selectedPatient.email : ""}
                  width="450px"
                  height="60px"
                  type="text"
                  center="false"
                  onChange={(res) => {
                    handleEditPatient(res, "email");
                  }}
                />
                <Input
                  placeholder="Data de nascimento"
                  value={
                    selectedPatient?.patientInfo?.birthDate
                      ? DateTime.fromISO(
                          selectedPatient.patientInfo.birthDate
                        ).toFormat("yyyy-MM-dd")
                      : ""
                  }
                  width="450px"
                  height="60px"
                  type="date"
                  center="false"
                  onChange={(res) => {
                    handleEditPatient(res, "birthDate", true);
                  }}
                />
                <Input
                  placeholder="Altura"
                  value={
                    selectedPatient?.patientInfo?.height
                      ? selectedPatient.patientInfo.height.toString()
                      : ""
                  }
                  width="150px"
                  height="60px"
                  type="number"
                  center="true"
                  onChange={(res) => {
                    handleEditPatient(res, "height", true);
                  }}
                />
                <Input
                  placeholder="Peso"
                  value={
                    selectedPatient?.patientInfo?.weight
                      ? selectedPatient.patientInfo.weight.toString()
                      : ""
                  }
                  width="150px"
                  height="60px"
                  type="number"
                  center="true"
                  onChange={(res) => {
                    handleEditPatient(res, "weight", true);
                  }}
                />
                <Input
                  placeholder="Tipo sanguíneo"
                  value={
                    selectedPatient?.patientInfo?.bloodType
                      ? selectedPatient.patientInfo.bloodType.toString()
                      : ""
                  }
                  width="150px"
                  height="60px"
                  type="text"
                  center="true"
                  onChange={(res) => {
                    handleEditPatient(res, "bloodType", true);
                  }}
                />
                <Input
                  placeholder="Sexo"
                  value={
                    selectedPatient?.patientInfo?.sex
                      ? selectedPatient.patientInfo.sex.toString()
                      : ""
                  }
                  width="150px"
                  height="60px"
                  type="text"
                  center="true"
                  onChange={(res) => {
                    handleEditPatient(res, "sex", true);
                  }}
                />
              </ModalInputsContainer>
              <Button
                text="CONCLUÍDO"
                width="280px"
                height="50px"
                onClick={() => {
                  handleUpdatePatient().then(() => handleCloseEditPatient());
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
                  center="false"
                  onChange={() => {}}
                />
                <Input
                  placeholder="Telefone"
                  width="350px"
                  height="60px"
                  type="text"
                  center="false"
                  onChange={() => {}}
                />
                <Input
                  placeholder="E-mail"
                  width="450px"
                  height="60px"
                  type="text"
                  center="false"
                  onChange={() => {}}
                />
                <Input
                  placeholder="Data de nascimento"
                  width="450px"
                  height="60px"
                  type="date"
                  center="false"
                  onChange={() => {}}
                />
                <Input
                  placeholder="Altura"
                  width="150px"
                  height="60px"
                  type="number"
                  center="true"
                  onChange={() => {}}
                />
                <Input
                  placeholder="Peso"
                  width="150px"
                  height="60px"
                  type="number"
                  center="true"
                  onChange={() => {}}
                />
                <Input
                  placeholder="Tipo sanguíneo"
                  width="150px"
                  height="60px"
                  type="text"
                  center="true"
                  onChange={() => {}}
                />
                <Input
                  placeholder="Sexo"
                  width="150px"
                  height="60px"
                  type="text"
                  center="true"
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
