import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./carousel.css";
import PICT1 from '../../../images/img-banner.png';

export function Carousel() {

    return (
        <>
            <OwlCarousel items={1}
                className="owl-theme mt-5"
                center
                autoplay={true}
                stagePadding={200}
                loop={true}
                margin={5}
                lazyLoad={true}
                dots={false} >

                <div className="item">
                    <div className="">
                        <img src={PICT1} className="radius-large" alt="Foto produk" />
                    </div>
                </div>
                <div className="item">
                    <div className="">
                        <img src={PICT1} className="radius-large" alt="Foto produk" />
                    </div>
                </div>
                <div className="item">
                    <div className="">
                        <img src={PICT1} className="radius-large" alt="Foto produk" />
                    </div>
                </div>

            </OwlCarousel>
        </>
    );
}