import React from 'react';
import { useState, useEffect, useRef } from "react";
import { HomeNavbar } from "./components/Navbar/Navbar"
import { Col, Row, Container, Button, Card, Modal, Form } from "react-bootstrap";
import { useNavigate, Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/product.css";
import jamCasio from '../images/product.png'



function ProductPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [post, setPost] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const requestedPriceField = useRef("");

    console.log(post.user_id)
    console.log(user.id)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [errorResponse, setErrorResponse] = useState({
        isError: false,
        message: "",
    });

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

    const onBid = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const bidPayload = {
                owner_id: post.user_id,
                product_id: post.id,
                isOpen: "false",
                accepted: "pending",
                requestedPrice: requestedPriceField.current.value,
            };

            const bidRequest = await axios.post(
                "http://localhost:2000/v1/transaction",
                bidPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(bidRequest);
            const bidResponse = bidRequest.data;
            console.log(bidResponse)

            if (bidResponse.status) navigate(`/dashboardseller/${user.id}`)
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
                    "http://localhost:2000/v1/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(currentUserRequest);

                const currentUserResponse = currentUserRequest.data;
                console.log(currentUserResponse);

                if (currentUserResponse.status === 200) {
                    console.log(currentUserResponse)
                    setUser(currentUserResponse.data);
                }
                console.log(setUser)
            } catch (err) {
                setIsLoggedIn(false);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
        const getProduct = async () => {
            try {
                const token = localStorage.getItem("token");
                const responseProduct = await axios.get(`http://localhost:2000/v1/product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                console.log(responseProduct)

                const dataProduct = await responseProduct.data.data.posts[0];
                setPost(dataProduct)
                console.log(dataProduct);

            } catch (err) {
                console.log(err);
            }
        }
        getProduct();
    }, [id])


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
                                    <img src={post.picture} className="d-block w-100" alt="..." />
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
                                <Card.Text className="card-text1">{post.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col >
                        <Card className="cardbody">
                            <Card.Body>
                                <Card.Title className="card-title1" >{post.name}</Card.Title>
                                <Card.Text className="card-text1">{post.category}</Card.Text>
                                <Card.Text className="card-title1">Rp {post.price}</Card.Text>
                                <Button style={colourButton} onClick={post.user_id === user.id ? (e) => onUpdate(e, true) : handleShow} className="btn btn-terbitkan1" type="submit" >
                                    {post.user_id === user.id ? "Terbitkan" : "  Saya tertarik dan ingin nego"}
                                </Button>

                                <Link to={`/updateproduk/${post.id}`}>
                                    <Button style={colourButton} className="btn btn-edit1" type="submit" hidden={post.user_id === user.id ? false : true}>
                                        Edit
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                        <Card className="card-body-buyer">
                            <Card.Body>
                                <Row>
                                    <Col className="col-md-2">
                                        <img src={`${post.user ? post.user.picture : ""}`} className="seller-image d-block" alt="Seller" />
                                    </Col>
                                    <Col className="col-md-10" style={{ paddingTop: 3, paddingBottom: 16, paddingLeft: 40 }}>
                                        <Card.Title className="card-title1" style={{ marginBottom: 4 }}>{post.user && post.user.name}</Card.Title>
                                        <Card.Text className="card-text1">{post.user && post.user.town}</Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

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
                                            <img src={post.picture} width="48px" height="48px" borderRadius='50px' />
                                        </Col>
                                        <Col>
                                            <div className='mt-4'>
                                                <p className="titlefont1">{post.name}</p>
                                                <p className="greyfont">Rp {post.price}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>

                            <div className='mt-3'>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className='titlefont1'>Harga Tawar</Form.Label>
                                        <Form.Control ref={requestedPriceField} type="text" placeholder="Rp 0,00" style={{ borderRadius: '10px' }} />

                                    </Form.Group>
                                </Form>
                                <div className='btn center-block buttonWA'>
                                    <Button style={Button2} onClick={handleClose}
                                        onClick={(e) => onBid(e)} >
                                        Kirim
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </Container>
        </>

    ) : (
        <Navigate to="/login" replace />);

}

export default ProductPage;