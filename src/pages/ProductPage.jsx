import React from 'react';
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Nav, Navbar, Form, Container, Button, Alert } from "react-bootstrap";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { selectUser } from "../slices/userSlice";
import axios from "axios";
import "../css/style.css";

function ProductPage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const userRedux = useSelector(selectUser);
    const [user, setUser] = useState(userRedux.creds);

    useEffect(() => {
        const fetchData = async () => {
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
        fetchData();
    }, [])


    return isLoggedIn ? (

        <>

            <div className="container" style={{ marginTop: 40 }}>

                <div className="row">

                    <div className="col-md-1"></div>

                    <div className="col-md-6">

                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{ width: 600 }}>

                            <div className="carousel-indicators">

                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>

                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>

                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>

                            </div>

                            <div className="carousel-inner">

                                <div className="carousel-item active">

                                    <img src="assets/images/jam_casio.png" className="d-block w-100" alt="..." />

                                </div>

                                <div className="carousel-item">

                                    <img src="assets/images/jam_casio.png" className="d-block w-100" alt="..." />

                                </div>

                                <div className="carousel-item">

                                    <img src="assets/images/jam_casio.png" className="d-block w-100" alt="..." />

                                </div>

                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">

                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>

                                <span className="visually-hidden">Previous</span>

                            </button>

                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">

                                <span className="carousel-control-next-icon" aria-hidden="true"></span>

                                <span className="visually-hidden">Next</span>

                            </button>

                        </div>

                        <div className="card-description">

                            <div className="card-body-description">

                                <h5 className="card-title">Deskripsi</h5>

                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card-product">

                            <div className="card-body">

                                <h5 className="card-title">Jam Tangan Casio</h5>

                                <p className="card-text">Aksesoris</p>

                                <h4 className="card-title">Rp. 250.000</h4>

                                <a href="/" className="btn btn-primary btn-terbitakan">Terbitkan</a>

                                <a href="/" className="btn btn-primary btn-edit">Edit</a>

                            </div>

                        </div>

                        <div className="card-seller">

                            <div className="card-body-seller">

                                <div className="row">

                                    <div className="col-md-2">

                                        <img src="assets/images/image_seller.png" className="seller-image d-block" alt="Seller" />

                                    </div>

                                    <div className="col-md-10" style={{ paddingTop: 16, paddingBottom: 16, paddingLeft: 32 }}>

                                        <h5 className="card-title" style={{ marginBottom: 4 }}>Nama Penjual</h5>

                                        <p className="card-text">Kota</p>

                                    </div>

                                </div>



                            </div>

                        </div>

                    </div>

                    <div className="col-md-1"></div>

                </div>

            </div>

        </>


    ) : (
        <Navigate to="/login" replace />);

}

export default ProductPage;