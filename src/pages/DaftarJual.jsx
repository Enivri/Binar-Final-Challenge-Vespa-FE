import React from "react";
import { HomeNavbar } from "./components/Navbar/Navbar";
import { SidebarUser } from "./components/Sidebar/Sidebar";
import { FiPlus, FiBox, FiHeart, FiDollarSign, FiChevronRight } from "react-icons/fi";
import { Row, Col, Card, Button, Container, Form } from "react-bootstrap";
import firstImage from "../images/Rectangle-23.png";
import "../css/daftarjual.css";

export default function DaftarJual() {

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
                    <Button className="d-flex gap-2 align-items-center w-100 p-0 mb-2">
                      <FiBox /> Produk <FiChevronRight className="ms-auto" />
                    </Button>

                    <Button className="d-flex gap-2 align-items-center w-100 p-0 mb-2">
                      <FiHeart /> Diminati <FiChevronRight className="ms-auto" />
                    </Button>

                    <Button className="d-flex gap-2 align-items-center w-100 p-0">
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
            <div>
              <div className="content-product">
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
                      <Form.Control type="file" />
                    </Button>
                  </Form.Group>
                </div>
                <div className="px-2 w-100">
                  <Card>
                    <Card.Img variant="top" src={firstImage} style={image} />
                    <Card.Body className="p-2">
                      <Card.Title className="mb-0" style={title}>
                        Jam Tangan Casio
                      </Card.Title>
                      <p className="mb-0" style={accesoris}>
                        Aksesoris
                      </p>
                      <Card.Text className="mb-1">Rp 250.000</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="px-2">
                  <Card>
                    <Card.Img variant="top" src={firstImage} style={image} />
                    <Card.Body className="p-2">
                      <Card.Title className="mb-0" style={title}>
                        Jam Tangan Casio
                      </Card.Title>
                      <p className="mb-0" style={accesoris}>
                        Aksesoris
                      </p>
                      <Card.Text className="mb-1">Rp 250.000</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="px-2">
                  <Card>
                    <Card.Img variant="top" src={firstImage} style={image} />
                    <Card.Body className="p-2">
                      <Card.Title className="mb-0" style={title}>
                        Jam Tangan Casio
                      </Card.Title>
                      <p className="mb-0" style={accesoris}>
                        Aksesoris
                      </p>
                      <Card.Text className="mb-1">Rp 250.000</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="px-2">
                  <Card>
                    <Card.Img variant="top" src={firstImage} style={image} />
                    <Card.Body className="p-2">
                      <Card.Title className="mb-0" style={title}>
                        Jam Tangan Casio
                      </Card.Title>
                      <p className="mb-0" style={accesoris}>
                        Aksesoris
                      </p>
                      <Card.Text className="mb-1">Rp 250.000</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="px-2">
                  <Card>
                    <Card.Img variant="top" src={firstImage} style={image} />
                    <Card.Body className="p-2">
                      <Card.Title className="mb-0" style={title}>
                        Jam Tangan Casio
                      </Card.Title>
                      <p className="mb-0" style={accesoris}>
                        Aksesoris
                      </p>
                      <Card.Text className="mb-1">Rp 250.000</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </Col>
          {/* End Product Card */}
        </Row>
      </Container>
    </>
  );
}