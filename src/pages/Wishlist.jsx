import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCommentDots, FaRegHeart, FaStar } from "react-icons/fa6";
import { RiArrowRightDoubleFill, RiScalesFill, RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
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

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

        const x = ((e.clientX - left) / width - 0.5) * 20;
        const y = ((e.clientY - top) / height - 0.5) * 20;

        const shadowX = (e.clientX - left - width / 2) / 10;
        const shadowY = (e.clientY - top - height / 2) / 10;

        setRotation({ x, y, shadowX, shadowY });
    };

    const handleMouseLeave = () => {
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
                {items.map((item) => (
                    <div key={item.id} className={`product-card ${item.count === 0 ? "outofstock" : ""}`} onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                            boxShadow: rotation.shadowX === 0 && rotation.shadowY === 0
                                ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(211, 2, 124, 0.315)`,
                        }}>
                        <Link to={`/products/${slugify(item.title, { lower: true })}`}>
                            <div className="img-div" onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                                    boxShadow: rotation.shadowX === 0 && rotation.shadowY === 0
                                        ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                        : `${-rotation.shadowX}px ${-rotation.shadowY}px 10px rgba(211, 2, 124, 0.315)`,
                                }}>
                                {item.count === 0 &&
                                    <div className="stock-overlay">
                                        <IoBan />
                                    </div>
                                }
                                <img src={item.image1} alt={item.title} />
                                {item.discount > 0 && <p className="discount">{item.discount}%</p>}
                            </div>
                        </Link>
                        <div className="details">
                            <p className="rate"><FaStar />{item.rating}</p>
                            <p className="review-count"><FaCommentDots />{item.reviewCount}<span>rəy</span></p>
                            {item.count === 0 &&
                                <p className="stock-info">Stokda yoxdur</p>
                            }
                        </div>
                        <Link to={`/products/${slugify(item.title, { lower: true })}`}>
                            <p>{item.title.substring(0, 30)}...</p>
                        </Link>
                        <Link to={`/products/${slugify(item.title, { lower: true })}`}>
                            <div className="pricing">
                                <div className="price">
                                    {item.discount > 0 && <p className="old-price">{item.price}</p>}₼
                                    <p className="current-price">
                                        {(item.price - (item.price * item.discount) / 100).toFixed(2)}₼
                                    </p>
                                </div>
                                <div className="divide">
                                    <p className="term">6 ay</p>
                                    <p>{((item.price - (item.price * item.discount) / 100) / 6).toFixed(2)}₼</p>
                                </div>
                            </div>
                        </Link>
                        <div className="card-ending">
                            {item.count === 0 ? (
                                <Link to="#" className="add-to-cart-btn disabled" onClick={(e) => e.preventDefault()} onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    style={{
                                        transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                                        boxShadow: rotation.shadowX === 0 && rotation.shadowY === 0
                                            ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                            : `${-rotation.shadowX}px ${-rotation.shadowY}px 5px rgba(211, 2, 124, 0.315)`,
                                    }}>
                                    <RiShoppingCart2Line /><span>Stokda yoxdur</span>
                                </Link>
                            ) : (
                                inCart(item.id) ? (
                                    <Link to="/cart" className="add-to-cart-btn clicked" onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                                            boxShadow: rotation.shadowX === 0 && rotation.shadowY === 0
                                                ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                                : `${-rotation.shadowX}px ${-rotation.shadowY}px 5px rgba(211, 2, 124, 0.315)`,
                                        }}>
                                        <RiShoppingCart2Fill /><span>Səbətə keç</span>
                                    </Link>
                                ) : (
                                    <Link to="#" className={`add-to-cart-btn ${clickClass[item.id] || ""}`} onClick={() => handleAddClick(item)} onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                                            boxShadow: rotation.shadowX === 0 && rotation.shadowY === 0
                                                ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                                : `${-rotation.shadowX}px ${-rotation.shadowY}px 5px rgba(211, 2, 124, 0.315)`,
                                        }}>
                                        <RiShoppingCart2Line />
                                        <span className="desktop-text">Səbətə əlavə et</span>
                                        <span className="mobile-text">Səbətə at</span>
                                    </Link>
                                )
                            )}
                            <Link className="add-to-wish-btn clicked" onClick={() => handleRemoveWishlistItem(item.id)} onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    transform: `perspective(1000px) rotateX(${-rotation.y}deg) rotateY(${rotation.x}deg)`,
                                    boxShadow: rotation.shadowX === 0 && rotation.shadowY === 0
                                        ? "0px 0px 5px rgba(211, 2, 124, 0.315)"
                                        : `${-rotation.shadowX}px ${-rotation.shadowY}px 5px rgba(211, 2, 124, 0.315)`,
                                }}>
                                <FaRegHeart />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
