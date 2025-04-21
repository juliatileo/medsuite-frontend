import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { FaPencilAlt } from "react-icons/fa";

import Header from "components/Header";
import api from "config/api";
import { UserEntity } from "config/api/dto";
import { abbreviateName } from "utils/abbreviateName";

import {
  DateContainer,
  PatientCard,
  PatientCardContainer,
  PatientName,
} from "./styles";
import { DateTime } from "luxon";

function Patients() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<UserEntity[]>([]);

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

  console.log(patients);

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
        <PatientCardContainer>
          {patients.map((patient) => (
            <PatientCard key={patient.id}>
              <PatientName>{abbreviateName(patient.name)}</PatientName>
              <DateContainer>
                <span>
                  {DateTime.fromISO(patient.createdAt).toFormat("dd/MM/yyyy")}
                </span>
                <FaPencilAlt size={18} />
              </DateContainer>
            </PatientCard>
          ))}
        </PatientCardContainer>
      )}
    </>
  );
}

export default Patients;
