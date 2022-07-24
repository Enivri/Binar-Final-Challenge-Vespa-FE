import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../../slices/userSlice";
import { addSearch } from "../../../slices/searchingSlice";
import { Navbar, Container, Button, Dropdown, Offcanvas, Stack, Popover, Row, OverlayTrigger } from "react-bootstrap";
import { FiLogIn, FiList, FiBell, FiUser, FiLogOut } from "react-icons/fi";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import dateFormat from "dateformat";
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
    const [notif, setNotif] = useState([]);
    const [notifStatus, setNotifStatus] = useState([]);
    const [open, setOpen] = React.useState(true);
    const [show, setShow] = useState(false);
    const [searching, setSearching] = useState("");
    console.log(user.id)
    console.log(data.id)
    console.log(notif)


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
            const responseUsers = await axios.get(`https://binar-final-challenge-vespa-be.herokuapp.com/v1/users`,
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
                    "https://binar-final-challenge-vespa-be.herokuapp.com/v1/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(currentUserRequest)

                const currentUserResponse = currentUserRequest.data;

                console.log(currentUserResponse.status)

                if (currentUserResponse.status) {
                    dispatch(
                        addUser({
                            user: currentUserResponse.data,
                            token: token,
                        })
                    );
                    localStorage.setItem("user", JSON.stringify(currentUserResponse.data))
                    setUser(currentUserResponse.data);
                }
                console.log(addUser)
                console.log(setUser)
            } catch (err) {
                setIsLoggedIn(false);
            }
        };
        handleSearch();
        fetchData();
        getUsers();
    }, [searching]);

    useEffect(() => {
        const notifikasi = async () => {
            try {
                const token = localStorage.getItem("token");
                const user_local = localStorage.getItem("user");
                const user = JSON.parse(user_local);

                const notifRequest = await axios.get(`https://binar-final-challenge-vespa-be.herokuapp.com/v1/transaction/notif/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                console.log(notifRequest);

                const notifResponse = await notifRequest.data.data.posts;
                console.log(notifResponse);
                setNotif(notifResponse);

                const notifResponseStatus = await notifRequest.data.message;
                console.log(notifResponseStatus);
                setNotifStatus(notifResponseStatus);


            } catch (err) {
                console.log(err);
            }
        }

        notifikasi();
    }, [])


    const logout = () => {
        localStorage.removeItem("token");

        setIsLoggedIn(false);
        setUser({});
        navigate("/");
    };


    const popoverNotif = (
        <Popover id="popover-basic" className="box-shadow radius-primary" style={{ maxWidth: "376px" }}>
            <Popover.Header className="radius-primary bg-white border-0 overflow-auto  " style={{ height: "400px" }}>
                {notif.map((notif) =>
                    data.id === notif.owner_id || notif.product.sold ? (
                        <Row className="mb-0">
                            <Link className="text-decoration-none text-black" to={`/infopenawar/${notif.id}`}>
                                <Stack direction="horizontal" gap={3}>
                                    <img src={`${notif.product.picture}`} alt=""
                                        style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "12px" }} />
                                    <Stack>
                                        <p className="m-0 text-black-50 fs-8">
                                            {user.id === notif.owner_id && notif.product.sold ?
                                                "Berhasil Terjual" : user.id === notif.user_id && notif.product.sold ?
                                                    "Berhasil Ditawar" : notif.accepted === "reject" ?
                                                        "Penawaran ditolak" : "Penawaran Produk"}
                                        </p>
                                        <p className="m-0 text-black">{notif.product.name}</p>
                                        <p className={data.id === notif.data_id && notif.product.sold ? "m-0 text-black text-decoration-line-through" : "m-0 text-black"}>
                                            {(notif.product.price)}
                                        </p>
                                        <p className="m-0 text-black">{data.id === notif.owner_id ? "ditawar " : "Berhasil Menawar "}
                                            {(notif.requestedPrice)}
                                        </p>
                                        <p className="m-0 text-black-50 fs-8">
                                            {data.id === notif.user_id && notif.product.sold === true ?
                                                "Kamu akan segera dihubungi penjual via whatsapp" : ""}
                                        </p>
                                    </Stack>
                                    <Stack>
                                        <p className="m-0 ms-auto text-black-50 fs-8">{dateFormat(notif.createdAt, "d mmm, h:MM")}</p>
                                    </Stack>
                                </Stack>
                            </Link>
                            <hr />
                        </Row>
                    ) : ("")).reverse()
                }
            </Popover.Header>
        </Popover>
    );


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
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={popoverNotif} >
                                        <Button variant="light"> <FiBell className=" mb-1" />  </Button>
                                    </OverlayTrigger>

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
                                            <Dropdown.Item href="#">Notifikasi</Dropdown.Item>
                                            <Dropdown.Item className="mt-2" href={`/dashboardseller/${data.id}`}>Daftar Jual</Dropdown.Item>
                                            <Dropdown.Item className="mt-2" href="/profile">Akun Saya</Dropdown.Item>
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