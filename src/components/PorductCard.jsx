import React, { useState, useEffect, useRef } from "react";
import { FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import { IoBan } from "react-icons/io5";
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";
import slugify from "slugify";

function ProductCard({ product }) {
    const { addItem, inCart, items } = useCart();
    const { addWishlistItem, removeWishlistItem, inWishlist } = useWishlist();
    const [rotation, setRotation] = useState({ x: 0, y: 0, shadowX: 0, shadowY: 0 });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageIntervalRef = useRef(null);

    const images = [product.image1, product.image2, product.image3].filter(Boolean);

    const variants = product?.variants || [];
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const selectedVariant = variants[selectedVariantIndex] || {};

    const displayedPrice = (
        selectedVariant.price -
        (selectedVariant.price * (selectedVariant.discount || product.discount || 0)) / 100
    ).toFixed(2);

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
            }, 1200);
        }
    };

    const handleMouseLeave = () => {
        clearInterval(imageIntervalRef.current);
        setCurrentImageIndex(0);
        setRotation({ x: 0, y: 0, shadowX: 0, shadowY: 0 });
    };

    // 🛒 CARTA ƏLAVƏ ET
    const handleAddClick = () => {
        const variantId = `${product.id}-${selectedVariant.size}`;
        const exists = items.find(item => item.id === variantId);

        if (!exists) {
            addItem({
                ...product,
                id: variantId,
                selectedVariant,
                price: parseFloat(displayedPrice),
                size: selectedVariant.size,
                originalPrice: selectedVariant.price,
                discount: selectedVariant.discount || 0
            });
        }
    };

    // 💖 WISHLIST
    const handleWishClick = () => {
        const variantId = `${product.id}-${selectedVariant.size}`;
        const wishItem = {
            ...product,
            id: variantId,
            selectedVariant,
            price: parseFloat(displayedPrice),
            size: selectedVariant.size
        };

        if (inWishlist(variantId)) {
            removeWishlistItem(variantId);
        } else {
            addWishlistItem(wishItem);
        }
    };

    return (
        <div
            className={`product-card ${product.count === 0 ? "outofstock" : ""}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                boxShadow:
                    rotation.shadowX === 0 && rotation.shadowY === 0
                        ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                        : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(211, 2, 124, 0.315)`,
            }}
        >
            <Link to={`/products/${slugify(product.title, { lower: true })}`}>
                <div
                    className="img-div"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                        boxShadow:
                            rotation.shadowX === 0 && rotation.shadowY === 0
                                ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(211, 2, 124, 0.315)`,
                    }}
                >
                    {product.count === 0 && (
                        <div className="stock-overlay">
                            <IoBan />
                        </div>
                    )}
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
                    {selectedVariant.discount > 0 && (
                        <p className="discount">{selectedVariant.discount}%</p>
                    )}
                </div>
            </Link>


            <div className="details">
                <p className="rate"><FaStar />{product.rating}</p>
                <p className="code">{product.productCode}</p>
            </div>

            <Link className="title-inf" to={`/products/${slugify(product.title, { lower: true })}`}>
                <p className="product-title">
                    {product.title.length > 25 ? `${product.title.substring(0, 25)}...` : product.title}
                </p>
                <div className="variants-selection">
                    {variants.length > 0 && variants[0].size && (
                        <button
                            type="button"
                            className="variant active"
                            disabled={variants[0].stock === 0}
                        >
                            {variants[0].size} ml {variants[0].stock === 0 ? "(Stokda yoxdur)" : ""}
                        </button>
                    )}
                </div>

            </Link>

            <div className="pricing">
                <div className="price">
                    {selectedVariant.discount > 0 && (
                        <p className="old-price">{selectedVariant.price}₼</p>
                    )}
                    <p className="current-price">{displayedPrice}₼</p>
                </div>
            </div>

            <div className="card-ending">
                {product.count === 0 ? (
                    <Link className="add-to-cart-btn disabled" onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                            boxShadow:
                                rotation.shadowX === 0 && rotation.shadowY === 0
                                    ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                    : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(211, 2, 124, 0.315)`,
                        }}>
                        <RiShoppingCart2Line />
                        <span>Stokda yoxdur</span>
                    </Link>
                ) : inCart(`${product.id}-${selectedVariant.size}`) ? (
                    <Link to="/cart" className="add-to-cart-btn clicked" onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                            boxShadow:
                                rotation.shadowX === 0 && rotation.shadowY === 0
                                    ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                    : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(211, 2, 124, 0.315)`,
                        }}>
                        <RiShoppingCart2Fill />
                        <span>Səbətə keç</span>
                    </Link>
                ) : (
                    <Link className="add-to-cart-btn" onClick={handleAddClick} onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                            boxShadow:
                                rotation.shadowX === 0 && rotation.shadowY === 0
                                    ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                    : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(211, 2, 124, 0.315)`,
                        }}>
                        <RiShoppingCart2Line />
                        <span className="desktop-text">Səbətə əlavə et</span>
                        <span className="mobile-text">Səbətə at</span>
                    </Link>
                )}

                <Link
                    className={`add-to-wish-btn ${inWishlist(`${product.id}-${selectedVariant.size}`) ? "clicked" : ""}`}
                    onClick={handleWishClick}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                        boxShadow:
                            rotation.shadowX === 0 && rotation.shadowY === 0
                                ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(211, 2, 124, 0.315)`,
                    }}
                >
                    <FaRegHeart />
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;
