import React from "react";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
// import { HomeNavbar } from "../../components/Navbar/Navbar"
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import { useSelector } from "react-redux";
import '../Product/Product.css';

export function Product() {
    const [post, setPost] = useState([]);
    const [category, setCategory] = useState([""]);
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(true);

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
            <Container className="pt-5" id="btn-category">
                <h5 className="fw-bold tittle-category">Telusuri Kategori</h5>
                <div className="button-group pt-2">
                    <Button style={colourButton} onClick={() => setCategory(null)} className="me-4 buttonSection bg-color-secondary border-0 active">
                        <FiSearch className="me-1 mb-1" />
                        Semua
                    </Button>
                    <Button style={button2} onClick={() => setCategory("Hobi")} className="me-4 buttonSection colour border-0">
                        <FiSearch className="me-1 mb-1" /> Hobi
                    </Button>
                    <Button style={button2} onClick={() => setCategory("Kendaraan")} className="me-4 buttonSection colour border-0">
                        <FiSearch className="me-1 mb-1" /> Kendaraan
                    </Button>
                    <Button style={button2} onClick={() => setCategory("Baju")} className="me-4 buttonSection colour border-0">
                        <FiSearch className="me-1 mb-1" /> Baju
                    </Button>
                    <Button style={button2} onClick={() => setCategory("Elektronik")} className="me-4 buttonSection colour border-0">
                        <FiSearch className="me-1 mb-1" /> Elektronik
                    </Button>
                    <Button style={button2} onClick={() => setCategory("Kesehatan")} className="me-4 buttonSection colour border-0">
                        <FiSearch className="me-1 mb-1" /> Kesehatan
                    </Button>
                </div>

                <div className="owl-carousel">
                    <OwlCarousel items={1}
                        className="owl-theme mt-5"
                        left
                        autoplay={true}
                        stagePadding={2}
                        loop={true}
                        margin={5}
                        lazyLoad={true}
                        dots={false} >
                        <div className="item">
                            <div className="slider1">
                                <Button style={colourButton} onClick={() => setCategory(null)} className="me-4 buttonSection bg-color-secondary border-0 active">
                                    <FiSearch className="me-1 mb-1" />
                                    Semua
                                </Button>
                            </div>
                        </div>
                        <div className="item">
                            <div className="slider2">
                                <Button style={button2} onClick={() => setCategory("Hobi")} className="me-4 buttonSection colour border-0">
                                    <FiSearch className="me-1 mb-1" /> Hobi
                                </Button>
                            </div>
                        </div>
                        <div className="item">
                            <div className="slider3">
                                <Button style={button2} onClick={() => setCategory("Baju")} className="me-4 buttonSection colour border-0">
                                    <FiSearch className="me-1 mb-1" /> Baju
                                </Button>
                            </div>
                        </div>
                        <div className="item">
                            <div className="slider4">
                                <Button style={button2} onClick={() => setCategory("Elektronik")} className="me-4 buttonSection colour border-0">
                                    <FiSearch className="me-1 mb-1" /> Elektronik
                                </Button>
                            </div>
                        </div>
                        <div className="item">
                            <div className="slider5">
                                <Button style={button2} onClick={() => setCategory("Kesehatan")} className="me-4 buttonSection colour border-0">
                                    <FiSearch className="me-1 mb-1" /> Kesehatan
                                </Button>
                            </div>
                        </div>
                    </OwlCarousel>
                </div>

                <Container className="mt-5">
                    <Row md={6} className="mb-3">
                        {post.map((post) =>
                            <Col key={post.id} className="mb-3">
                                <Card >
                                    <Card.Img variant="top" className="p-2 cardimg" src={`http://localhost:2000/public/files/${post.picture}`} />
                                    <Card.Body>
                                        <Card.Title className="cut-text">{post.name}</Card.Title>
                                        <p className="text-black-50 categorycard">{post.category}</p>
                                        <Card.Text>Rp {post.price}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>,
                        )}
                    </Row>

                </Container>
            </Container>
        </>
    );
}
