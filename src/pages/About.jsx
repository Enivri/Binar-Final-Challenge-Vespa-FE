import { useEffect, useRef, useState } from "react";
import { Nav, Navbar, Form, Container, Button, Alert } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FiCamera, FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import "../css/styling.css";

function About() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const nameField = useRef("");
  const kotaField = useRef("");
  const alamatField = useRef("");
  const noHpField = useRef("");
  const [imageField, setimageField] = useState();

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const onUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const userToUpdatePayload = new FormData();
      userToUpdatePayload.append("name", nameField.current.value);
      userToUpdatePayload.append("kota", kotaField.current.value);
      userToUpdatePayload.append("alamat", alamatField.current.value);
      userToUpdatePayload.append("noHp", noHpField.current.value);
      userToUpdatePayload.append("image", imageField);


      const updateRequest = await axios.put(
        `http://localhost:8888/api/users/update/${id}`,
        userToUpdatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updateResponse = updateRequest.data;

      if (updateResponse.status) navigate("/register");
    } catch (err) {
      const response = err.response.data;

      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };

  const getUsers = async () => {
    try {

      const responseUsers = await axios.get(`http://localhost:8888/api/users/${id}`)

      const dataUsers = await responseUsers.data.data.getdata;

      setData(dataUsers)
      console.log(dataUsers);
    } catch (err) {
      console.log(err);
    }
  }

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
              console.log(e.target.files[0]);
              setimageField(e.target.files[0])
            }} />
          </button>
          <Form className="border1 mb-3">
            <Form.Label>Nama*</Form.Label>
            <Form.Control type="text" ref={nameField} defaultValue={data.name} />
          </Form>
          <Form.Group className="mb-3">
            <Form.Label>Kota*</Form.Label>
            <select ref={kotaField} className="form-select">
              <option hidden>Pilih Kota</option>
              <option value="Jakarta">Jakarta</option>
              <option value="JawaTengah">Jawa Tengah</option>
              <option value="JawaTimur">Jawa Timur</option>
              <option value="JawaBarat">Jawa Barat</option>
              <option value="KalimantanTengah">Kalimantan Tengah</option>
              <option value="KalimantanTimur">Kalimantan Timur</option>
              <option value="KalimantanSelatan">Kalimantan Selatan</option>
              <option value="KalimantanBarat">Kalimantan Barat</option>
            </select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Alamat*</Form.Label>
            <Form.Control
              type="text"
              ref={alamatField}
              placeholder="Contoh: Jalan Ikan Hiu 33"
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>No Handphone*</Form.Label>
            <Form.Control
              type="text"
              ref={noHpField}
              placeholder="contoh: +628123456789"
            />
          </Form.Group>
          {errorResponse.isError && (
            <Alert variant="danger">{errorResponse.message}</Alert>
          )}
          <Button className="myButton6 w-100" type="submit">
            Simpan
          </Button>
        </Form>
      </Container>
      <Link to="/">Go to home page</Link>
    </div>
  );
}

export default About;
