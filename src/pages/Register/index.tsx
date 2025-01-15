import { useState } from "react";
import { Link, redirect } from "react-router";

import Input from "components/Input";
import Button from "components/Button";

import { RegisterParams } from "config/api/dto";
import api from "config/api";
import session from "config/session";

import {
  RegisterContainer,
  RegisterCreateAccount,
  EmailCellphoneContainer,
} from "./styles";

function Register(): JSX.Element {
  const [registerParams, setRegisterParams] = useState<RegisterParams>({});

  async function registerUser() {
    await api
      .saveUser(registerParams)
      .then((res) => {
        redirect("/");

        session.logInAsPatient(res.data.user, res.data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <RegisterContainer>
      <h2>Complete seu registro para usufruir das nossas soluções em saúde</h2>
      <Input
        placeholder="Nome"
        height="50px"
        width="600px"
        type="text"
        onChange={(res) =>
          setRegisterParams({ ...registerParams, name: res.target.value })
        }
      />
      <EmailCellphoneContainer>
        <Input
          placeholder="E-mail"
          height="50px"
          width="330px"
          type="text"
          onChange={(res) =>
            setRegisterParams({ ...registerParams, email: res.target.value })
          }
        />
        <Input
          placeholder="Telefone"
          height="50px"
          width="220px"
          type="text"
          onChange={(res) =>
            setRegisterParams({
              ...registerParams,
              cellphone: res.target.value,
            })
          }
        />
      </EmailCellphoneContainer>
      <Input
        placeholder="Senha"
        height="50px"
        width="600px"
        type="password"
        onChange={(res) =>
          setRegisterParams({ ...registerParams, password: res.target.value })
        }
      />
      <Button
        text="REGISTRAR-SE"
        width="350px"
        height="65px"
        onClick={() => {
          registerUser();
        }}
      />
      <RegisterCreateAccount>
        Já fez seu registro? Faça o{" "}
        <RegisterCreateAccount green="true">
          <Link to="/">login</Link>
        </RegisterCreateAccount>
        .
      </RegisterCreateAccount>
    </RegisterContainer>
  );
}

export default Register;
