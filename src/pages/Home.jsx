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
