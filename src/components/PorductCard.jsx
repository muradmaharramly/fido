import React, { useState, useEffect, useRef } from "react";
import { FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import { IoBan } from "react-icons/io5";
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";
import slugify from "slugify";

function ProductCard({ product }) {
    const { addItem, inCart } = useCart();
    const { addWishlistItem, removeWishlistItem, inWishlist } = useWishlist();
    const [rotation, setRotation] = useState({ x: 0, y: 0, shadowX: 0, shadowY: 0 });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageIntervalRef = useRef(null);

    const images = [product.image1, product.image2, product.image3].filter(Boolean);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

        const x = ((e.clientX - left) / width - 0.5) * 20;
        const y = ((e.clientY - top) / height - 0.5) * 20;

        const shadowX = (e.clientX - left - width / 2) / 10;
        const shadowY = (e.clientY - top - height / 2) / 10;

        setRotation({ x, y, shadowX, shadowY });
    };

    const handleMouseEnter = () => {
        if (images.length > 1) {
            let index = 0;
            imageIntervalRef.current = setInterval(() => {
                index = (index + 1) % images.length;
                setCurrentImageIndex(index);
            }, 1200); // her 1.2 saniyede geçiş
        }
    };

    const handleMouseLeave = () => {
        clearInterval(imageIntervalRef.current);
        setCurrentImageIndex(0);
        setRotation({ x: 0, y: 0, shadowX: 0, shadowY: 0 });
    };

    const [clickClass, setClickClass] = useState(() => {
        return localStorage.getItem(`clicked-${product.id}`) ? "clicked" : "";
    });

    const handleAddClick = () => {
        if (!inCart(product.id)) {
            addItem(product);
            setClickClass("clicked");
            localStorage.setItem(`clicked-${product.id}`, "clicked");
        }
    };

    useEffect(() => {
        const savedClickState = localStorage.getItem(`clicked-${product.id}`);
        if (savedClickState || inCart(product.id)) {
            setClickClass("clicked");
        }
    }, [product.id, inCart]);

    const [wishClass, setWishClass] = useState(() => {
        return inWishlist(product.id) ? "clicked" : "";
    });

    const handleWishClick = () => {
        if (inWishlist(product.id)) {
            removeWishlistItem(product.id);
            setWishClass("");
        } else {
            addWishlistItem(product);
            setWishClass("clicked");
        }
    };

    return (
        <div className={`product-card ${product.count === 0 ? "outofstock" : ""}`} onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                boxShadow: rotation.shadowX === 0 && rotation.shadowY === 0
                    ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                    : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(211, 2, 124, 0.315)`,
            }}>
            <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                <div className="img-div" onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                        boxShadow: rotation.shadowX === 0 && rotation.shadowY === 0
                            ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                            : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(211, 2, 124, 0.315)`,
                    }}>
                    {product.count === 0 &&
                        <div className="stock-overlay">
                            <IoBan />
                        </div>
                    }
                    <div className="fade-image-wrapper">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={product.title}
                                className={`fade-image ${index === currentImageIndex ? "active" : ""}`}
                            />
                        ))}
                    </div>
                    {product.discount > 0 && <p className="discount">{product.discount}%</p>}
                </div>
            </Link>
            <div className="details">
                <p className="rate"><FaStar />{product.rating}</p>
            </div>
            <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                <p className="product-title">
                    {product.title.length > 25
                        ? `${product.title.substring(0, 25)}...`
                        : product.title}
                </p>

            </Link>
            <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                <div className="pricing">
                    <div className="price">
                        {product.discount > 0 && <p className="old-price">{product.price}₼</p>}
                        <p className="current-price">
                            {(product.price - (product.price * product.discount) / 100).toFixed(2)}₼
                        </p>
                    </div>
                </div>
            </Link>
            <div className="card-ending">
                {
                    product.count === 0 ? (
                        <Link
                            to="#"
                            className="add-to-cart-btn disabled"
                            onClick={(e) => e.preventDefault()}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                                boxShadow:
                                    rotation.shadowX === 0 && rotation.shadowY === 0
                                        ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                        : `${-rotation.shadowX}px ${-rotation.shadowY}px 5px rgba(211, 2, 124, 0.315)`,
                            }}
                        >
                            <RiShoppingCart2Line />
                            <span>Stokda yoxdur</span>
                        </Link>
                    ) : inCart(product.id) ? (
                        <Link
                            to="/cart"
                            className="add-to-cart-btn clicked"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                                boxShadow:
                                    rotation.shadowX === 0 && rotation.shadowY === 0
                                        ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                        : `${-rotation.shadowX}px ${-rotation.shadowY}px 5px rgba(211, 2, 124, 0.315)`,
                            }}
                        >
                            <RiShoppingCart2Fill />
                            <span>Səbətə keç</span>
                        </Link>
                    ) : (
                        <Link
                            to="#"
                            className="add-to-cart-btn"
                            onClick={handleAddClick}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                                boxShadow:
                                    rotation.shadowX === 0 && rotation.shadowY === 0
                                        ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                        : `${-rotation.shadowX}px ${-rotation.shadowY}px 5px rgba(211, 2, 124, 0.315)`,
                            }}
                        >
                            <RiShoppingCart2Line />
                            <span className="desktop-text">Səbətə əlavə et</span>
                            <span className="mobile-text">Səbətə at</span>
                        </Link>
                    )}


                {
                    <Link
                        className={`add-to-wish-btn ${wishClass}`}
                        onClick={handleWishClick}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                            boxShadow:
                                rotation.shadowX === 0 && rotation.shadowY === 0
                                    ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                    : `${-rotation.shadowX}px ${-rotation.shadowY}px 5px rgba(211, 2, 124, 0.315)`,
                        }}
                    >
                        <FaRegHeart />
                    </Link>}


            </div>

            <div className="listed-details">
                <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                    <p className="product-title">{product.title}</p>
                </Link>
                <div className="details">
                    <p className="rate"><FaStar />{product.rating}</p>
                    {product.count === 0 &&
                        <p className="stock-info">Stokda yoxdur</p>
                    }
                </div>
            </div>
            <div className="listed-ending">
                <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                    <div className="pricing">
                        <div className="price">
                            {product.discount > 0 && <p className="old-price">{product.price}₼</p>}
                            <p className="current-price">
                                {(product.price - (product.price * product.discount) / 100).toFixed(2)}₼
                            </p>
                        </div>
                        <div className="divide">
                            <p className="term">6 ay</p>
                            <p>{((product.price - (product.price * product.discount) / 100) / 6).toFixed(2)}₼</p>
                        </div>
                    </div>
                </Link>
                <div className="card-ending">
                    {
                        product.count === 0 ? (
                            <Link
                                to="#"
                                className="add-to-cart-btn disabled"
                                onClick={(e) => e.preventDefault()}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                                    boxShadow:
                                        rotation.shadowX === 0 && rotation.shadowY === 0
                                            ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                            : `${-rotation.shadowX}px ${-rotation.shadowY}px 5px rgba(211, 2, 124, 0.315)`,
                                }}
                            >
                                <RiShoppingCart2Line />
                                <span>Stokda yoxdur</span>
                            </Link>
                        ) : inCart(product.id) ? (
                            <Link
                                to="/cart"
                                className="add-to-cart-btn clicked"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                                    boxShadow:
                                        rotation.shadowX === 0 && rotation.shadowY === 0
                                            ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                            : `${-rotation.shadowX}px ${-rotation.shadowY}px 5px rgba(211, 2, 124, 0.315)`,
                                }}
                            >
                                <RiShoppingCart2Fill />
                                <span>Səbətə keç</span>
                            </Link>
                        ) : (
                            <Link
                                to="#"
                                className="add-to-cart-btn"
                                onClick={handleAddClick}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                                    boxShadow:
                                        rotation.shadowX === 0 && rotation.shadowY === 0
                                            ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                            : `${-rotation.shadowX}px ${-rotation.shadowY}px 5px rgba(211, 2, 124, 0.315)`,
                                }}
                            >
                                <RiShoppingCart2Line />
                                <span className="desktop-text">Səbətə əlavə et</span>
                                <span className="mobile-text">Səbətə at</span>
                            </Link>
                        )
                    }


                    <Link
                        className={`add-to-wish-btn ${wishClass}`}
                        onClick={handleWishClick}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                            boxShadow:
                                rotation.shadowX === 0 && rotation.shadowY === 0
                                    ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                    : `${-rotation.shadowX}px ${-rotation.shadowY}px 5px rgba(211, 2, 124, 0.315)`,
                        }}
                    >
                        <FaRegHeart />
                    </Link>


                </div>

            </div>
        </div>
    );
}

export default ProductCard;
