import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import { RiArrowRightDoubleFill, RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import slugify from "slugify";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";
import { IoBan } from "react-icons/io5";
import { CgDanger } from "react-icons/cg";

const Wishlist = () => {
    const { isWishlistEmpty, items, removeWishlistItem } = useWishlist();
    const { addItem, inCart } = useCart();

    const [clickClass, setClickClass] = useState({});
    const [rotation, setRotation] = useState({ x: 0, y: 0, shadowX: 0, shadowY: 0 });

    const [currentImageIndexes, setCurrentImageIndexes] = useState({});
    const imageIntervalRefs = useRef({});

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 20;
        const y = ((e.clientY - top) / height - 0.5) * 20;
        const shadowX = (e.clientX - left - width / 2) / 10;
        const shadowY = (e.clientY - top - height / 2) / 10;
        setRotation({ x, y, shadowX, shadowY });
    };

    const handleMouseEnter = (itemId, images) => {
        if (images.length > 1) {
            let index = 0;
            imageIntervalRefs.current[itemId] = setInterval(() => {
                index = (index + 1) % images.length;
                setCurrentImageIndexes((prev) => ({
                    ...prev,
                    [itemId]: index,
                }));
            }, 1200);
        }
    };

    const handleMouseLeave = (itemId) => {
        clearInterval(imageIntervalRefs.current[itemId]);
        setCurrentImageIndexes((prev) => ({
            ...prev,
            [itemId]: 0,
        }));
        setRotation({ x: 0, y: 0, shadowX: 0, shadowY: 0 });
    };

    useEffect(() => {
        const storedClickStates = {};
        items.forEach((item) => {
            storedClickStates[item.id] = localStorage.getItem(`clicked-${item.id}`) || "";
        });
        setClickClass(storedClickStates);
    }, [items]);

    const handleAddClick = (item) => {
        addItem(item);
        setClickClass((prev) => ({
            ...prev,
            [item.id]: "clicked",
        }));
        localStorage.setItem(`clicked-${item.id}`, "clicked");
    };

    const handleRemoveWishlistItem = (itemId) => {
        removeWishlistItem(itemId);
        localStorage.removeItem(`clicked-${itemId}`);
        setClickClass((prev) => {
            const newState = { ...prev };
            delete newState[itemId];
            return newState;
        });
    };

    if (isWishlistEmpty) {
        return (
            <div className="wishlist-empty">
                <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Sevimlilərim</span></div>
                <div className="empty-icon"><CgDanger /></div>
                <p>Sizin hal-hazırda sevimliləriniz yoxdur.</p>
                <span className="desc">Məhsullara baxmaq üçün ana səhifəyə keçid edə bilərsiniz.</span>
                <Link to="/" className="back-home">Ana səhifə</Link>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Sevimlilərim</span></div>
            <h2>Sevimlilərim</h2>
            <div className="wishlist-container">
                {items.map((item) => {
                    const images = [item.image1, item.image2, item.image3].filter(Boolean);
                    const currentIndex = currentImageIndexes[item.id] || 0;

                    return (
                        <div key={item.id} className={`product-card ${item.count === 0 ? "outofstock" : ""}`}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => handleMouseLeave(item.id)}
                            onMouseEnter={() => handleMouseEnter(item.id, images)}
                            style={{
                                transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                                boxShadow: rotation.shadowX === 0 && rotation.shadowY === 0
                                    ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                    : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(211, 2, 124, 0.315)`,
                            }}>
                            <Link to={`/products/${slugify(item.title, { lower: true })}`}>
                                <div className="img-div" style={{
                                    transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                                    boxShadow: rotation.shadowX === 0 && rotation.shadowY === 0
                                        ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                        : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(211, 2, 124, 0.315)`,
                                }}>
                                    {item.count === 0 &&
                                        <div className="stock-overlay"><IoBan /></div>
                                    }
                                    <div className="fade-image-wrapper">
                                        {images.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={item.title}
                                                className={`fade-image ${index === currentIndex ? "active" : ""}`}
                                            />
                                        ))}
                                    </div>
                                    {item.discount > 0 && <p className="discount">{item.discount}%</p>}
                                </div>
                            </Link>

                            <div className="details">
                                <p className="rate"><FaStar />{item.rating}</p>
                                {item.count === 0 && <p className="stock-info">Stokda yoxdur</p>}
                            </div>

                            <Link to={`/products/${slugify(item.title, { lower: true })}`}>
                                <p className="product-title">
                                    {item.title.length > 25
                                        ? `${item.title.substring(0, 25)}...`
                                        : item.title}
                                </p>

                            </Link>

                            <Link to={`/products/${slugify(item.title, { lower: true })}`}>
                                <div className="pricing">
                                    <div className="price">
                                        {item.discount > 0 && <p className="old-price">{item.price}₼</p>}
                                        <p className="current-price">
                                            {(item.price - (item.price * item.discount) / 100).toFixed(2)}₼
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <div className="card-ending">
                                {item.count === 0 ? (
                                    <Link to="#" className="add-to-cart-btn disabled" onClick={(e) => e.preventDefault()}>
                                        <RiShoppingCart2Line /><span>Stokda yoxdur</span>
                                    </Link>
                                ) : inCart(item.id) ? (
                                    <Link to="/cart" className="add-to-cart-btn clicked">
                                        <RiShoppingCart2Fill /><span>Səbətə keç</span>
                                    </Link>
                                ) : (
                                    <Link to="#" className={`add-to-cart-btn ${clickClass[item.id] || ""}`} onClick={() => handleAddClick(item)}>
                                        <RiShoppingCart2Line />
                                        <span className="desktop-text">Səbətə əlavə et</span>
                                        <span className="mobile-text">Səbətə at</span>
                                    </Link>
                                )}
                                <Link className="add-to-wish-btn clicked" onClick={() => handleRemoveWishlistItem(item.id)}>
                                    <FaRegHeart />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Wishlist;
