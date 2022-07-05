import React from "react";
import { InfoSellerNavbar } from "./components/infoSeller/NavbarInfoSeller"
import { InfoSellerHome } from "./components/infoSeller/InfoSellerHome"
import "../css/style.css";


export default function Seller() {

    return (

            <div>
                <InfoSellerNavbar />
                <InfoSellerHome />
            </div>

    );
}
