import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductCard from "../PorductCard";

function NextArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow next`}
            onClick={onClick}
        ><IoIosArrowForward /></div>
    );
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow prev`}
            onClick={onClick}
        ><IoIosArrowBack /></div>
    );
}

function ProductSliderMain({ currentProduct }) {
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        if (currentProduct) {
            let viewedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];

            viewedProducts = viewedProducts.filter((p) => p.id !== currentProduct.id);
            viewedProducts.unshift({ id: currentProduct.id, title: currentProduct.title, image: currentProduct.image, price: currentProduct.price, discount: currentProduct.discount, rating: currentProduct.rating, reviewCount: currentProduct.reviewCount, category: currentProduct.category, productCode: currentProduct.productCode, count: currentProduct.count });

            if (viewedProducts.length > 10) {
                viewedProducts.pop();
            }

            localStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));

            setRecentProducts(viewedProducts);
        }
    }, [currentProduct]);

    const settings = {
        dots: false,
        infinite: true,
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
        prevArrow: <PrevArrow />
    };

    return (
        <div>
        {recentProducts.length > 1 && (
        <div className="also-like-con">
            <div className="area-head">
                <p>Ən son baxdıqlarınız</p>
                <h3>Bu məhsullara yenidən göz at!</h3>
            </div>
            <div className="slider-container">
                <Slider {...settings}>
                    {recentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Slider>
            </div>
        </div>
        )}
        </div>
    );
}

export default ProductSliderMain;