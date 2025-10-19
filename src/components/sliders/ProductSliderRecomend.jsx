import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductCard from "../PorductCard";
import { useCart } from "react-use-cart";

function NextArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow next`}
            onClick={onClick}
        >
            <IoIosArrowForward />
        </div>
    );
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow prev`}
            onClick={onClick}
        >
            <IoIosArrowBack />
        </div>
    );
}

function ProductSliderRecomend({ products }) {
    const { items } = useCart();

    const filteredSliderProducts = products.filter(
        (item) => !items.find((cartItem) => cartItem.id === item.id)
    );

    const settings = {
        dots: false,
        infinite: filteredSliderProducts.length > 4,
        slidesToShow: 4,
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
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div>
            {filteredSliderProducts.length > 0 && (
                <div className="also-like-con">
                    <div className="area-head">
                        <p>Oxşar məhsullar</p>
                        <h3>Bunları da bəyənəcəksən!</h3>
                    </div>
                    <div className="slider-container">
                        <Slider {...settings}>
                            {filteredSliderProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </Slider>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductSliderRecomend;
