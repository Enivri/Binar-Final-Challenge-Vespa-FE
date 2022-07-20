import { useEffect, useRef, useState } from "react";
import { Navigate, Link, useParams, useNavigate } from "react-router-dom";
import { HomeNavbar } from "./components/Navbar/Navbar";
import { SidebarUser } from "./components/Sidebar/Sidebar";
import { FiPlus, FiBox, FiHeart, FiDollarSign, FiChevronRight } from "react-icons/fi";
import { Row, Col, Card, Button, Container, Form, Badge } from "react-bootstrap";
import axios from "axios";
import "../css/daftarjual.css";

export default function DaftarJual() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [interest, setInterest] = useState({});
  const [toogleCategory, setToogleCategory] = useState(1)

  useEffect(() => {
    const validateLogin = async () => {
      try {
        // Check status user login
        // 1. Get token from localStorage
        const token = localStorage.getItem("token");

        // 2. Check token validity from API
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

    const getProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const responseProduct = await axios.get(`http://localhost:2000/v1/product/users/${id}`, {
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

  useEffect(() => {
    const interestData = async () => {

      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:2000/v1/transaction/owners/${id}`,
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
      {/* Navbar */}
      <div>
        <HomeNavbar />
      </div>
      {/* End Navbar */}

      <Container className="mt-4 page-daftar-jual" style={{ width: "70%" }}>
        <h5 className="fw-bold mb-3">Daftar Jual Saya</h5>

        {/* User Card */}
        <Row>
          <Col md={12}>
            <div>
              <SidebarUser />
            </div>
          </Col>
        </Row>
        {/* End User Card */}

        {/* Category Card */}
        <Row className="mt-3">
          <Col md={4}>
            <div>
              <div className="sidebar-category">
                <div className="p-3 card-sidebar-category">
                  <h6 className="fw-bold pt-2 px-2">Kategori</h6>
                  <div className="card-sidebar-catergory_body px-2 py-2">
                    <Button className={toogleCategory === 1 ? "active" : "" & "d-flex gap-2 align-items-center w-100 p-0 mb-2"}
                      onClick={() => setToogleCategory(1)}>
                      <FiBox /> Semua Produk <FiChevronRight className="ms-auto" />
                    </Button>

                    <Button className={toogleCategory === 2 ? "active" : "" & "d-flex gap-2 align-items-center w-100 p-0 mb-2"}
                      onClick={() => setToogleCategory(2)}>
                      <FiHeart /> Diminati <FiChevronRight className="ms-auto" />
                    </Button>

                    <Button className={toogleCategory === 3 ? "active" : "" & "d-flex gap-2 align-items-center w-100 p-0"}
                      onClick={() => setToogleCategory(3)}>
                      <FiDollarSign />
                      Terjual
                      <FiChevronRight className="ms-auto" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {/* End Category Card */}

          {/* Product Card */}
          <Col md={8}>
            <div className={toogleCategory === 1 ? "active-content" : "content"}>
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
                {post.map((post) =>
                  <Link to={`/previewproduk/${post.id}`} style={{ textDecoration: "none", color: "black" }}>
                    <div className="px-2 w-100">
                      <Card>
                        <Card.Img variant="top" src={post.picture} style={image} />
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
                    </div>
                  </Link>
                ).reverse()}
              </div>
            </div>
            <div className={toogleCategory === 2 ? "active-content" : "content"}>
              <div className="content-product">
                {interest.map((interest) =>
                  <Link to={`/previewproduk/${interest.id}`} style={{ textDecoration: "none", color: "black" }}>
                    <div className="px-2 w-100">
                      <Card>
                        <Card.Img variant="top" src={interest.picture} style={image} />
                        <Card.Body className="p-2">
                          <Card.Title className="mb-0" style={title}>
                            {interest.name}
                          </Card.Title>
                          <p className="mb-0" style={accesoris}>
                            {interest.category}
                          </p>
                          <Card.Text className="mb-1">Rp.{interest.price}</Card.Text>
                        </Card.Body>
                        {/* <Badge bg={interest.isPublished === true ? "primary" : "warning"}>
                          {interest.isPublished === true ? "Produk sudah di publish" : "Produk belum di publish"}
                        </Badge> */}
                      </Card>
                    </div>
                  </Link>
                ).reverse()}
              </div>
            </div>



          </Col>
        </Row>
      </Container>
    </>
  );
}