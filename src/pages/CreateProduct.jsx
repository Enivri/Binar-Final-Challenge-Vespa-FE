import React from "react";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Nav, Navbar, Form, Container, Button, Alert } from "react-bootstrap";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { selectUser } from "../slices/userSlice";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import "../css/style.css";

export default function CreateProduct() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const userRedux = useSelector(selectUser);
    const [user, setUser] = useState(userRedux.creds);
    const nameField = useRef("");
    const priceField = useRef("");
    const categoryField = useRef("");
    const descriptionField = useRef("");
    const [pictureField, setpictureField] = useState([]);
    const [sold, setSold] = useState(Boolean);
    const fileInputRef = useRef();

    const [errorResponse, setErrorResponse] = useState({
        isError: false,
        message: "",
    });

    const colourButton = {
        backgroundColor: '#7126B5',
        borderRadius: '16px',
    }
    const borderRadius = {
        borderRadius: '16px',
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check status user login
                // 1. Get token from localStorage
                const token = localStorage.getItem("token");

                // 2. Check token validity from API
                const currentUserRequest = await axios.get(
                    "http://localhost:2000/v1/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentUserResponse = currentUserRequest.data;

                if (currentUserResponse.status) {
                    setUser(currentUserResponse.data.user);
                }
            } catch (err) {
                setIsLoggedIn(false);
            }
        };
        fetchData();
    }, [])

    const onPost = async (e, isPublished) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const postPayload = new FormData();
            postPayload.append("name", nameField.current.value);
            postPayload.append("price", priceField.current.value);
            postPayload.append("category", categoryField.current.value);
            postPayload.append("description", descriptionField.current.value);
            postPayload.append("picture", pictureField);
            postPayload.append("isPublished", isPublished);
            postPayload.append("sold", sold);

            const postRequest = await axios.post(
                "http://localhost:2000/v1/product",
                postPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(postRequest);
            const postResponse = postRequest.data;
            console.log(postResponse)

            if (postResponse.status) {
                if(isPublished) navigate("/");
                else navigate("/previewproduk")
            }
        } catch (err) {
            console.log(err);
            const response = err.response.data;

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };

    return isLoggedIn ? (
        <div>
            {/* navbar */}
            <div className="na1 py-4 shadow">
                <nav className="navbar navbar-expand-lg navbar-light bg-all">
                    <Link to="/">
                        <button className="na2 navbar-brand box"></button>
                    </Link>
                    <Navbar.Brand href="#" className="brand" />
                    <div className="offcanvas-body" id="offcanvasRight">
                        <div className="info1 navbar">
                            <Nav className="text-dark"> Buat  Detail Produk </Nav>
                        </div>
                    </div>
                </nav>
            </div>

            <Container className="my-5 w-50">
                <div>
                    <Link className="arrow2" to="/" style={{ color: "black" }}>
                        <FiArrowLeft />
                    </Link>
                </div>
                <div>
                    <Nav className="info3 text-dark">Lengkapi Detail Produk</Nav>
                </div>
                <Form >
                    <Form className="border1 mb-3" style={{ fontWeight: "bold" }}>
                        <Form.Label>Nama Produk</Form.Label>
                        <Form.Control style={borderRadius} type="text" ref={nameField} placeholder="Nama" />
                    </Form>
                    <Form className="border1 mb-3" style={{ fontWeight: "bold" }}>
                        <Form.Label>Harga Produk</Form.Label>
                        <Form.Control style={borderRadius} type="text" ref={priceField} placeholder="Rp 0,00" />
                    </Form>
                    <Form.Group className="mb-3" style={{ fontWeight: "bold" }}>
                        <Form.Label>Kategori</Form.Label>
                        <Form.Select style={borderRadius} ref={categoryField} aria-label="Default select example">
                            <option>Pilih Kategori</option>
                            <option value="Hobi">Hobi</option>
                            <option value="Kendaraan">Kendaraan</option>
                            <option value="Baju">Baju</option>
                            <option value="Elektronik">Elektronik</option>
                            <option value="Kesehatan">Kesehatan</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" style={{ fontWeight: "bold" }}>
                        <Form.Label>Deskripsi</Form.Label>
                        <Form.Control
                            style={borderRadius}
                            type="text"
                            ref={descriptionField}
                            placeholder="Contoh: Jalan Ikan Hiu 33"
                            as="textarea"
                            rows={3}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" style={{ fontWeight: "bold" }}>
                        Foto Produk
                    </Form.Group>
                    <Form.Label
                        className="upload-button-product"
                        for="exampleFormControlFile1"
                        onClick={(e) => {
                            e.preventDefault();
                            fileInputRef.current.click();
                        }}
                    >
                    </Form.Label>

                    <Form.Control
                        type="file"
                        multiple
                        class="form-control-file"
                        id="exampleFormControlFile1"
                        ref={fileInputRef}
                        onChange={(e) => {
                            setpictureField(e.target.files[0])
                        }}
                        hidden
                    />
                    <Row>
                        <Col>
                            <Button  style={colourButton} onClick={(e) => onPost(e, false)} className="myButton7 w-100" type="submit">
                                Preview
                            </Button>
                        </Col>
                        <Col>
                            <Button style={colourButton} onClick={(e) => onPost(e, true)} className="myButton6 w-100" type="submit">
                                Terbitkan
                            </Button>
                        </Col>
                    </Row>
                    {errorResponse.isError && (
                        <Alert variant="danger">{errorResponse.message}</Alert>
                    )}
                </Form>
            </Container>
        </div>
    ) : (
        <Navigate to="/login" replace />);
}