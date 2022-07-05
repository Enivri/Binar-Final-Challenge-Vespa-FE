import React from "react";
import { render } from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import UpdateProduct from "./pages/UpdateProduct";
import CreateProduct from "./pages/CreateProduct";
import Profile from "./pages/Profile";
import Seller from "./pages/Seller";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = document.getElementById("root");
render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/previewproduk" element={<ProductPage />} />
        <Route path="/updateproduk" element={<UpdateProduct />} />
        <Route path="/buatproduk" element={<CreateProduct />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/infoSeller" element={<Seller />} />
      </Routes>
    </Router>
  </Provider>,
  root
)