import React from "react";
<<<<<<< Updated upstream
import { HomeNav2 } from "./components/Navbar/Navbar"
import "../css/style.css";

function Home() {
 
    return  (

        <div>
            <HomeNav2 />
        </div>

    
    );
}
export default Home;
=======
import { HomeNavbar } from "./components/Navbar/Navbar"
import { Carousel } from "./components/Carousel/Carousel"
import { FloatButton } from "./components/FloatButton/Floatbutton"
import "../css/style.css";
export default function Home() {

    return (

            <div>
                <HomeNavbar />
                <Carousel />
                <FloatButton />
            </div>

    );
}
>>>>>>> Stashed changes
