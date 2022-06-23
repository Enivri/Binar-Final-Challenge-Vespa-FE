import "../css/main.css";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FiSearch } from "react-icons/fi";
import { BsPlus } from "react-icons/bs";
import Navbar from "../components/NavBar";
import CardProduct from "../components/Card";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const state = {
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:5,
                nav:true,
                loop:false
            }
        }
    }

    return isLoggedIn ? (
        <>
            <div className="bg-nav">
                <Navbar />
            </div>

            <div className="slider">
                <OwlCarousel
                    className="owl-theme slider-items"
                    items={2}
                    autoplay={true}
                    autoplayTimeout={5000}
                    autoplayHoverPause={true}
                    center
                    loop
                    margin={10}
                    nav
                    
                // responsive={state.responsive}
                >
                    <div className="slider-card ">
                        <Card className="card-content home-carousel-1">
                            <Row>
                                <Col xs={8} md={6} className="carousel-text">
                                    <p className="text-1">Bulan Ramadhan Banyak diskon!</p>
                                    <p className="text-2">Diskon Hingga</p>
                                    <p className="text-3">60%</p>
                                </Col>
                                <Col xs={4} md={2} className="carousel-1">
                                    <img src="/images/carousel-1.png" alt=""/>
                                </Col>
                                <Col xs={6} md={4} className="carousel-2">
                                    <img src="/images/carousel-2.png" alt=""/>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                    <div className="slider-card second-slide slider-2">
                        <Card className="card-content home-carousel-2">
                            <Row>
                                <Col xs={8} md={6} className="carousel-text">
                                    <p className="text-1">Bulan Ramadhan Banyak diskon!</p>
                                    <p className="text-2">Diskon Hingga</p>
                                    <p className="text-3">60%</p>
                                </Col>
                                <Col xs={4} md={2} className="carousel-1">
                                    <img src="/images/carousel-1.png" alt=""/>
                                </Col>
                                <Col xs={6} md={4} className="carousel-2">
                                    <img src="/images/carousel-3.png" alt=""/>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                    <div className="slider-card third-slide slider-2">
                        <Card className="card-content home-carousel-3">
                            <Row>
                                <Col xs={8} md={6} className="carousel-text">
                                    <p className="text-1">Bulan Ramadhan Banyak diskon!</p>
                                    <p className="text-2">Diskon Hingga</p>
                                    <p className="text-3">60%</p>
                                </Col>
                                <Col xs={4} md={2} className="carousel-1">
                                    <img src="/images/carousel-1.png" alt=""/>
                                </Col>
                                <Col xs={6} md={4} className="carousel-2">
                                    <img src="/images/carousel-4.png" alt=""/>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </OwlCarousel>
            </div>

            <Container className="category">
                <h6 className="fw-bold">Telusuri Kategori</h6>
                <div>
                    <div className="d-flex gap-3 button-category">
                        <Button className="d-flex gap-1 px-3" variant="primary">
                            <FiSearch className="align-self-center" /> Semua
                        </Button>
                        <Button className="d-flex gap-1 px-3" variant="primary">
                            <FiSearch className="align-self-center" /> Hobi
                        </Button>
                        <Button className="d-flex gap-1 px-3" variant="primary">
                            <FiSearch className="align-self-center" /> Kendaraan
                        </Button>
                        <Button className="d-flex gap-1 px-3" variant="primary">
                            <FiSearch className="align-self-center" /> Baju
                        </Button>
                        <Button className="d-flex gap-1 px-3" variant="primary">
                            <FiSearch className="align-self-center" /> Elektronik
                        </Button>
                        <Button className="d-flex gap-1 px-3" variant="primary">
                            <FiSearch className="align-self-center" /> Kesehatan
                        </Button>
                    </div>

                    <Link to="/login" className="text-decoration-none">
                        <Button className="d-flex gap-2 px-3 py-2 fixed-bottom button-sell mb-4">
                            <BsPlus
                                className="align-self-center "
                                style={{ fontSize: "24px" }}
                            />{" "}
                            Jual
                        </Button>
                    </Link>
                </div>
            </Container>

            <div>
                <CardProduct />
            </div>
        </>
    ) : (
        <Navigate to="/login" replace />
    );
    
}
