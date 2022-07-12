import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../slices/userSlice";
import { addSearch } from "../../../slices/searchingSlice";
import { Card, Button } from "react-bootstrap";
import { FiBox, FiHeart, FiDollarSign, FiChevronRight } from "react-icons/fi";
import UserImage from "../../../images/Rectangle-33.png";
import "./Sidebar.css"

export function SidebarCategory() {
  return (
    <>
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
    </>
  );
}

export function SidebarUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const [data, setData] = useState({});

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
      setUser(dataUsers)
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

        const currentUserResponse = currentUserRequest.data;

        if (currentUserResponse.status) {
          dispatch(
            addUser({
              user: currentUserResponse.data.user,
              token: token,
            })
          );
          setData(currentUserResponse.data.user);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    fetchData();
    getUsers();
  }, []);






  const buttonStyle = {
    border: "1px solid rgba(113, 38, 181, 1)",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: "8px",
  };

  return (
    <>
      <div className="navigasi-user">
        <Card className="p-3">
          <div className="d-flex gap-3">
            <Card.Img src={`http://localhost:2000/public/files/${user.picture}`} style={{ width: "7%" }} />
            <div>
              <Card.Text style={{ width: "100%" }} className="mb-0 fw-bold ">{user.name}</Card.Text>
              <Card.Text style={{ width: "100%" }} className="usertown">{user.town}</Card.Text>
            </div>
            <div className="ms-auto">
              <Button
                className="text-black Buttonedit ms-auto"
                style={buttonStyle}
                href="/profile"
              >
                Edit
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}