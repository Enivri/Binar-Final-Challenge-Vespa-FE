import { useEffect, useRef, useState } from "react";
import { Nav, Navbar, Card, Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FiCamera, FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import React from "react";
import { Modal1 } from "./components/Modals/Modal";
import "../css/style.css";
import picExample1 from "../images/picExample1.png";


export default function InfoBidder() {
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
                            <Nav className="text-dark"> Info Penawar </Nav>
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
                    <div>
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Row>
                                    <Col xs="auto">
                                        <img src={picExample1} width="48px" />
                                    </Col>
                                    <Col>
                                        <p className="titlefont1">Nama Pembeli</p>
                                        <p className="greyfont">Kota</p>
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
                                    <img src={picExample1} width="48px" />
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <p className="greyfont">Penarawan produk</p>
                                            <div className="titlefont2">
                                                <p>Jam Tangan Casio</p>
                                                <p>Rp 250.000</p>
                                                <p>Ditawar Rp 200.000</p>
                                            </div>
                                        </Col>
                                        <Col>
                                            <p className="greyfont" style={floatStyle}>20 Apr, 14:04</p>
                                        </Col>
                                    </Row>
                                    <div style={floatStyle}>
                                        <Button variant="outline" style={colourButton}>Tolak</Button>
                                        <Modal1 />
                                    </div>
                                </Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item></ListGroup.Item>
                        </ListGroup>


                    </div>
                </div>



            </Container>
        </div>
    )
}