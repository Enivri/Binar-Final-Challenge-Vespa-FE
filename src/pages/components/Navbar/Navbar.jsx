import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../../slices/userSlice";
import { addSearch } from "../../../slices/searchingSlice";
import { Navbar, Container, Button, Dropdown, Offcanvas } from "react-bootstrap";
import { FiLogIn, FiList, FiBell, FiUser, FiLogOut } from "react-icons/fi";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import "../Navbar/navbar.css";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    background: '#EEEEEE',
    borderRadius: '16px',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    display: 'block',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '35ch',
        },
    },
}));

export function HomeNavbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const [data, setData] = useState({});
    const [open, setOpen] = React.useState(true);
    const [show, setShow] = useState(false);
    const [searching, setSearching] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const colourButton = {
        backgroundColor: '#7126B5',
    };

    const handleSearch = () => {
        dispatch(
            addSearch(searching)
        )
    }
    const getUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const responseUsers = await axios.get(`http://localhost:2000/v1/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            const dataUsers = await responseUsers.data.data;
            setData(dataUsers)
        } catch (err) {
        }
    }

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
                // console.log(currentUserRequest.data.data.id)

                const currentUserResponse = currentUserRequest.data.data.id;

                // console.log(currentUserResponse)

                if (currentUserResponse.status) {
                    dispatch(
                        addUser({
                            user: currentUserResponse.user,
                            token: token,
                        })
                    );
                    setUser(currentUserResponse.user);
                }
                // console.log(addUser)
                // console.log(setUser)
            } catch (err) {
                setIsLoggedIn(false);
            }
        };
        handleSearch();
        fetchData();
        getUsers();
    }, [searching]);

    const logout = () => {
        localStorage.removeItem("token");

        setIsLoggedIn(false);
        setUser({});
        navigate("/");
    };


    return (
        <>
            <Navbar expand="lg" variant="light">
                <Container className="home-navbar" >
                    <Navbar.Brand className="logo" href="/"></Navbar.Brand>
                    <div className="me-auto searchNav">
                        <div className="search">
                            <SearchIcon />
                            <StyledInputBase
                                onChange={(e) => {
                                    setSearching(e.target.value)
                                }}
                                placeholder="Cari di sini …"
                                inputProps={{ 'aria-label': 'search' }}
                                className="searchNav"
                            />
                        </div>
                    </div>
                    <div className="togler">
                        <Navbar.Toggle onClick={handleShow} aria-controls="off-canvas" />
                        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                            {!isLoggedIn ? (
                                <Navbar.Offcanvas show={show} onHide={handleClose} id="off-canvas">
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title className="title-navbar-mobile">Second Hand</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Button style={colourButton} variant="success" className="button-register" href="/login">
                                            <FiLogIn className="icon-register" />
                                            Masuk
                                        </Button>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>

                            ) : (
                                <>
                                    <Link to={`/dashboardseller/${data.id}`}>
                                        <Button
                                            variant="none"
                                            className="mx-1"
                                        >
                                            <FiList className="icon-list-header m-3" />
                                        </Button>
                                    </Link>
                                    <FiBell className="icon-bell-header m-3" />

                                    <Button
                                        variant="none"
                                        className="mx-1"
                                        href="/profile"
                                    >
                                        <FiUser className="icon-user-header m-3" />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="mx-3 "
                                        onClick={logout}
                                    >
                                        Logout
                                        <FiLogOut className="mx-1" />
                                    </Button>
                                    <Offcanvas show={show} onHide={handleClose} id="off-canvas">
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title className="title-navbar-mobile">Second Hand</Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>
                                            <Dropdown.Item href="#/action-1">Notifikasi</Dropdown.Item>
                                            <Dropdown.Item className="mt-2" href="#/action-1">Daftar Jual</Dropdown.Item>
                                            <Dropdown.Item className="mt-2" href="#/action-1">Akun Saya</Dropdown.Item>
                                            <Button
                                                variant="danger"
                                                className="mx-2 mt-5"
                                                onClick={logout}
                                            >
                                                Logout
                                            </Button>
                                        </Offcanvas.Body>
                                    </Offcanvas>
                                </>
                            )
                            }
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>
        </>
    );
}