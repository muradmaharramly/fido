import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductCard from "../PorductCard";

function NextArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={`${className} custom-arrow next`} onClick={onClick}>
            <IoIosArrowForward />
        </div>
    );
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={`${className} custom-arrow prev`} onClick={onClick}>
            <IoIosArrowBack />
        </div>
    );
}

function ProductSliderMain({ currentProduct }) {
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        if (!currentProduct) return;

        let viewedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];

        viewedProducts = viewedProducts.filter(p => p.id !== currentProduct.id);
        viewedProducts.unshift({
            ...currentProduct,
            selectedVariantIndex: 0 
        });

        if (viewedProducts.length > 10) viewedProducts = viewedProducts.slice(0, 10);

        localStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));
        setRecentProducts(viewedProducts);
    }, [currentProduct]);

    const settings = {
        dots: false,
        infinite: recentProducts.length > 4,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 576, settings: { slidesToShow: 2 } },
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    // Variant və ya əsas qiymətə uyğun qiyməti qaytaran funksiya
    const getDisplayPrice = (product) => {
        const selectedVariant = product.variants?.[product.selectedVariantIndex] ?? null;
        const price = Number(selectedVariant?.price ?? product.price ?? 0);
        const discount = Number(selectedVariant?.discount ?? product.discount ?? 0);
        return (price - (price * discount) / 100).toFixed(2);
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
                            {recentProducts.map(product => (
                                <div key={product.id}>
                                    <ProductCard
                                        product={product}
                                        displayPrice={getDisplayPrice(product)}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductSliderMain;
