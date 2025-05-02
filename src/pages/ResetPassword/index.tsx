import { useState } from "react";
import { Navigate } from "react-router";

import api from "config/api";

import Button from "components/Button";
import Input from "components/Input";
import SnackBar from "components/SnackBar";
import { ISnackBarParams } from "components/SnackBar/types";

import { LoginContainer } from "pages/Login/styles";
import { useQuery } from "utils/useQuery";

function ResetPassword(): JSX.Element {
  const query = useQuery();
  const [password, setPassword] = useState<string>("");
  const [snackBarProps, setSnackBarProps] = useState<ISnackBarParams>({
    open: false,
    message: "",
    severity: "success",
  });
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  async function resetPassword() {
    if (!password) {
      setSnackBarProps({
        open: true,
        message: "Preencha todos os campos.",
        severity: "error",
      });

      return;
    }

    const token = query.get("token");

    console.log(token);

    if (token) {
      await api.resetPassword({ password, token });

      setShouldRedirect(true);
    } else {
      setSnackBarProps({
        open: true,
        message: "Ocorreu um erro ao redefinir a senha, tente novamente.",
        severity: "error",
      });

      setShouldRedirect(true);
    }
  }

  return (
    <>
      {shouldRedirect && <Navigate replace to="/" />}
      <SnackBar
        severity={snackBarProps.severity}
        open={snackBarProps.open}
        setOpen={setSnackBarProps}
        message={snackBarProps.message}
      />
      <LoginContainer>
        <h2>Preencha sua nova senha.</h2>
        <form
          onSubmit={async (res) => {
            res.preventDefault();

            await resetPassword();
          }}
        >
          <Input
            placeholder="Senha"
            height="50px"
            width="600px"
            type="password"
            onChange={(res) => setPassword(res.target.value)}
          />
          <Button
            text="CONCLUÍDO"
            width="350px"
            height="65px"
            onClick={() => {}}
          />
        </form>
      </LoginContainer>
    </>
  );
}

export default ResetPassword;
