import React from "react";
import { Card, Button } from "react-bootstrap";
import UserImage from "../../../images/Rectangle-33.png";
import "./sidebar.css";



export function SidebarUser() {
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
            <Card.Img src={UserImage} style={{ width: "5%" }} />
            <div>
              <Card.Text className="mb-0 fw-bold">Nama Penjual</Card.Text>
              <Card.Text>Kota</Card.Text>
            </div>
            <Button
              size="sm"
              className="ms-auto align-self-center text-black px-3 fw-400"
              style={buttonStyle}
            >
              Edit
            </Button>
          </div>
          <div></div>
        </Card>
      </div>
    </>
  );
}