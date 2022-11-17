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
              redux toolkit state change
            </Button>
            <Button variant="outline-primary" className="ml-2">
              Link
            </Button>
            <Button variant="outline-primary" className="ml-2">
              Home
            </Button>
            <Button variant="outline-primary" className="ml-2">
              Link
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
