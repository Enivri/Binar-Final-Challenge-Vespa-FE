import { useRef, useState } from "react";
import { Form, Button, Alert, Row, Container, Col, } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/style.css"
import PICT1 from '../images/login.png';

export default function Register() {
    const navigate = useNavigate();

    const nameField = useRef("");
    const emailField = useRef("");
    const passwordField = useRef("");

    const [errorResponse, setErrorResponse] = useState({
        isError: false,
        message: "",
    });

    const onRegister = async (e) => {
        e.preventDefault();

        try {
            const userToRegisterPayload = {
                name: nameField.current.value,
                email: emailField.current.value,
                password: passwordField.current.value,
            };

            const registerRequest = await axios.post(
                "http://localhost:2000/v1/register",
                userToRegisterPayload
            );

            const registerResponse = registerRequest.data;

            if (registerResponse.status) navigate("/login");
        } catch (err) {
            console.log(err);
            const response = err.response.data;

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };

    const colourButton = {
        backgroundColor: '#7126B5',
        borderRadius: '10px',
    };

    const styleLabel = {
        borderRadius: '10px',
    };

    const styleLink = {
        textDecoration: 'none',
        color: '#7126B5',
        fontWeight: 'bold',
    }

    return (
        <Container fluid="true">
            <Row >
                <Col className="regist-left">
                    <img src={PICT1} alt="Second Hand" width="100%" height="100%" />
                </Col>
                <Col >
                    <div className="regist-right">
                        <h1 className="mb-3">Daftar</h1>
                        <Form onSubmit={onRegister}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control
                                    type="text"
                                    ref={nameField}
                                    placeholder="Nama Lengkap"
                                    style={styleLabel}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    ref={emailField}
                                    placeholder="Contoh: johndee@gmail.com"
                                    style={styleLabel}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    ref={passwordField}
                                    placeholder="Masukkan Password"
                                    style={styleLabel}
                                />
                            </Form.Group>
                            {errorResponse.isError && (
                                <Alert variant="danger">{errorResponse.message}</Alert>
                            )}
                            <Button className="w-100" type="submit" style={colourButton}>
                                Daftar
                            </Button>
                            <p className="m-4 text-center">
                                Sudah punya akun? <Link style={styleLink} to="/login">Masuk di sini</Link>
                            </p>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}