import React from "react";
import { Container, Button, Card, Modal, Form } from "react-bootstrap";
import '../infoSeller/infoSeller.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { SiWhatsapp } from "react-icons/si";
import { FiArrowLeft } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import PRODUCTIMG from '../../../images/product.png'
import PROFILEIMG from '../../../images/profile.png'




export function InfoSellerHome() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

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
    const colourButton = {
        borderColor: '#7126B5',
        color: '#7126B5',
        borderRadius: '16px',
        fontSize: "14px",
        width: "158px",
        marginRight: "16px",
    };

    return (
        <Container>



            <Card className="card-seller">
                <div className="row">
                    <div className="col-sm-1 backButton">
                        <Link className="arrow2" to="/">
                            <FiArrowLeft />
                        </Link>
                    </div>
                    <div className="col-sm-2">
                        <Card.Img variant="top" className="PICT" src={PROFILEIMG} />
                    </div>
                    <div className="col">
                        <Card.Body >
                            <div className="card-body">
                                <div className="row">
                                    <h3>Nama Penjual</h3>
                                </div>
                                <div className="row">
                                    <p>$30</p>
                                </div>
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
                        <Card.Img variant="top" src={PRODUCTIMG} className="PICT2" />
                    </div>
                    <div className="col-md-4">
                        <div className="card-bodyDua">
                            <p> Penawaran Produk </p>
                            <h6> Jam Tangan Casio</h6>
                            <h6> Rp. 250,000</h6>
                            <h6> Ditawar Rp. 200,000</h6>
                        </div>
                    </div>
                    <div className="col-sm-2 nonAct">

                    </div>
                    <div className="col-sm-2 nonAct">

                    </div>
                    <div className="col-md-2 nonAct">
                        <p>30 Juni 2022</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 nonAct">

                    </div>
                    <div className="col-md-2 nonAct">

                    </div>
                    <div className="col-md-2 nonAct">

                    </div>
                    <div className="col-md-2">
                        <div className="one">
                            <Button variant="outline-info" className="button-info button" onClick={(handleShow)}>  Status </Button>
                        </div>
                    </div>
                    <div className="col-sm-1 nonAct">

                    </div>
                    <div className="col-md-2">
                        <div className="two">
                        <Button variant="success" className="button-register button">
                            Hubungi
                            <SiWhatsapp className="icon-register" />
                        </Button>
                        </div>

                    </div>




                </div>
            </Card>

            <Modal show={show} onHide={handleClose} className="modal-seller" animation={true} size="sm" centered>
                <button className="transparent" onClick={(handleClose)}>
                    <div className="closeBut">
                    <GrClose />
                    </div>

                </button>
                <Modal.Header className="center">
                    <h5>
                        Perbarui Status Penjualan ProdukMu
                    </h5>
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
                                    <div className="word">
                                    <p> Kamu telah sepakat menjual produk ini dengan pembeli</p>
                                    </div>
                                </div>
                                <Form.Check
                                    label="Batalkan Transaksi"
                                    name="group1"
                                    type={type}
                                    id={`-${type}-2`}
                                />
                                <div className="formList">
                                    <div className="word">
                                    <p> Kamu membatalkan transaksi produk dengan pembeli</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-info" className="button-info buttonModal" onClick={handleClose}> Kirim </Button>
                </Modal.Footer>

            </Modal>
        </Container>


    );
}