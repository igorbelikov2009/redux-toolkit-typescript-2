import React, { FC } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const NavBar: FC = () => {
  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand href="#home">Redux toolkit typescript 2</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Button variant="outline-primary" className="ml-2">
              State Change
            </Button>
            <Button variant="outline-primary" className="ml-2">
              createSlice()
            </Button>
            <Button variant="outline-primary" className="ml-2">
              createSlice() + createAsyncThunk()
            </Button>
            <Button variant="outline-primary" className="ml-2">
              ..............dfhsg
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
