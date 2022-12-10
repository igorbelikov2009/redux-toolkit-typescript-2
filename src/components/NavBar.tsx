import React, { FC } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { API_ROUTE, ASYNC_THUNK_ROUTE, COUNTER_ROUTE, SLICE_ROUTE, MAIN_ROUTE, MICHAEL_ROUTE } from "../routes";
import { INavbarButton } from "../models/types";
import { useHistory } from "react-router-dom";

const NavBar: FC = () => {
  const history = useHistory();

  const buttons: INavbarButton[] = [
    { id: 0, route: MAIN_ROUTE, title: "Redux главная", active: false },
    { id: 1, route: COUNTER_ROUTE, title: "State Change", active: false },
    { id: 2, route: SLICE_ROUTE, title: "createSlice()", active: false },
    { id: 3, route: ASYNC_THUNK_ROUTE, title: "createSlice() + createAsyncThunk()", active: false },
    { id: 4, route: MICHAEL_ROUTE, title: "Michael AsyncApi()", active: false },
    { id: 5, route: API_ROUTE, title: "services createApi()", active: false },
  ];

  return (
    <Navbar bg="dark" variant="dark" className="navbar mb-4">
      <Container>
        {buttons.map((button, index) => (
          <Button
            variant="outline-primary"
            active={button.active}
            // active={button.id === index}
            key={button.id}
            onClick={() => {
              history.push(button.route);
              // console.log(index, button.id);
            }}
          >
            {button.title}
          </Button>
        ))}
      </Container>
    </Navbar>
  );
};

export default NavBar;
