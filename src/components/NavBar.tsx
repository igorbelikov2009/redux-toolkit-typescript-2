import React, { FC } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { API_ROUTE, ASYNC_THUNK_ROUTE, COUNTER_ROUTE, SLICE_ROUTE, MAIN_ROUTE } from "../routes";

const NavBar: FC = () => {
  const history = useHistory();

  return (
    <Navbar bg="dark" variant="dark" className="navbar mb-4">
      <Container>
        <Button onClick={() => history.push(MAIN_ROUTE)} variant="outline-primary">
          Redux toolkit typescript, главная
        </Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Button onClick={() => history.push(COUNTER_ROUTE)} variant="outline-primary" className="ml-2">
              State Change
            </Button>

            <Button onClick={() => history.push(SLICE_ROUTE)} variant="outline-primary" className="ml-2">
              createSlice()
            </Button>

            <Button onClick={() => history.push(ASYNC_THUNK_ROUTE)} variant="outline-primary" className="ml-2">
              createSlice() + createAsyncThunk()
            </Button>

            <Button onClick={() => history.push(API_ROUTE)} variant="outline-primary" className="ml-2">
              services createApi()
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
