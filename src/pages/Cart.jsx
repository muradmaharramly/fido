import React from "react";
import { CgDanger, CgTrashEmpty } from "react-icons/cg";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import slugify from "slugify";
import { useSelector } from "react-redux";
import ProductSliderRecomend from "../components/sliders/ProductSliderRecomend";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const Cart = () => {
    const { products, loading } = useSelector((state) => state.products);
    const {
        cartTotal,
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
    } = useCart();

    if (isEmpty) return (
        <div className="cart-empty">
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Səbət</span></div>
            <div className="empty-icon"><CgDanger /></div>
            <p>Sizin hal-hazırda səbətdə məhsulunuz yoxdur.</p>
            <span className="desc">Məhsullara baxmaq üçün ana səhifəyə keçid edə bilərsiniz.</span>
            <Link to="/" className="back-home">Ana səhifə</Link>
        </div>
    );

    const totalDiscount = items.reduce((acc, item) => {
        const itemDiscount = (item.price * item.discount) / 100;
        return acc + itemDiscount * item.quantity;
    }, 0);

    const handleRemoveItem = (itemId) => {
        removeItem(itemId);
        localStorage.removeItem(`clicked-${itemId}`);
    };

    const handleIncrease = (item) => {
        if (item.quantity < item.count) {
            updateItemQuantity(item.id, item.quantity + 1);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Diqqət!',
                text: 'Məhsulun maksimal say limitinə çatmısınız',
                confirmButtonText: "Aydındır",
                confirmButtonColor: " #C51E85",
                customClass: {
                    popup: "custom-swal-popup",
                    title: "custom-swal-title",
                    content: "custom-swal-text",
                    text: "custom-text",
                    confirmButton: "custom-swal-confirm",
                    icon: "custom-swal-icon"
                }
            });
        }
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            updateItemQuantity(item.id, item.quantity - 1);
        } else {
            removeItem(item.id);
        }
    };

    return (
        <div className="cart-area">
            <div className="breadcrumb"><Link to="/">Ana səhifə</Link><RiArrowRightDoubleFill /><span>Səbət</span></div>
            <h2 className="cart-title mb"><Link onClick={() => window.history.back()}><FaArrowLeft /></Link>  Səbətim</h2>
            <div className="cart-container">
                <div className="cart-content">
                    <h2 className="cart-title dt">Səbətim</h2>
                    {items.map((item, index) => (
                        <div className="cart-item" key={item.id}>
                            <Link to={`/products/${slugify(item.title, { lower: true })}`}>
                                <div className="cart-item-image">
                                    <img src={item.image1} alt={item.title} />
                                </div>
                            </Link>
                            <div className="cart-item-info">
                                <Link to={`/products/${slugify(item.title, { lower: true })}`}>
                                    <h6>{item.title}</h6>
                                </Link>
                                {item.discount > 0 && <p className="old-price">{item.price}₼</p>}
                                <p className="new-price">
                                    {(item.price - (item.price * item.discount) / 100).toFixed(2)}₼
                                </p>
                            </div>
                            <div className="cart-item-actions">
                                <div className="quantity-items">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleDecrease(item)}
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleIncrease(item)}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                                <button className="delete-btn" onClick={() => handleRemoveItem(item.id)}>
                                    <CgTrashEmpty />
                                </button>
                            </div>
                        </div>
                    ))}
                    <Link to="/checkout" className="checkout-btn"><span>Sifarişi rəsmiləşdir</span> <IoCheckmarkDoneCircleSharp /></Link>
                </div>
                <div className="cart-summary">
                    <h6>Ümumi baxış</h6>
                    <div className="item-div">
                        {items.map((item, index) => (
                            <div className="item-elements" key={item.id}>
                                <div className="summary-item">
                                    <p>{item.title}</p>
                                    <div className="pricing">
                                        {item.discount > 0 && <p className="old-price">{item.price}₼</p>}
                                        <p className="new-price">
                                            {(item.price - (item.price * item.discount) / 100).toFixed(2)}₼
                                        </p>
                                    </div>
                                </div>
                                <p className="summary-quantity">{item.quantity} ədəd</p>
                            </div>
                        ))}
                    </div>
                    <div className="summary-discount">
                        <span>Ümumi endirim</span>
                        <span>{totalDiscount.toFixed(2)}₼</span>
                    </div>
                    <div className="summary-total">
                        <span>Cəmi məbləğ:</span>
                        <span className="total-price">{(cartTotal - totalDiscount).toFixed(2)}₼</span>
                    </div>
                </div>
                <Link to="/checkout" className="checkout-btn mobile">Sifarişi rəsmiləşdir</Link>
            </div>
            <ProductSliderRecomend products={products} />
        </div>
    );
};

export default Cart;
