import Button from "components/Button";

function Login() {
  return (
    <Button
      text="LOGIN"
      width="390px"
      height="70px"
      onClick={() => {
        console.log("clicou");
      }}
    />
  );
}

export default Login;
