import { useState } from "react";
import { Link, redirect } from "react-router";

import Input from "components/Input";
import Button from "components/Button";
import SnackBar from "components/SnackBar";
import { ISnackBarParams } from "components/SnackBar/types";

import { LoginParams, UserType } from "config/api/dto";
import api from "config/api";
import session from "config/session";

import { LoginContainer, LoginCreateAccount } from "./styles";
import { validateEmail } from "utils/validateEmail";

function Login(): JSX.Element {
  const [loginParams, setLoginParams] = useState<LoginParams>({});
  const [snackBarProps, setSnackBarProps] = useState<ISnackBarParams>({
    open: false,
    message: "",
    severity: "success",
  });

  async function login() {
    if (!loginParams.email || !loginParams.password) {
      setSnackBarProps({
        open: true,
        message: "Preencha todos os campos.",
        severity: "error",
      });

      return;
    }

    if (!validateEmail(loginParams.email)) {
      setSnackBarProps({
        open: true,
        message: "E-mail inválido.",
        severity: "error",
      });

      return;
    }

    await api
      .login(loginParams)
      .then((res) => {
        redirect("/");

        if (res.data.user.type === UserType.DOCTOR) {
          session.logInAsDoctor(res.data.user, res.data.token);
        } else {
          session.logInAsPatient(res.data.user, res.data.token);
        }
      })
      .catch((_err) => {
        setSnackBarProps({
          open: true,
          message: "Ocorreu um erro ao fazer login, tente novamente.",
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
        <h2>Complete seu login para usufruir das nossas soluções em saúde</h2>
        <form
          onSubmit={async (res) => {
            res.preventDefault();
            await login();
          }}
        >
          <Input
            placeholder="E-mail"
            height="50px"
            width="600px"
            type="text"
            onChange={(res) =>
              setLoginParams({ ...loginParams, email: res.target.value })
            }
          />
          <Input
            placeholder="Senha"
            height="50px"
            width="600px"
            type="password"
            onChange={(res) =>
              setLoginParams({ ...loginParams, password: res.target.value })
            }
          />
          <Button text="LOGIN" width="350px" height="65px" onClick={() => {}} />
          <LoginCreateAccount>
            Esqueceu sua senha?{" "}
            <LoginCreateAccount green="true">
              <Link to={"/forgot-password"}>Recupere aqui</Link>
            </LoginCreateAccount>
            .
          </LoginCreateAccount>
        </form>
      </LoginContainer>
    </>
  );
}

export default Login;
