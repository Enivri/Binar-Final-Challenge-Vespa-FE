import { useEffect, useRef, useState } from "react";
import { Navigate, Link, useParams, useNavigate } from "react-router-dom";
import { Card, Button, Container, Form, Row, Col, Badge } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import ImageUser from "../../../images/Rectangle-23.png";
import firstImage from "../../../images/Rectangle-23.png";
import "../Sidebar/Sidebar.css"
import axios from "axios";


export function Content() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [toogleCategory, setToogleCategory] = useState(1)

  useEffect(() => {
    const validateLogin = async () => {
      try {
        // Check status user login
        // 1. Get token from localStorage
        const token = localStorage.getItem("token");

        // 2. Check token validity from API
        const currentUserRequest = await axios.get(
          "https://binar-final-challenge-vespa-be.herokuapp.com/v1/users",
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

    const getProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const responseProduct = await axios.get(`https://binar-final-challenge-vespa-be.herokuapp.com/v1/product/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        console.log(responseProduct)
        // console.log(getProduct)
        const dataProduct = await responseProduct.data.data.posts;
        setPost(dataProduct)
        console.log(dataProduct);
      } catch (err) {
        console.log(err);
      }
    }
    getProduct();
  }, [id]);

  const title = {
    fontSize: "14px",
  };

  const image = {
    width: "91%",
    margin: "8px",
  };

  const accesoris = {
    fontSize: "11px",
    opacity: "0.5",
  };



  return (
    <>
      <div className="content-product">
        <Link to="/buatproduk">
          <div className="px-2">
            <Form.Group className="mb-3 upload-product d-flex  ">
              <Button
                variant="secondary"
                className="w-100 d-flex upload-image-product gap-2  align-items-center justify-content-center"
              >
                <FiPlus
                  style={{ fontSize: "24px", divor: "rgba(138, 138, 138, 1)" }}
                />{" "}
                <p>Tambah Produk</p>
              </Button>
            </Form.Group>
          </div>
        </Link>
        <Container className="mt-5 px-2 w-100">
          <Row md={6} className="mb-3">
            {post.map((post) =>
              <Link to={`/previewproduk/${post.id}`} style={{ textDecoration: "none", color: "black" }}>
                <Col key={post.id} className="mb-3">
                  <Card>
                    <Card.Img variant="top" src={firstImage} style={image} />
                    <Card.Body className="p-2">
                      <Card.Title className="mb-0" style={title}>
                        {post.name}
                      </Card.Title>
                      <p className="mb-0" style={accesoris}>
                        {post.category}
                      </p>
                      <Card.Text className="mb-1">Rp.{post.price}</Card.Text>
                    </Card.Body>
                    <Badge bg={post.isPublished === true ? "primary" : "warning"}>
                      {post.isPublished === true ? "Produk sudah di publish" : "Produk belum di publish"}
                    </Badge>
                  </Card>
                </Col>,

              </Link>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
}




