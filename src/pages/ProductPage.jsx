import React from 'react';
import { useRef, useState, useEffect } from "react";
import { HomeNavbar } from "./components/Navbar/Navbar"
import { useSelector } from "react-redux";
import { Col, Row, Container, Button, Card, } from "react-bootstrap";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { selectUser } from "../slices/userSlice";
import axios from "axios";
import "../css/product.css";
import jamCasio from '../images/product.png'
import imageSeller from '../images/profile.png'


function ProductPage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const userRedux = useSelector(selectUser);
    const [user, setUser] = useState(userRedux.creds);

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
                        <Card className="cardbody">
                            <Card.Body>
                                <Card.Title className="card-title1">Jam Tangan Casio</Card.Title>
                                <Card.Text className="card-text1">Aksesoris</Card.Text>
                                <Card.Title className="card-title1">Rp. 250.000</Card.Title>
                                <Button style={colourButton} className="btn btn-terbitkan1" type="submit">
                                    Terbitkan
                                </Button>
                                <Button style={colourButton} className="btn btn-edit1" type="submit">
                                    Edit
                                </Button>
                            </Card.Body>
                        </Card>
                        <Card className="card-body-seller">
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
        </>

    ) : (
        <Navigate to="/login" replace />);

}

export default ProductPage;