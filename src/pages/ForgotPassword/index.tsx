import { useState } from "react";
import { AxiosError } from "axios";

import api from "config/api";

import SnackBar from "components/SnackBar";
import { ISnackBarParams } from "components/SnackBar/types";
import Input from "components/Input";
import Button from "components/Button";

import { LoginContainer } from "pages/Login/styles";

import { validateEmail } from "utils/validateEmail";

function ForgotPassword(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [snackBarProps, setSnackBarProps] = useState<ISnackBarParams>({
    open: false,
    message: "",
    severity: "success",
  });

  async function forgotPassword() {
    if (!email) {
      setSnackBarProps({
        open: true,
        message: "Preencha todos os campos.",
        severity: "error",
      });

      return;
    }

    if (!validateEmail(email)) {
      setSnackBarProps({
        open: true,
        message: "E-mail inválido.",
        severity: "error",
      });

      return;
    }

    await api
      .forgotPassword({ email })
      .then(() => {
        setSnackBarProps({
          open: true,
          message: "E-mail enviado com sucesso.",
          severity: "success",
        });
      })
      .catch((err: AxiosError) => {
        if (
          err.status === 404 &&
          (err.response?.data as { message: string }).message ===
            "User not found"
        ) {
          setSnackBarProps({
            open: true,
            message: "Usuário não encontrado.",
            severity: "error",
          });
        } else
          setSnackBarProps({
            open: true,
            message: "Ocorreu um erro ao enviar o e-mail, tente novamente.",
            severity: "error",
          });
      });
  }

  return (
    <>
      <SnackBar
        severity={snackBarProps.severity}
        open={snackBarProps.open}
        setOpen={setSnackBarProps}
        message={snackBarProps.message}
      />
      <LoginContainer>
        <h2>Preencha seu e-mail para recuperar sua senha.</h2>
        <form
          onSubmit={async (res) => {
            res.preventDefault();

            await forgotPassword();
          }}
        >
          <Input
            placeholder="E-mail"
            height="50px"
            width="600px"
            type="text"
            onChange={(res) => setEmail(res.target.value)}
          />
          <Button
            text="RECUPERAR SENHA"
            width="350px"
            height="65px"
            onClick={() => {}}
          />
        </form>
      </LoginContainer>
    </>
  );
}

export default ForgotPassword;
