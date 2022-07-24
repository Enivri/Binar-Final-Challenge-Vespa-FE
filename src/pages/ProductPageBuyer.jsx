import React from 'react';
import { useRef, useState, useEffect } from "react";
import { HomeNavbar } from "./components/Navbar/Navbar"
import { useSelector } from "react-redux";
import { Col, Row, Container, Button, Card, Form } from "react-bootstrap";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { selectUser } from "../slices/userSlice";
import axios from "axios";
import "../css/product.css";
import jamCasio from '../images/product.png'
import imageSeller from '../images/profile.png'
import Modal from 'react-bootstrap/Modal';
import { FiArrowLeft } from "react-icons/fi";



function ProductPageBuyer() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const userRedux = useSelector(selectUser);
    const [user, setUser] = useState(userRedux.creds);

    // Modal
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);

    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);



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

    const colourButton = {
        backgroundColor: '#7126B5',
        borderRadius: '10px',
    };



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


    return isLoggedIn ? (
        <>
            <div className='bigScreen'>
                <HomeNavbar />

                <Container className="container" style={{ marginTop: 40 }}>
                    <Row className="row">
                        <Col className="col-md-1"></Col>
                        <Col className="col-md-6">
                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{ width: 600 }}>
                                <div className="carousel-indicators">
                                    <Button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></Button>
                                    <Button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></Button>
                                    <Button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></Button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={jamCasio} className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={jamCasio} className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={jamCasio} className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <Button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </Button>
                                <Button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </Button>
                            </div>
                            <Card className="card-body-descriptions">
                                <Card.Body>
                                    <Card.Title className="card-title1">Deskripsi</Card.Title>
                                    <Card.Text className="card-text1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col >

                            <Card className="cardbodybuyer">
                                <Card.Body>
                                    <Card.Title className="card-title1">Jam Tangan Casio</Card.Title>
                                    <Card.Text className="card-text1">Aksesoris</Card.Text>
                                    <Card.Title className="card-title1">Rp. 250.000</Card.Title>
                                    <div className="btnNego">
                                        <Button style={colourButton} className="btn btn-buyer" type="submit" onClick={handleShow}>
                                            Saya tertarik dan ingin nego
                                        </Button>
                                    </div>
                                        <Modal show={show} onHide={handleClose} animation={true} size="sm" centered >
                                            <Modal.Header closeButton ></Modal.Header>
                                            <Modal.Body >
                                                <div>
                                                    <p className="titlefont1">Masukkan Harga Tawarmu</p>
                                                    <p className="greyfont" style={{ fontSize: "14px" }}>Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan segera dihubungi penjual.</p>
                                                </div>
                                                <div>
                                                    <Card style={modalStyle}>
                                                        <div className='container'>
                                                            <Row className='mb-3'>
                                                                <Col xs={3} className='mt-4'>
                                                                    <img src={jamCasio} width="48px" height="48px" borderRadius='50px' />
                                                                </Col>
                                                                <Col>
                                                                    <div className='mt-4'>
                                                                        <p className="titlefont1">Jam Tangan Casio</p>
                                                                        <p className="greyfont">Rp 250.000</p>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Card>

                                                    <div className='mt-3'>
                                                        <Form>
                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label className='titlefont1'>Harga Tawar</Form.Label>
                                                                <Form.Control type="email" placeholder="Rp 0,00" style={{ borderRadius: '10px' }} />

                                                            </Form.Group>
                                                        </Form>
                                                        <Button className='btn center-block buttonWA' style={Button2} onClick={handleClose}>
                                                            Kirim
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                </Card.Body>

                            </Card>
                            <Card className="card-body-buyer">
                                <Card.Body>
                                    <Row>
                                        <Col className="col-md-2">
                                            <img src={imageSeller} className="seller-image d-block" alt="Seller" />
                                        </Col>
                                        <Col className="col-md-10" style={{ paddingTop: 3, paddingBottom: 16, paddingLeft: 40 }}>
                                            <Card.Title className="card-title1" style={{ marginBottom: 4 }}>Nama Penjual</Card.Title>
                                            <Card.Text className="card-text1">Kota</Card.Text>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>



            {/* screen 360 */}
            <div className='smallScreen'>
                <div >
                    <Button className="floating-button-back rounded-circle" variant='light'>
                        <FiArrowLeft style={{ fontSize: '18px' }} />
                    </Button>
                    <Button className="floating-button-nego border-0" style={colourButton} onClick={handleShow2}>
                        Saya tertarik dan ingin Nego
                    </Button>
                </div>
                <div>
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" >
                        <div className="carousel-indicators" >
                            <Button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></Button>
                            <Button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></Button>
                            <Button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></Button>
                        </div>
                        <div className="carousel" style={{ height: '200px' }}>
                            <div className="carousel-inner" >
                                <div className="carousel-item active">
                                    <img src={jamCasio} className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={jamCasio} className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={jamCasio} className="d-block w-100" alt="..." />
                                </div>


                                <div>
                                    <Card className="card-product">
                                        <Card.Body>
                                            <Card.Title >Jam Tangan Casio</Card.Title>
                                            <Card.Text >Aksesoris</Card.Text>
                                            <Card.Title >Rp. 250.000</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>



                <div>
                    <Card className="mx-3" style={{ marginTop: '130px' }}>
                        <Card.Body>
                            <Row>
                                <Col className="col-md-2">
                                    <img src={imageSeller} className="seller-image d-block" alt="Seller" />
                                </Col>
                                <Col className="col-md-8" style={{ paddingTop: 3, paddingBottom: 16 }}>
                                    <Card.Title className="card-title1" style={{ marginBottom: 4 }}>Nama Penjual</Card.Title>
                                    <Card.Text className="card-text1">Kota</Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Card className="mx-3 my-3" >
                        <Card.Body>
                            <Card.Title className="card-title1">Deskripsi</Card.Title>
                            <Card.Text className="card-text1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div>

                    <Modal show={show2} onHide={handleClose2} animation={false} centered >
                        <div className="container fixed-bottom bg-light">
                            <Modal.Header closeButton ></Modal.Header>
                            <Modal.Body >
                                <div>
                                    <p className="titlefont1">Masukkan Harga Tawarmu</p>
                                    <p className="greyfont" style={{ fontSize: "14px" }}>Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan segera dihubungi penjual.</p>
                                </div>
                                <div>
                                    <Card style={modalStyle}>
                                        <div className='container'>
                                            <Row className='mb-3'>
                                                <Col xs={3} className='mt-4'>
                                                    <img src={jamCasio} width="48px" height="48px" borderRadius='50px' />
                                                </Col>
                                                <Col>
                                                    <div className='mt-4'>
                                                        <p className="titlefont1">Jam Tangan Casio</p>
                                                        <p className="greyfont">Rp 250.000</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>

                                    <div className='mt-3'>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='titlefont1'>Harga Tawar</Form.Label>
                                                <Form.Control type="email" placeholder="Rp 0,00" style={{ borderRadius: '10px' }} />

                                            </Form.Group>
                                        </Form>
                                        <Button className='btn center-block buttonWA mx-3' style={Button2} >
                                            Kirim
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </div>
                    </Modal>

                </div>

            </div>


        </>

    ) : (
        <Navigate to="/login" replace />);

}

export default ProductPageBuyer;