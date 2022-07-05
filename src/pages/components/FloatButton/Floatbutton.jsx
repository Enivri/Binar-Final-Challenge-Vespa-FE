import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import "../FloatButton/floatbutton.css"

export function FloatButton() {

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [data, setData] = useState({});
    const navigate = useNavigate();


    const colourButton = {
        backgroundColor: '#7126B5',
        borderRadius: '5px',
    };

    const handleJual = () => {
        isLoggedIn ? data.town ? navigate('/buatproduk') : navigate(`/profile`) : navigate('/login')
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
            console.log(err);
        }
    }


    useEffect(() => {
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

                const currentUserResponse = currentUserRequest.data.data;

                if (currentUserResponse.status) {
                    setData(currentUserResponse.data.user);
                }
            } catch (err) {
                setIsLoggedIn(false);
            }
        };
        validateLogin();
        getUsers();
    }, []);

    return (
        <Button onClick={handleJual} style={colourButton} className="ms-auto pe-4 radius-secondary floating-button bg-color-tertiary border-0">
            <FiPlus className="mx-2 mb-1" />
            Jual
        </Button>
    );

}