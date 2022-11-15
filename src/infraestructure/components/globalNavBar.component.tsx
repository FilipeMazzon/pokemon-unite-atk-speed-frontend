import {Container, Nav, Navbar} from "react-bootstrap";
import React, {ReactElement} from "react";

const GlobalNavComponent: React.FC = (): ReactElement => {
  return (
    <Navbar expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/atk-speed">atk-speed</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default GlobalNavComponent;
