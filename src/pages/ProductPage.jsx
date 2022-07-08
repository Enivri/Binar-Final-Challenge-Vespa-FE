import React from 'react';
import { useState, useEffect } from "react";
import { HomeNavbar } from "./components/Navbar/Navbar"
import { Col, Row, Container, Button, Card, } from "react-bootstrap";
import { useNavigate, Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/product.css";
import jamCasio from '../images/product.png'
import imageSeller from '../images/profile.png'


function ProductPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const [errorResponse, setErrorResponse] = useState({
        isError: false,
        message: "",
    });


    const colourButton = {
        backgroundColor: '#7126B5',
        borderRadius: '10px',
    };


    const getProduct = async () => {
        try {
            const token = localStorage.getItem("token");
            const responseProduct = await axios.get(`http://localhost:2000/v1/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            console.log(responseProduct)
            // console.log(getProduct)
            const dataProduct = await responseProduct.data.data.posts;
            setData(dataProduct)
            console.log(dataProduct);
        } catch (err) {
            console.log(err);
        }
    }

    const onUpdate = async (e, isPublished) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const postPayload = new FormData();
            postPayload.append("isPublished", isPublished);

            const createRequest = await axios.put(
                `http://localhost:2000/v1/product/${id}`,
                postPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const createResponse = createRequest.data;

            if (createResponse.status) navigate(`/`);
        } catch (err) {
            const response = err.response.data;

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };

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
            console.log(setUser)
        } catch (err) {
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        fetchData();
        getProduct();
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
                                <Card.Text className="card-text1">{data.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col >
                        <Card className="cardbody">
                            <Card.Body>
                                <Card.Title className="card-title1" >{data.name}</Card.Title>
                                <Card.Text className="card-text1">{data.category}</Card.Text>
                                <Card.Text className="card-title1">Rp {data.price}</Card.Text>
                                <Button style={colourButton} onClick={(e) => onUpdate(e, true)} className="btn btn-terbitkan1" type="submit">
                                    Terbitkan
                                </Button>
                                <Link to={`/updateproduk/${data.id}`}>
                                    <Button style={colourButton} className="btn btn-edit1" type="submit">
                                        Edit
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                        <Card className="card-body-seller">
                            <Card.Body>
                                <Row>
                                    <Col className="col-md-2">
                                        <img src={imageSeller} className="seller-image d-block" alt="Seller" />
                                    </Col>
                                    <Col className="col-md-10" style={{ paddingTop: 3, paddingBottom: 16, paddingLeft: 40 }}>
                                        <Card.Title className="card-title1" style={{ marginBottom: 4 }}>test</Card.Title>
                                        <Card.Text className="card-text1">test</Card.Text>
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