import React from "react";
import { Navbar, Container, Nav} from "react-bootstrap";
import "../Navbar/navbar.css";
import { useNavigate, Navigate, Link } from "react-router-dom";

export function InfoSellerNavbar() {


    return (
        <>
            <div className="na1 py-4 shadow">
                <nav className="navbar navbar-expand-lg navbar-light bg-all">
                    <Link to="/">
                        <button className="na2 navbar-brand box"></button>
                    </Link>
                    <Navbar.Brand href="#" className="brand" />
                    <div className="offcanvas-body" id="offcanvasRight">
                        <div className="info1 navbar">
                            <Nav className="text-dark"> Info Penawaran </Nav>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="mt-3">

            </div>
        </>
    );
}