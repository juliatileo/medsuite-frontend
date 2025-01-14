import { useState } from "react";
import { Link, redirect } from "react-router";

import Input from "components/Input";
import Button from "components/Button";
import { LoginParams, UserType } from "config/api/dto";
import api from "config/api";
import session from "config/session";

import { LoginContainer, LoginCreateAccount } from "./styles";

function Login(): JSX.Element {
  const [loginParams, setLoginParams] = useState<LoginParams>({});

  async function login() {
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
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <LoginContainer>
      <h2>Complete seu login para usufruir das nossas soluções em saúde</h2>
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
      <Button
        text="LOGIN"
        width="350px"
        height="65px"
        onClick={async () => {
          await login();
        }}
      />
      <LoginCreateAccount>
        Ainda não tem uma conta? Faça seu{" "}
        <LoginCreateAccount green="true">
          <Link to={"/register"}>registro</Link>
        </LoginCreateAccount>
        .
      </LoginCreateAccount>
    </LoginContainer>
  );
}

export default Login;
