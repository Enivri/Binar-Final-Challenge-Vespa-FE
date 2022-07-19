import React from "react";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Nav, Navbar, Form, Container, Button, Alert } from "react-bootstrap";
import { useNavigate, Navigate, Link, useParams } from "react-router-dom";
import { selectUser } from "../slices/userSlice";
import { FiArrowLeft } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import "../css/style.css";

export default function InfoProduct() {
    const navigate = useNavigate();
    const userRedux = useSelector(selectUser);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const { id } = useParams();
    const [user, setUser] = useState(userRedux.creds);
    const [data, setData] = useState([]);
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

    const getProduct = async () => {
        try {
            const token = localStorage.getItem("token");
            const responseProduct = await axios.get(`http://localhost:2000/v1/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })

            console.log(token)
            console.log(responseProduct)
            // console.log(getProduct)
            const dataProduct = await responseProduct.data.data.posts[0];
            setData(dataProduct)
            console.log(dataProduct);
        } catch (err) {
            console.log(err);
        }
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
        getProduct();
    }, [id])


    const onUpdate = async (e, isPublished) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const productToUpdatePayload = new FormData();
            productToUpdatePayload.append("name", nameField.current.value);
            productToUpdatePayload.append("price", priceField.current.value);
            productToUpdatePayload.append("category", categoryField.current.value);
            productToUpdatePayload.append("description", descriptionField.current.value);
            productToUpdatePayload.append("picture", pictureField);
            productToUpdatePayload.append("isPublished", isPublished);
            productToUpdatePayload.append("sold", sold);

            const createRequest = await axios.put(
                `http://localhost:2000/v1/product/${id}`,
                productToUpdatePayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(token)
            console.log(createRequest)
            const createResponse = createRequest.data;

            if (createResponse.status) {
                if (isPublished) navigate("/");
                else navigate(`/dashboardseller/${data.user_id}`)
            }

        } catch (err) {
            const response = err.response.data;

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };
    console.log(onUpdate)

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
                            <Nav className="text-dark">Update Detail Produk </Nav>
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
                    <Nav className="info3 text-dark">Update Detail Produk</Nav>
                </div>
                <Form>
                    <Form className="border1 mb-3" style={{ fontWeight: "bold" }}>
                        <Form.Label>Nama Produk</Form.Label>
                        <Form.Control style={borderRadius} defaultValue={data.name} type="text" ref={nameField} placeholder="Nama" />
                    </Form>
                    <Form className="border1 mb-3" style={{ fontWeight: "bold" }}>
                        <Form.Label>Harga Produk</Form.Label>
                        <Form.Control style={borderRadius} defaultValue={data.price} type="text" ref={priceField} placeholder="Rp 0,00" />
                    </Form>
                    <Form.Group className="mb-3" style={{ fontWeight: "bold" }}>
                        <Form.Label>Kategori</Form.Label>
                        <select style={borderRadius} ref={categoryField} className="form-select">
                            <option hidden>Pilih Kategori</option>
                            <option ref={categoryField} selected={data.category === "Hobi" ? "selected" : ""} value="Hobi">Hobi</option>
                            <option ref={categoryField} selected={data.category === "Kendaraan" ? "selected" : ""} value="Kendaraan">Kendaraan</option>
                            <option ref={categoryField} selected={data.category === "Baju" ? "selected" : ""} value="Baju">Baju</option>
                            <option ref={categoryField} selected={data.category === "Elektronik" ? "selected" : ""} value="Elektronik">Elektronik</option>
                            <option ref={categoryField} selected={data.category === "Kesehatan" ? "selected" : ""} value="Kesehatan">Kesehatan</option>
                        </select>
                    </Form.Group>
                    <Form.Group className="mb-3" style={{ fontWeight: "bold" }}>
                        <Form.Label>Deskripsi</Form.Label>
                        <Form.Control
                            style={borderRadius}
                            type="text"
                            defaultValue={data.description}
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
                            <Button style={colourButton} onClick={(e) => onUpdate(e, false)} className="myButton7 w-100" type="submit">
                                Preview
                            </Button>
                        </Col>
                        <Col>
                            <Button style={colourButton} onClick={(e) => onUpdate(e, true)} className="myButton6 w-100" type="submit">
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