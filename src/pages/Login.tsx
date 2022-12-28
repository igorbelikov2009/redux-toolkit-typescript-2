import React, { FC, useContext, useState } from "react";
import FormControl from "../components/gui/input/FormControl";
import { Button, Container, Card, Row } from "react-bootstrap";
import { AuthContext } from "../context";

const Login: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isAuth, setAuth } = useContext(AuthContext);
  //   console.log(isAuth);

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const authorization = (event: React.MouseEvent) => {
    event.preventDefault(); // чтобы страница не обновлялась
    setAuth(true);
    localStorage.setItem("auth", "true");
  };

  return (
    <Container className="mt-6">
      <Row>
        <Card className="card loginPage">
          <h5>Страница для логина </h5>

          <form className="mt-4">
            <div className="mb-4">
              <FormControl type="text" value={login} setValue={setLogin} placeholder="Введите логин" />
            </div>

            <div className="mb-4">
              <FormControl type="password" value={password} setValue={setPassword} placeholder="Введите пароль" />
            </div>

            <div className="mb-4">
              <Button onClick={authorization} variant="outline-success">
                Войти
              </Button>
            </div>
          </form>
        </Card>
      </Row>
    </Container>
  );
};

export default Login;
