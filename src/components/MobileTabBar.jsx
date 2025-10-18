import { Badge } from "antd";
import React, { useEffect } from "react";
import { FaHeart, FaRegHeart, FaUser, FaRegUser } from "react-icons/fa6";
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { TbHome, TbHomeFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";

const MobileTabBar = () => {
    const { totalUniqueItems } = useCart();
    const { totalWishlistItems } = useWishlist();
    const location = useLocation();


    const tabs = {
        "/": "home",
        "/wishlist": "wishlist",
        "/cart": "cart",
    };

    const activeTab = Object.keys(tabs).includes(location.pathname) ? location.pathname : null;

    const indicatorPositions = {
        "/": 7.5,
        "/wishlist": 43,
        "/cart": 78,
    };

    return (
        <div className="mobile-tab-bar">
            {activeTab && (
                <div
                    className="active-indicator"
                    style={{ left: `${indicatorPositions[activeTab] || 6.7}%` }}
                ></div>
            )}

            <Link to="/">
                <button className={activeTab === "/" ? "clicked" : ""}>
                    {activeTab === "/" ? <TbHomeFilled /> : <TbHome />}
                </button>
            </Link>

            <Link to="/wishlist">
                <button className={activeTab === "/wishlist" ? "clicked" : ""}>
                    <Badge count={totalWishlistItems}>
                        {activeTab === "/wishlist" ? <FaHeart /> : <FaRegHeart />}
                    </Badge>
                </button>
            </Link>

            <Link to="/cart">
                <button className={activeTab === "/cart" ? "clicked" : ""}>
                    <Badge count={totalUniqueItems}>
                        {activeTab === "/cart" ? <RiShoppingCart2Fill /> : <RiShoppingCart2Line />}
                    </Badge>
                </button>
            </Link>


        </div>
    );
};

export default MobileTabBar;