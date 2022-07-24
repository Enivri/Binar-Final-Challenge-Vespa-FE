import { useEffect, useState } from "react";
import { Nav, Navbar, Card, Container, Form, Row, Col, ListGroup, Button, Modal } from "react-bootstrap";
import { useNavigate, Navigate, Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import React from "react";
import dateFormat from "dateformat";
import { Modal1 } from "./components/Modals/Modal";
import "../css/style.css";

export default function InfoBidder() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [interest, setInterest] = useState([]);

    // modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showStatus, setShowStatus] = useState(false);
    const handleCloseStatus = () => setShowStatus(false);
    const handleShowStatus = () => setShowStatus(true);

    const [successResponse, setSuccessResponse] = useState({
        isSuccess: false,
        message: "",
    });

    const [errorResponse, setErrorResponse] = useState({
        isError: false,
        message: "",
    });


    const [selectedSold, setSelectedSold] = useState();
    const [selectedAccept, setSelectedAccept] = useState();

    const selectedButton = (e) => {
        console.log(e.target.value);
    };

    const selectedButtonSold = (e) => {
        setSelectedAccept(e.target.value)
        setSelectedSold(true);
    }

    const selectedButtonReject = (e) => {
        setSelectedAccept(e.target.value)
    }

    const Button2 = {
        backgroundColor: '#7126B5',
        borderRadius: '16px',
        fontSize: '14px',
        width: '250px',
    };

    const modalStyle = {
        backgroundColor: '#EEEEEE',
        fontSize: '14px',
        border: '0px',
        borderRadius: '16px',
    };

    const Button1 = {
        backgroundColor: '#7126B5',
        borderRadius: '10px',
        fontSize: '14px',
        borderRadius: '16px',
        width: '158px'
    };

    const colourButton = {
        borderColor: '#7126B5',
        color: '#7126B5',
        borderRadius: '16px',
        fontSize: "14px",
        width: "158px",
        marginRight: "16px",
    };
    const floatStyle = {
        float: "right",
    };
    const cardStyle = {
        borderRadius: "16px",
        height: "90px"
    };
    const listStyle = {
        marginTop: "20px",
    };




    const onChangeStatus = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const acceptPayload = {
                sold: selectedSold,
                accepted: selectedAccept,
            }

            const acceptRequest = await axios.put(
                `https://binar-final-challenge-vespa-be.herokuapp.com/v1/transaction/${id}`,
                acceptPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const acceptResponse = acceptRequest.data;

            console.log(acceptResponse);

            const response = await axios.get(`https://binar-final-challenge-vespa-be.herokuapp.com/v1/transaction/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log(response);
            const data = await response.data;
            console.log(data);

            setInterest(data);

            if (acceptResponse.status) navigate(`/dashboardseller/${interest.owner_id}`);
        } catch (err) {
            console.log(err);
            const response = err.response.data;

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check status user login
                // 1. Get token from localStorage
                const token = localStorage.getItem("token");

                // 2. Check token validity from API
                const currentUserRequest = await axios.get(
                    "https://binar-final-challenge-vespa-be.herokuapp.com/v1/users",
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
    }, [id])


    const onAccept = async (e, accepted) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const acceptPayload = {
                accepted: accepted,

            }

            const acceptRequest = await axios.put(
                `https://binar-final-challenge-vespa-be.herokuapp.com/v1/transaction/${id}`,
                acceptPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(acceptRequest)
            const acceptResponse = acceptRequest.data.data;
            console.log(acceptResponse)

            const response = await axios.get(`https://binar-final-challenge-vespa-be.herokuapp.com/v1/transaction/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log(response);
            const data = await response.data.data.posts;
            console.log(data);

            setInterest(data);

            if (acceptResponse.status) navigate(`/infopenawar/${interest.id}`);
        } catch (err) {
            console.log(err);
            const response = err.response.data;

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };


    useEffect(() => {
        const interestData = async () => {

            const token = localStorage.getItem("token");

            const response = await axios.get(`https://binar-final-challenge-vespa-be.herokuapp.com/v1/transaction/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log(response);
            const data = await response.data.data.posts;
            console.log(data);

            setInterest(data);
        };
        interestData();
    }, [id]);

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
                            <Nav className="text-dark"> Info Penawar </Nav>
                        </div>
                    </div>
                </nav>
            </div>
            <Container className="my-5 w-50">
                <div>
                    <Link to={`/dashboardseller/${interest.owner_id}`} className="arrow2" style={{ color: "black" }}>
                        <FiArrowLeft />
                    </Link>
                </div>
                <div>
                    <div>
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Row>
                                    <Col xs="auto">
                                        <img src={`${interest.user ? interest.user.picture : ""}`} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
                                    </Col>
                                    <Col>
                                        <p className="titlefont1">{interest.user && interest.user.name}</p>
                                        <p className="greyfont">{interest.user && interest.user.town}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={listStyle}>
                        <p className="titlefont1">Daftar Produkmu yang Ditawar</p>
                        <ListGroup variant="flush">
                            <ListGroup.Item><Row>
                                <Col xs="auto">
                                    <img src={`${interest.product ? interest.product.picture : ""}`} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <p className="greyfont">Penarawan produk</p>
                                            <div className="titlefont2">
                                                <p>{interest.product && interest.product.name}</p>
                                                <p>Rp. {interest.product && interest.product.price}</p>
                                                <p>Ditawar Rp {interest.requestedPrice}</p>
                                            </div>
                                        </Col>
                                        <Col>
                                            <p className="greyfont" style={floatStyle}>{dateFormat(interest.createdAt, "d mmm, h:MM")}</p>
                                        </Col>
                                    </Row>
                                    <div style={floatStyle}>
                                        <Button variant="outline"
                                            style={colourButton}
                                            onClick={interest.accepted === "waiting" ? (e) => handleShowStatus(e) : (e) => onAccept(e, "reject")}
                                            hidden={interest.accepted === "reject" || (interest.product && interest.product.sold) === true ? true : false}
                                        >
                                            {interest.accepted === "waiting" ? "Status" : "Tolak"}
                                        </Button>
                                        <Button
                                            style={Button1}
                                            onClick={(e) => { onAccept(e, "waiting"); handleShow() }}
                                            hidden={interest.accepted === "reject" || (interest.product && interest.product.sold) === true ? true : false}
                                        >
                                            {interest.accepted === "waiting" ? "Hubungi di " : "Terima"}
                                        </Button>

                                    </div>
                                </Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item></ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
            </Container>

            {/* Modal status */}
            <Modal show={showStatus} onHide={handleCloseStatus} centered size="sm" dialogClassName="modal-30w">
                <div className="p-3">
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="fw-bold">Perbarui status penjualan produkmu</p>
                        <Form>
                            <div key={`radio`} onChange={selectedButton} className="mb-3">
                                <Form.Check
                                    name="status"
                                    type="radio"
                                    id={`radio-1`}
                                    label={`Berhasil terjual`}
                                    value={"accept"}
                                    onChange={selectedButtonSold}
                                    checked={selectedButtonSold === "accept"}
                                />
                                <p className=" text-black-50">Kamu telah sepakat menjual produk ini kepada pembeli</p>

                                <Form.Check
                                    name="status"
                                    type="radio"
                                    label={`Batalkan transaksi`}
                                    id={`radio-2`}
                                    value={"reject"}
                                    onChange={selectedButtonReject}
                                    checked={selectedButtonReject === "reject"}

                                />
                                <p className=" text-black-50">Kamu membatalkan transaksi produk ini dengan pembeli</p>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                        <Button
                            className="bg-color-primary w-100 radius-primary border-0"
                            onClick={(e) => { onChangeStatus(e); handleCloseStatus() }}
                        >
                            Kirim
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>

            <div style={modalStyle}>
                <Modal show={show} onHide={handleClose} animation={true} size="sm" centered >

                    <Modal.Header closeButton ></Modal.Header>
                    <Modal.Body >
                        <div >
                            <div>
                                <p className="titlefont2">Yeay kamu berhasil mendapat harga yang sesuai</p>
                                <p className="greyfont" style={{ fontSize: "14px" }}>Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya</p>
                            </div>
                            <Card style={modalStyle}>

                                <p className='titlefont1 text-center m-2'>Product Match</p>
                                <div className='container'>
                                    <div>
                                        <Row className='mb-3'>
                                            <Col xs={3}>
                                                <img src={`${interest.user ? interest.user.picture : ""}`} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
                                            </Col>
                                            <Col>
                                                <p className="titlefont1">{interest.user && interest.user.name}</p>
                                                <p className="greyfont">{interest.user && interest.user.town}</p>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col xs={3}>
                                                <img src={`${interest.product ? interest.product.picture : ""}`} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
                                            </Col>
                                            <Col>
                                                <div className="titlefont2">
                                                    <p>{interest.product && interest.product.name}</p>
                                                    <p style={{ textDecorationLine: 'line-through' }}>Rp {interest.product && interest.product.price}</p>
                                                    <p>Ditawar Rp {interest.requestedPrice}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Card>
                            <div className='buttonWA'>
                                <Button style={Button2} onClick={handleClose}>
                                    Hubungi via Whatsapp
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    ) : (
        <Navigate to="/login" replace />);
}
