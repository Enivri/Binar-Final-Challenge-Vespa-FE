import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import picExample1 from "../../../images/picExample1.png";
import { Card, Container, Row, Col, ListGroup } from "react-bootstrap";

import Modal from 'react-bootstrap/Modal';

export function Modal1() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Button1 = {
        backgroundColor: '#7126B5',
        borderRadius: '10px',
        fontSize: '14px',
        borderRadius: '16px',
        width: '158px'
    };

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

    return (
        <>
            <Button style={Button1} onClick={handleShow}>
                Terima
            </Button>
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
                                                <img src={picExample1} width="48px" />
                                            </Col>
                                            <Col>
                                                <p className="titlefont1">Nama Pembeli</p>
                                                <p className="greyfont">Kota</p>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col xs={3}>
                                                <img src={picExample1} width="48px" />
                                            </Col>
                                            <Col>
                                                <div className="titlefont2">
                                                    <p>Jam Tangan Casio</p>
                                                    <p style={{ textDecorationLine: 'line-through' }}>Rp 250.000</p>
                                                    <p>Ditawar Rp 200.000</p>
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
        </>
    );
}
