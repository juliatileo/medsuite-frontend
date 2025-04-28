import { useEffect, useState } from "react";
import { Box, Skeleton, Modal } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { DateTime } from "luxon";

import Button from "components/Button";
import Input from "components/Input";
import Header from "components/Header";
import Select from "components/Select";
import api from "config/api";
import { UserEntity } from "config/api/dto";
import { abbreviateName } from "utils/abbreviateName";
import { bloodTypes, sexes } from "utils/types";

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
  const [patient, setPatient] = useState<UserEntity | null>({
    name: "",
    password: "",
    email: "",
    cellphone: "",
    type: 1,
    firstAccess: true,
    patientInfo: {
      birthDate: "",
      bloodType: "",
      height: 0,
      weight: 0,
      sex: "",
    },
  });

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
  }, [selectedPatientId, setSelectedPatient]);

  function handleEditPatient({
    res,
    field,
    patientInfoField,
    createPatient = false,
  }: {
    res:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>;
    field: string;
    patientInfoField?: boolean;
    createPatient?: boolean;
  }): void {
    const setFunc = createPatient ? setPatient : setSelectedPatient;

    if (patientInfoField) {
      setFunc((prev) => {
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
      setFunc((prev) => {
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

  function validateUserEntity(user: UserEntity): boolean {
    if (!user.name || user.name.trim() === "") return false;
    if (!user.password || user.password.trim() === "") return false;
    if (!user.email || user.email.trim() === "") return false;
    if (!user.cellphone || user.cellphone.trim() === "") return false;
    if (user.type === undefined || user.type === null) return false;

    if (!user.patientInfo) return false;
    if (!user.patientInfo.birthDate || user.patientInfo.birthDate.trim() === "")
      return false;
    if (!user.patientInfo.bloodType || user.patientInfo.bloodType.trim() === "")
      return false;
    if (!user.patientInfo.height || user.patientInfo.height <= 0) return false;
    if (!user.patientInfo.weight || user.patientInfo.weight <= 0) return false;
    if (!user.patientInfo.sex || user.patientInfo.sex.trim() === "")
      return false;

    return true;
  }

  async function handleCreatePatient(createPatient: UserEntity): Promise<void> {
    if (!validateUserEntity(createPatient)) {
      return;
    }

    await api.saveUser(createPatient);

    setPatient({
      name: "",
      password: "",
      email: "",
      cellphone: "",
      type: 1,
      firstAccess: true,
      patientInfo: {
        birthDate: "",
        bloodType: "",
        height: 0,
        weight: 0,
        sex: "",
      },
    });

    await getPatients();
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
                    {DateTime.fromISO(patient.createdAt!).toFormat(
                      "dd/MM/yyyy"
                    )}
                  </span>
                  <FaEye
                    size={18}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedPatientId(patient.id!);
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
                    handleEditPatient({ res, field: "name" });
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
                    handleEditPatient({ res, field: "cellphone" });
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
                    handleEditPatient({ res, field: "email" });
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
                    handleEditPatient({
                      res,
                      field: "birthDate",
                      patientInfoField: true,
                    });
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
                    handleEditPatient({
                      res,
                      field: "height",
                      patientInfoField: true,
                    });
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
                    handleEditPatient({
                      res,
                      field: "weight",
                      patientInfoField: true,
                    });
                  }}
                />
                <Select
                  value={
                    selectedPatient?.patientInfo?.bloodType
                      ? selectedPatient.patientInfo.bloodType.toString()
                      : ""
                  }
                  width="150px"
                  height="60px"
                  center="true"
                  onChange={(res) => {
                    handleEditPatient({
                      res,
                      field: "bloodType",
                      patientInfoField: true,
                    });
                  }}
                  options={bloodTypes}
                />
                <Select
                  value={
                    selectedPatient?.patientInfo?.sex
                      ? selectedPatient.patientInfo.sex.toString()
                      : ""
                  }
                  width="150px"
                  height="60px"
                  center="true"
                  onChange={(res) => {
                    handleEditPatient({
                      res,
                      field: "sex",
                      patientInfoField: true,
                    });
                  }}
                  options={sexes}
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
                  onChange={(res) => {
                    handleEditPatient({
                      res,
                      field: "name",
                      createPatient: true,
                    });
                  }}
                />
                <Input
                  placeholder="Telefone"
                  width="350px"
                  height="60px"
                  type="text"
                  center="false"
                  onChange={(res) => {
                    handleEditPatient({
                      res,
                      field: "cellphone",
                      createPatient: true,
                    });
                  }}
                />
                <Input
                  placeholder="E-mail"
                  width="450px"
                  height="60px"
                  type="text"
                  center="false"
                  onChange={(res) => {
                    handleEditPatient({
                      res,
                      field: "email",
                      createPatient: true,
                    });
                  }}
                />
                <Input
                  placeholder="Data de nascimento"
                  width="450px"
                  height="60px"
                  type="date"
                  center="false"
                  onChange={(res) => {
                    handleEditPatient({
                      res,
                      field: "birthDate",
                      patientInfoField: true,
                      createPatient: true,
                    });
                  }}
                />
                <Input
                  placeholder="Senha"
                  width="580px"
                  height="60px"
                  type="password"
                  center="false"
                  onChange={(res) => {
                    handleEditPatient({
                      res,
                      field: "password",
                      createPatient: true,
                    });
                  }}
                />
                <Select
                  value="Selecione o tipo sanguíneo"
                  width="330px"
                  height="60px"
                  center="true"
                  onChange={(res) => {
                    handleEditPatient({
                      res,
                      field: "bloodType",
                      patientInfoField: true,
                      createPatient: true,
                    });
                  }}
                  options={bloodTypes}
                />
                <Input
                  placeholder="Altura"
                  width="270px"
                  height="60px"
                  type="number"
                  center="true"
                  onChange={(res) => {
                    handleEditPatient({
                      res,
                      field: "height",
                      patientInfoField: true,
                      createPatient: true,
                    });
                  }}
                />
                <Input
                  placeholder="Peso"
                  width="270px"
                  height="60px"
                  type="number"
                  center="true"
                  onChange={(res) => {
                    handleEditPatient({
                      res,
                      field: "weight",
                      patientInfoField: true,
                      createPatient: true,
                    });
                  }}
                />
                <Select
                  value="Selecione o sexo"
                  width="270px"
                  height="60px"
                  center="true"
                  onChange={(res) => {
                    console.log(res.target.value);

                    handleEditPatient({
                      res,
                      field: "sex",
                      patientInfoField: true,
                      createPatient: true,
                    });
                  }}
                  options={sexes}
                />
              </ModalInputsContainer>
              <Button
                text="CONCLUÍDO"
                width="280px"
                height="50px"
                onClick={() => {
                  if (patient) {
                    handleCreatePatient(patient).then(() => {
                      handleCloseCreatePatient();
                    });
                  }
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
