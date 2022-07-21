import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
// import picExample1 from "../../../images/picExample1.png";
import { Card, Container, Form, Row, Col, ListGroup } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

export function Modal1() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [interest, setInterest] = useState([]);


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

    const [selectedSold, setSelectedSold] = useState();
    const [selectedReject, setSelectedReject] = useState();
    const [selectedAccept, setSelectedAccept] = useState();

    const selectedButton = (e) => {
        console.log(e.target.value);
    };

    const selectedButtonSold = (e) => {
        setSelectedSold(e.target.value);
    }

    const selectedButtonReject = (e) => {
        setSelectedAccept(false)
        setSelectedReject(e.target.value);
    }

    const onChangeStatus = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const acceptPayload = {
                isSold: selectedSold,
                isRejected: selectedReject,
                isAccepted: selectedAccept,
            }

            const acceptRequest = await axios.put(
                `http://localhost:2000/v1/transactions/update/${id}`,
                acceptPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const acceptResponse = acceptRequest.data;

            console.log(acceptResponse);

            const response = await axios.get(`http://localhost:2000/v1/transactions/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log(response);
            const data = await response.data.data.transaction_by_id;
            console.log(data);

            setInterest(data);

            if (acceptResponse.status) navigate(`/infoPenawaran/${interest.id}`);
        } catch (err) {
            console.log(err);
            const response = err.response.data;

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };


    const onAccept = async (e, accepted) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const acceptPayload = {
                accepted: accepted,

            }

            const acceptRequest = await axios.put(
                `http://localhost:2000/v1/transaction/${id}`,
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

            const response = await axios.get(`http://localhost:2000/v1/transaction/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log(response);
            const data = await response.data.data.posts;
            console.log(data);

            setInterest(data);

            if (acceptResponse.status) navigate(`/infoPenawaran/${interest.id}`);
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

            const response = await axios.get(`http://localhost:2000/v1/transaction/${id}`,
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


    return (
        <>
            <Button
                style={Button1}
                onClick={(e) => { onAccept(e, "waiting"); handleShow() }}
                hidden={interest.accepted === "reject" || (interest.product && interest.product.sold) === true ? true : false}
            >
                {interest.accepted === "waiting" ? "Hubungi di " : "Terima"}
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
        </>
    );
}