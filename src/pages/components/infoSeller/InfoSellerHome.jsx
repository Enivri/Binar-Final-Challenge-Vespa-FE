import React from "react";
import { Container, Button, Row, Col, Card, Image, Modal, Form } from "react-bootstrap";
import '../infoSeller/infoSeller.css';
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import PRODUCTIMG from '../../../images/product.png'
import PROFILEIMG from '../../../images/profile.png'




export function InfoSellerHome() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <Container>
            <Card className="card-seller">
                <div className="row">
                    <div className="col-sm-2">
                        <Card.Img variant="top" src={PROFILEIMG} />
                    </div>
                    <div className="col">
                        <Card.Body>
                            <div className="row">
                                <h3>Nama Penjual</h3>
                            </div>
                            <div className="row">
                                <p>$30</p>
                            </div>
                        </Card.Body>
                    </div>
                </div>
            </Card>
            <div className="me-9">
            </div>
            <div className="marginLeft">
                <h4>Daftar Produkmu yang Ditawar</h4>
            </div>
            <Card className="card-seller2">
                <div className="row">
                    <div className="col-sm-2">
                        <Card.Img variant="top" src={PRODUCTIMG} />
                    </div>
                    <div className="col-md-4">
                        <p> Penawaran Produk </p>
                        <h6> Jam Tangan Casio</h6>
                        <h6> Rp. 250,000</h6>
                        <h6> Ditawar Rp. 200,000</h6>
                    </div>
                    <div className="col-sm-2">

                    </div>
                    <div className="col-sm-2">

                    </div>
                    <div className="col-md-2">
                        <p>30 Juni 2022</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-2">
                        <Button variant="outline-info" className="button-info" onClick={(handleShow)}>  Status </Button>
                    </div>
                    <div className="col-md-2">
                        <Button variant="success" className="button-register">
                            <SiWhatsapp className="icon-register" />
                            Hubungi
                        </Button>
                    </div>

                </div>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        Perbarui Status Penjualan ProdukMu
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {['radio'].map((type) => (
                            <div key={`-${type}`} className="mb-3">
                                <Form.Check
                                    label="Berhasil Terjual"
                                    name="group1"
                                    type={type}
                                    id={`-${type}-1`}
                                />
                                <div className="formList">
                                <p> Kamu telah sepakat menjual produk ini dengan pembeli</p>
                                </div>
                                <Form.Check
                                    label="Batalkan Transaksi"
                                    name="group1"
                                    type={type}
                                    id={`-${type}-2`}
                                />
                                <div className="formList">
                                <p> Kamu membatalkan transaksi produk dengan pembeli</p>
                                </div>
                            </div>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-info" className="button-info" onClick={handleClose}> Kirim </Button>
                </Modal.Footer>

            </Modal>
        </Container>


    );
}