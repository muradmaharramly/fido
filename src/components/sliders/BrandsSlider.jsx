import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const brands = [
    { "id": 1, "name": "Tognana", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Ftognana.jpg&w=1920&q=75" },
    { "id": 2, "name": "Samsung", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FSamsung.jpg&w=1920&q=75" },
    { "id": 3, "name": "Apple", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fappleourtrust.png&w=1920&q=75" },
    { "id": 4, "name": "Divanev", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fdivanev.jpg&w=1920&q=75" },
    { "id": 5, "name": "Koopman International", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Flogo_b9z7ZVM.jpg&w=1920&q=75" },
    { "id": 6, "name": "HP", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FHP.jpg&w=1920&q=75" },
    { "id": 7, "name": "Cotton Box", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fcottonbox.jpg&w=1920&q=75" },
    { "id": 8, "name": "Xiaomi", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FXIAOMI.png&w=1920&q=75" },
    { "id": 9, "name": "Bosch", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fbosch.jpg&w=1920&q=75" },
    { "id": 10, "name": "Liqui Moly", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FLiqui_Moly.png&w=1920&q=75" },
    { "id": 11, "name": "Tefal", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Ftefal_nQ6dUE6.png&w=1920&q=75" },
    { "id": 12, "name": "Philips", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FPhilips.png&w=1920&q=75" },
    { "id": 13, "name": "NEVA", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Forig.jpg&w=1920&q=75" },
    { "id": 14, "name": "LG", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FLG.jpg&w=1920&q=75" },
    { "id": 15, "name": "Asus", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fasus.jpg&w=1920&q=75" },
    { "id": 16, "name": "WMF", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fwmf.jpg&w=1920&q=75" },
    { "id": 17, "name": "Panasonic", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FPanasonic_pXuIRVB.png&w=1920&q=75"},
    { "id": 18, "name": "Chicco", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fchicco.jpg&w=1920&q=75" },
    { "id": 19, "name": "Istanbul home collection", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Flogo_NA8S1kA.jpg&w=1920&q=75"},
    { "id": 20, "name": "Braun", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FBRAUN.png&w=1920&q=75" },
    { "id": 21, "name": "Joyroom", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FJoyroom.jpg&w=1920&q=75" },
    { "id": 22, "name": "Lenovo", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Flenovo.png&w=1920&q=75" },
    { "id": 23, "name": "Huawei", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FHUAWEI.jpg&w=1920&q=75" },
    { "id": 24, "name": "Zwiling", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FZwilling.jpeg&w=1920&q=75"},
    { "id": 25, "name": "Sony", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FSony.jpg&w=1920&q=75" },
    { "id": 26, "name": "Haier", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FHAIER.jpg&w=1920&q=75"},
    { "id": 27, "name": "Logitech", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FLOGITECH.png&w=1920&q=75" },
    { "id": 28, "name": "Nuovacer", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FNuovacer-Logo-2020.jpg&w=1920&q=75" },
    { "id": 29, "name": "Fakir", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FFakir-Logo.jpg&w=1920&q=75" },
    { "id": 30, "name": "Midea", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2Fmidea.jpg&w=1920&q=75" },
    { "id": 31, "name": "Gorenje", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FGorenje.jpg&w=1920&q=75" },
    { "id": 32, "name": "Trust", "logo": "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2Fbrand%2Ficons%2FTrust.png&w=1920&q=75" }
];

function BrandsSlider() {
    const [popup, setPopup] = useState(null);

    const openPopup = (video) => {
        setPopup(video);
    };

    const closePopup = () => {
        setPopup(null);
    };

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    };

    return (
        <div className="brands roll-area">
            <div className="slider-container">
                <Slider {...settings}>
                    {brands.map((brand, index) => (
                        <div className="slide" key={index}>
                            <div className="img-div">
                                <img src={brand.logo} alt={brand.title} />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default BrandsSlider;
