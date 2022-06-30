import { useEffect, useRef, useState } from "react";
import { Nav, Navbar, Form, Container, Button, Alert } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FiCamera, FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import "../css/style.css";

const colourButton = {
    backgroundColor: '#7126B5',
    borderRadius: '10px',
};

const formBorder = {
    borderRadius: '16px',
};

function About() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { id } = useParams();
    const nameField = useRef("");
    const townField = useRef("");
    const addressField = useRef("");
    const phoneField = useRef("");
    const [pictureField, setpictureField] = useState();

    const [errorResponse, setErrorResponse] = useState({
        isError: false,
        message: "",
    });


    const getUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const responseUsers = await axios.get(`http://localhost:2000/v1/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log(responseUsers.data.data);
            const dataUsers = await responseUsers.data.data;

            setData(dataUsers)
            console.log(dataUsers);
        } catch (err) {
            console.log(err);
        }
    }

    const onUpdate = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const userToUpdatePayload = new FormData();
            userToUpdatePayload.append("name", nameField.current.value);
            userToUpdatePayload.append("town", townField.current.value);
            userToUpdatePayload.append("address", addressField.current.value);
            userToUpdatePayload.append("phone", phoneField.current.value);
            userToUpdatePayload.append("picture", pictureField);


            const updateRequest = await axios.put(
                `http://localhost:2000/v1/users/${data.id}`,
                userToUpdatePayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(updateRequest.data.data)
            const updateResponse = updateRequest.data.data;

            if (updateResponse.status) navigate("/login");
        } catch (err) {
            const response = err.response.data;

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };


    useEffect(() => {
        getUsers();
    }, [])

    return (
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
                            <Nav className="text-dark"> Lengkapi Info Akun </Nav>
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
                    <Nav className="info2 text-dark">Lengkapi Info Akun</Nav>
                </div>
                <Form onSubmit={onUpdate}>
                    <button className="mb-3 box1 buttonCamera" >
                        <h2>
                            <FiCamera
                                className="camera"
                            />
                        </h2>
                        <Form.Control type="file" className="formCamera" onChange={(e) => {
                            setpictureField(e.target.files[0])
                        }} />

                    </button>
                    <Form className="border1 mb-3">
                        <Form.Label>Nama*</Form.Label>
                        <Form.Control style={formBorder} type="text" ref={nameField} defaultValue={data.name} />
                    </Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Kota*</Form.Label>
                        <select style={formBorder} defaultValue={data.town} className="form-select">
                            <option hidden>Pilih Kota</option>
                            <option ref={townField} selected={data.town === "dkijakarta" ? "selected" : ""} value="dkijakarta">DKI Jakarta</option>
                            <option ref={townField} selected={data.town === "jawabarat" ? "selected" : ""} value="jawabarat">Jawa Barat</option>
                            <option ref={townField} selected={data.town === "jawatengah" ? "selected" : ""} value="jawatengah">Jawa Tengah</option>
                            <option ref={townField} selected={data.town === "jawatimur" ? "selected" : ""} value="jawatimur">Jawa Timur</option>
                        </select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Alamat*</Form.Label>
                        <Form.Control
                            type="text"
                            style={formBorder}
                            ref={addressField}
                            defaultValue={data.address}
                            placeholder="Contoh: Jalan Ikan Hiu 33"
                            as="textarea"
                            rows={3}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>No Handphone*</Form.Label>
                        <Form.Control
                            type="text"
                            style={formBorder}
                            ref={phoneField}
                            defaultValue={data.phone}
                            placeholder="contoh: +628123456789"
                        />
                    </Form.Group>
                    {errorResponse.isError && (
                        <Alert variant="danger">{errorResponse.message}</Alert>
                    )}

                    <Button style={colourButton} className="myButton6 w-100" type="submit">
                        Simpan
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default About;
