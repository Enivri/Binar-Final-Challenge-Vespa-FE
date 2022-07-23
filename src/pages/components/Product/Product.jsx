import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import '../Product/Product.css';

export function Product() {
    const [post, setPost] = useState([]);
    const [category, setCategory] = useState([""]);
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();


    const searching = useSelector(state => state.search.search)
    const categories = category ? `&category=${category}` : "";
    const searched = searching ? `&name=${searching}` : "";
    console.log(searching);

    const colourButton = {
        backgroundColor: '#7126B5',
        borderRadius: '12px',
    };

    const button2 = {
        borderRadius: '12px',
        backgroundColor: '#b8a1cf',
        textColor: 'Black',
    };

    useEffect(() => {
        const getProductPublish = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:2000/v1/product/all?isPublished=true&&sold=false${categories}${searched}`
                )
                console.log(response)
                const data = await response.data.data.result;
                console.log(data)
                setPost(data);
            } catch (err) {
                console.log(err);
            }
        }

        // Function validasi user
        const validateLogin = async () => {
            try {
                const token = localStorage.getItem("token");

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
        validateLogin();
        getProductPublish();
    }, [categories, searching]);


    return (
        <>
            {/* <HomeNavbar /> */}
            <Container className="pt-5 buttonCategory" id="btn-category">
                <h5 className="fw-bold tittle-category">Telusuri Kategori</h5>
                <div>
                    <div className="d-flex button-group pt-2 productCategory">
                        <Button style={colourButton} onClick={() => setCategory(null)} className="d-flex me-4 buttonSection bg-color-secondary border-0 active">
                            <FiSearch className="me-1 mb-1" />
                            Semua
                        </Button>
                        <Button style={button2} onClick={() => setCategory("Hobi")} className="d-flex me-4 buttonSection colour border-0">
                            <FiSearch className="me-1 mb-1" /> Hobi
                        </Button>
                        <Button style={button2} onClick={() => setCategory("Kendaraan")} className="d-flex me-4 buttonSection colour border-0">
                            <FiSearch className="me-1 mb-1" /> Kendaraan
                        </Button>
                        <Button style={button2} onClick={() => setCategory("Baju")} className="d-flex me-4 buttonSection colour border-0">
                            <FiSearch className="me-1 mb-1" /> Baju
                        </Button>
                        <Button style={button2} onClick={() => setCategory("Elektronik")} className="d-flex me-4 buttonSection colour border-0">
                            <FiSearch className="me-1 mb-1" /> Elektronik
                        </Button>
                        <Button style={button2} onClick={() => setCategory("Kesehatan")} className="d-flex me-4 buttonSection colour border-0">
                            <FiSearch className="me-1 mb-1" /> Kesehatan
                        </Button>
                    </div>
                </div>

                <Container className="mt-5 card-product">
                    <Row md={6} className="mb-3 rowCard">
                        {post.map((post) =>
                            <Link to={`/previewproduk/${post.id}`} style={{ textDecoration: "none", color: "black" }}>
                                <Col key={post.id} className="mb-3">
                                    <Card >
                                        <Card.Img variant="top" className="p-2 cardimg" src={post.picture} />
                                        <Card.Body>
                                            <Card.Title className="cut-text">{post.name}</Card.Title>
                                            <p className="text-black-50 categorycard">{post.category}</p>
                                            <Card.Text>Rp {post.price.toLocaleString()}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Link>
                        ).reverse()}
                    </Row>
                </Container>

                <Container className="mt-5 product-card">
                        {post.map((post) =>
                            <Link to={`/previewproduk/${post.id}`} style={{ textDecoration: "none", color: "black" }}>
                                <div key={post.id}>
                                    <Card>
                                        <Card.Img variant="top" className="p-2 cardimg" src={post.picture} />
                                        <div className="card-Content">
                                            <Card.Title className="cut-text">{post.name}</Card.Title>
                                            <p className="text-black-50 categorycard">{post.category}</p>
                                            <Card.Text>Rp {post.price.toLocaleString()}</Card.Text>
                                        </div>
                                    </Card>
                                </div>
                            </Link>
                        ).reverse()}
                </Container>
            </Container>
        </>
    );
}