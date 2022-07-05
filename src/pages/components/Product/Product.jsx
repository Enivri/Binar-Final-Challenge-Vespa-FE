import React from "react";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import '../Product/Product.css';

export function Product() {
    const [post, setPost] = useState([]);
    const [category, setCategory] = useState([""]);
    const categories = category ? `&category=${category}` : "";

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
        const postData = async () => {
            const response = await axios.get(`http://localhost:2000/v1/product/all?isPublish=true&&sold=false${categories}`);
            const data = await response.data.data.result;
            setPost(data);
        };
        postData();
    }, [categories]);

    return (

        <Container className="pt-5 " id="btn-category">
            <h5 className="fw-bold">Telusuri Kategori</h5>
            <div className="button-group pt-2">
                <Button style={colourButton} onClick={() => setCategory(null)} className="me-4 radius-secondary bg-color-secondary border-0 active">
                    <FiSearch className="me-1 mb-1" />
                    Semua
                </Button>
                <Button style={button2} onClick={() => setCategory("Hobi")} className="me-4 radius-secondary colour border-0">
                    <FiSearch className="me-1 mb-1" /> Hobi
                </Button>
                <Button style={button2} onClick={() => setCategory("Kendaraan")} className="me-4 radius-secondary colour border-0">
                    <FiSearch className="me-1 mb-1" /> Kendaraan
                </Button>
                <Button style={button2} onClick={() => setCategory("Baju")} className="me-4 radius-secondary colour border-0">
                    <FiSearch className="me-1 mb-1" /> Baju
                </Button>
                <Button style={button2} onClick={() => setCategory("Elektronik")} className="me-4 radius-secondary colour border-0">
                    <FiSearch className="me-1 mb-1" /> Elektronik
                </Button>
                <Button style={button2} onClick={() => setCategory("Kesehatan")} className="me-4 radius-secondary colour border-0">
                    <FiSearch className="me-1 mb-1" /> Kesehatan
                </Button>
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
    );
}
