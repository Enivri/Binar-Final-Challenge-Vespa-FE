import "../css/main.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, Button, Dropdown, DropdownButton, Offcanvas } from "react-bootstrap";
import { FiLogIn, FiList, FiUser, FiBell } from "react-icons/fi";
import { addUser } from "../slices/userSlice";
import axios from "axios";
import Swal from "sweetalert2";
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';


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


export default function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const [open, setOpen] = React.useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check status user login
                // 1. Get token from localStorage
                const token = localStorage.getItem("token");

                // 2. Check token validity from API
                const currentUserRequest = await axios.get(
                    "http://localhost:8888/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentUserResponse = currentUserRequest.data;

                if (currentUserResponse.status) {
                    dispatch(
                        addUser({
                            user: currentUserResponse.data.user,
                            token: token,
                        })
                    );
                    setUser(currentUserResponse.data.user);
                }
            } catch (err) {
                setIsLoggedIn(false);
            }
        };

        fetchData();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");

        setIsLoggedIn(false);
        setUser({});

        navigate("/");
    };

    const alertLogout = async () => {
        Swal.fire({
            title: "Apakah Anda Yakin?",
            text: "Anda akan keluar dari akun ini",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Log out",
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'LOGOUT!',
                    'Anda telah keluar dari akun ini.',
                    'success'
                )
                logout();
            } else if (result.dismiss == 'cancel') {
                console.log('cancel');
            }
        });
    };


    return (
        <>
            <Navbar expand="lg" variant="light" >
                <Container className="home-navbar" >
                    <Navbar.Brand className="logo" href="/cars"></Navbar.Brand>
                    <div className="me-auto">
                        <Search>
                            <SearchIcon className="search-icon" />
                            <StyledInputBase
                                placeholder="Cari di sini …"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </div>
                    <div>
                        <Navbar.Toggle onClick={handleShow} aria-controls="off-canvas" />
                        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                            {!isLoggedIn ? (
                                <Navbar.Offcanvas show={show} onHide={handleClose} id="off-canvas">
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title className="title-navbar-mobile">Second Hand</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Button variant="success" className="button-register" href="/register">
                                            <FiLogIn className="icon-register" />
                                            Masuk
                                        </Button>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>

                            ) : (
                                <>
                                    <FiList className="icon-list-header m-3" />
                                    <FiBell className="icon-bell-header m-3" />
                                    <Dropdown >
                                        <Dropdown.Toggle variant="white" id="dropdown-basic">
                                            <FiUser className="icon-user-header" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item className="mt-2" href="#/action-1" >Ubah Akun</Dropdown.Item>
                                            <Dropdown.Item className="mt-2" href="#/action-1" >Pengaturan Akun</Dropdown.Item>
                                            {/* <Nav.Link className="m-2">{user.name}</Nav.Link> */}
                                            <Button
                                                variant="danger"
                                                className="mx-3 mt-3"
                                                onClick={alertLogout}
                                            >
                                                Logout
                                            </Button>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Offcanvas show={show} onHide={handleClose} id="off-canvas">
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title className="title-navbar-mobile">Second Hand</Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>
                                            <Dropdown.Item href="#/action-1">Notifikasi</Dropdown.Item>
                                            <Dropdown.Item className="mt-2" href="#/action-1">Daftar Jual</Dropdown.Item>
                                            <Dropdown.Item className="mt-2" href="#/action-1">Akun Saya</Dropdown.Item>
                                        </Offcanvas.Body>
                                    </Offcanvas>


                                    {/* for notification */}
                                    {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                    <Badge badgeContent={14} color="error">
                                        <FiBell className="icon-bell-header mx-3" />
                                    </Badge>
                                    </IconButton> */}


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


