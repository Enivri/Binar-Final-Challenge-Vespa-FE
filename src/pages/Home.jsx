import React from "react";
import { HomeNavbar } from "./components/Navbar/Navbar"
import { Carousel } from "./components/Carousel/Carousel"
import { FloatButton } from "./components/FloatButton/Floatbutton"
import { Product } from "./components/Product/Product"
import "../css/style.css";


export default function Home() {

    return (

            <div>
                <HomeNavbar />
                <Carousel />
                <Product />
                <FloatButton />
            </div>

    );
}
