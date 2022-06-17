import React from "react";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { FiLogIn, FiList, FiBell, FiUser, FiLogOut } from "react-icons/fi";
import "../Navbar/navbar.css";


export function HomeNav() {
    return (
        <>
            <Navbar expand="lg" variant="light" bg="light">
                <Container>
                    <Navbar.Brand className="logo" href="#"></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder=" Cari di sini ..."
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search </Button>
                    </Form>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Button type="submit" className="ms-auto radius-secondary bg-color-primary border-0  " variant="primary" href="/login" > <FiLogIn className="me-1 mb-1" /> Masuk </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
export function HomeNav2() {

    return (
        <Navbar expand="lg" variant="light" bg="light">
            <Container>
                <Navbar.Brand className="logo" href="/homelogin"></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button type="submit" variant="outline-success">Search</Button>
                </Form>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Button variant="light"> <FiList className="me-2 mb-1" />  </Button>
                        <Button variant="light"> <FiBell className="me-2 mb-1" />  </Button>
                        <Button variant="light"> <FiUser className="me-2 mb-1" />  </Button>
                        <Button variant="light" href="/"> <FiLogOut className="me-2 mb-1" />  </Button>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}