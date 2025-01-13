import Input from "components/Input";
import Button from "components/Button";
import { LoginContainer, LoginCreateAccount } from "./styles";
import { useState } from "react";
import { LoginParams } from "./types";

function Login(): JSX.Element {
  const [loginParams, setLoginParams] = useState<LoginParams>({});

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
        onClick={() => {
          console.log(loginParams);
        }}
      />
      <LoginCreateAccount>
        Ainda não tem uma conta? Faça seu{" "}
        <LoginCreateAccount green="true">registro</LoginCreateAccount>.
      </LoginCreateAccount>
    </LoginContainer>
  );
}

export default Login;
