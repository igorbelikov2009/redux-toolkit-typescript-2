import React, { FC } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { API_ROUTE, ASYNC_THUNK_ROUTE, COUNTER_ROUTE, SLICE_ROUTE, MAIN_ROUTE, MICHAEL_ROUTE } from "../routes";
import { IButtonsRoute } from "../models/types";
import { useHistory } from "react-router-dom";

const NavBar: FC = () => {
  const history = useHistory();

  const buttons: IButtonsRoute[] = [
    { id: 1, path: MAIN_ROUTE, title: "Redux главная" },
    { id: 2, path: COUNTER_ROUTE, title: "State Change" },
    { id: 3, path: SLICE_ROUTE, title: "createSlice()" },
    { id: 4, path: ASYNC_THUNK_ROUTE, title: "createSlice() + createAsyncThunk()" },
    { id: 5, path: MICHAEL_ROUTE, title: "Michael AsyncApi()" },
    { id: 6, path: API_ROUTE, title: "services createApi()" },
  ];

  return (
    <Navbar bg="dark" variant="dark" className="navbar mb-4">
      <Container>
        {buttons.map((route) => (
          <Button
            variant="outline-primary"
            // active={location === route.path}
            key={route.id}
            onClick={() => {
              history.push(route.path);
            }}
          >
            {route.title}
          </Button>
        ))}
      </Container>
    </Navbar>
  );
};

export default NavBar;
