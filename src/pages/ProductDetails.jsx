import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProducts } from "../tools/request/fetchProducts";
import slugify from "slugify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiArrowRightDoubleFill, RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { FaArrowLeft, FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import PreLoader from "../components/PreLoader";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";
import { IoBan, IoShareSocialOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FiMinus, FiPhoneCall, FiPlus } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { BiCommentDetail } from "react-icons/bi";
import ProductSliderMain from "../components/sliders/ProductSliderMain";
import ProductSliderSpesific from "../components/sliders/ProductSliderSpesific";
import { useSelector } from "react-redux";

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

function ProductDetails() {
    const { slug } = useParams();
    const { products, loading } = useSelector((state) => state.products);
    const [product, setProduct] = useState(null);
    const [months, setMonths] = useState(3);
    const [initialPayment, setInitialPayment] = useState(0);
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);


    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products.length]);

    useEffect(() => {
        if (products.length > 0) {
            const foundProduct = products.find(
                (p) => slugify(p.title, { lower: true }) === slug
            );
            setProduct(foundProduct || null);
        }
    }, [slug, products]);

    const { addItem, inCart } = useCart();
    const { addWishlistItem, removeWishlistItem, inWishlist } = useWishlist();

    if (loading) return <PreLoader />;
    if (!product) return <p>Məhsul tapılmadı!</p>;

    const handleAddClick = () => {
        if (!inCart(product.id)) {
            addItem(product);
        }
    };

    const handleWishClick = () => {
        if (inWishlist(product.id)) {
            removeWishlistItem(product.id);
        } else {
            addWishlistItem(product);
        }
    };

    const images = [product.image1, product.image2, product.image3].filter(Boolean);

    const settings = {
        customPaging: function (i) {
            return (
                <div className="slick-thumbnail-container">
                    <img
                        src={images[i]}
                        alt={`thumbnail-${i}`}
                        className="slick-thumbnail"
                    />
                </div>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };


    const productPrice = product.price || 0;
    const discountPrice = productPrice - (productPrice * (product.discount || 0)) / 100;
    const remainingAmount = discountPrice - initialPayment;
    const monthlyPayment = remainingAmount / months;
    const totalPrice = initialPayment + months * monthlyPayment;

    return (
        <div className={`product-details-container ${product.count === 0 ? "outofstock" : ""}`}>
            <div className="breadcrumb">
                <Link to="/">Ana səhifə</Link>
                <RiArrowRightDoubleFill />
                <span>{product.title}</span>
            </div>
            <div className="product-details">
                <h3 className="mobile-back"><button onClick={() => window.history.back()}><FaArrowLeft /></button>{product.title.substring(0, 30)}...</h3>
                <div className="product-images">
                    <Slider {...settings} className="main-slider">
                        {Object.keys(product)
                            .filter((key) => key.startsWith("image"))
                            .map((key, index) => (
                                <div key={index} className="main-image">
                                    {product.count === 0 && (
                                        <div className="stock-overlay">
                                            <IoBan />
                                            <h5>Stokda yoxdur</h5>
                                        </div>
                                    )}
                                    <img src={product[key]} alt={`slide-${index}`} />
                                </div>
                            ))}
                    </Slider>

                    {product.discount > 0 && <p className="discount">{product.discount}%</p>}
                </div>
                <div className="product-info">
                    <div className="details">
                        <p className="rate">
                            <FaStar /> {product.rating}
                        </p>
                    </div>
                    <h1>{product.title}</h1>
                    <p className="product-code">Məhsul kodu: <strong>{product.productCode}</strong></p>
                    <div className="price">
                        {product.discount > 0 && <p className="old-price">{product.price}₼</p>}
                        <p className="current-price">{discountPrice.toFixed(2)}₼</p>
                    </div>
                    <div className="btns-div">
                        {product.count === 0 ? (
                            <Link
                                to="#"
                                className="add-to-cart-btn disabled"
                                onClick={(e) => e.preventDefault()}
                            >
                                <RiShoppingCart2Line />
                                <span>Stokda yoxdur</span>
                            </Link>
                        ) : inCart(product.id) ? (
                            <Link
                                to="/cart"
                                className="add-to-cart-btn clicked"
                            >
                                <RiShoppingCart2Fill />
                                <span>Səbətə keç</span>
                            </Link>
                        ) : (
                            <Link
                                to="#"
                                className="add-to-cart-btn"
                                onClick={handleAddClick}
                            >
                                <RiShoppingCart2Line />
                                <span>Səbətə əlavə et</span>
                            </Link>
                        )}

                        <Link className={`heart-btn ${inWishlist(product.id) ? "clicked" : ""}`} onClick={handleWishClick}>
                            <FaRegHeart />
                        </Link>
                    </div>

                    {product.count && (
                        <div className="buy-together">
                            <p>Məhsulun yanında al</p>
                            {products.filter(item => item.id !== product.id && item.category == product.category && item.price < product.price).slice(0, 3).map((buyTogether) => (
                                <div className="item" key={buyTogether.id}>
                                    <div className="con">
                                        <div className="img-div">
                                            <img src={buyTogether.image1} />
                                        </div>
                                        <div className="item-info">
                                            <p>{buyTogether.title.substring(0, 80)}...</p>
                                            <div className="price-info">
                                                <h3>{(buyTogether.price - (buyTogether.price * buyTogether.discount) / 100).toFixed(2)}₼</h3>
                                            </div>
                                        </div>
                                    </div>
                                    {inCart(buyTogether.id) ? (
                                        <Link className="add clicked"><span className="tick"><MdDone /></span><span>Əlavə edilib</span></Link>
                                    ) : (
                                        <Link className="add" onClick={() => {
                                            if (!inCart(buyTogether.id)) {
                                                addItem(buyTogether);
                                            }
                                        }}><FiPlus /> <span>Birlikdə al</span></Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="features-container">
                        <p className="container-info">Məlumat</p>
                        <div className="features-box" onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}>
                            <div className="box-items">
                                <div className="icon">
                                    <LuClipboardList />
                                </div>
                                <div className="content">
                                    <h3>Xüsusiyyətlər</h3>
                                    <p>{isFeaturesOpen ? "Kiçiltmək üçün kliklə" : "Baxmaq üçün kliklə"}</p>
                                </div>
                                <button className="toggle-btn" onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}>
                                    {isFeaturesOpen ? <FiMinus /> : <FiPlus />}
                                </button>
                            </div>
                            {isFeaturesOpen && (
                                <ul className="features-list">
                                    <li><span>Kateqoriya</span><span>{product.category}</span></li>
                                    {product.gender && (
                                        <li>
                                            <span>Cins</span>
                                            <span>
                                                {product.gender === "male"
                                                    ? "Kişi üçün"
                                                    : product.gender === "female"
                                                        ? "Qadın üçün"
                                                        : "Unisex"}
                                            </span>
                                        </li>
                                    )}
                                    {product.composition &&
                                        (product.category === "Aksesuar" || product.category === "Parfum") && (
                                            <li>
                                                <span>
                                                    {product.category === "Aksesuar" ? "Material" : "Tərkib"}
                                                </span>
                                                <span>{product.composition}</span>
                                            </li>
                                        )}
                                    <li><span>Qablaşdırma</span><span>{product.packaging ? "Var" : "Yoxdur"}</span></li>
                                    <li><span>Məhsul kodu</span><span>{product.productCode}</span></li>
                                    <li><span>Stok</span><span>{product.count} ədəd</span></li>
                                </ul>
                            )}
                        </div>


                    </div>
                </div>
            </div>
            <ProductSliderSpesific products={products} product={product} />

            <ProductSliderMain currentProduct={product} />

        </div>
    );
}

export default ProductDetails;
