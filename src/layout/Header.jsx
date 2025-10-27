import React, { useState, useEffect, useContext, useRef } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { PiEmpty } from "react-icons/pi";
import { FiSun } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi2";
import { ThemeContext } from "../context/ThemeContext";
import { Link, NavLink } from "react-router-dom";
import { Badge } from "antd";
import { useCart } from "react-use-cart";
import { useWishlist } from "react-use-wishlist";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../tools/request/fetchProducts";
import slugify from "slugify";
import { GoHistory } from "react-icons/go";
import { fetchCampaigns } from "../tools/request/fetchCampaigns";
import { FaRegHeart, FaTelegramPlane } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaInstagram, FaTiktok } from "react-icons/fa6";

const Header = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [popularFilteredProducts, setPopularFilteredProducts] = useState([]);
    const [viewedProducts, setViewedProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [discountedProducts, setDiscountedProducts] = useState([]);
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
    const [showTopNavbar, setShowTopNavbar] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [theme, setTheme] = useContext(ThemeContext);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const inputRef = useRef(null);
    const panelRef = useRef(null);

    const { totalUniqueItems } = useCart();
    const { totalWishlistItems } = useWishlist();

    const { campaigns } = useSelector((state) => state.campaigns);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (loading) return;
        if (error) return console.error(`Error: ${error}`);

        const storedViewed = JSON.parse(localStorage.getItem("viewedProducts")) || [];
        const filteredStoredViewed = storedViewed.filter(product => product.count > 0).slice(-3);
        setViewedProducts(filteredStoredViewed);

        const availableProducts = products.filter(product => product.count > 0);

        const popular = availableProducts.filter(product => product.rating > 4).slice(0, 3);
        setPopularProducts(popular);

        const discounted = availableProducts.filter(product => {
            const hasVariants = product.variants && product.variants.length > 0;
            const discount = hasVariants ? product.variants[0].discount || 0 : product.discount || 0;
            return discount > 15;
        }).slice(0, 3);
        setDiscountedProducts(discounted);
    }, [products, loading, error]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [searchTerm, products]);

    useEffect(() => {
        if (searchTerm) {
            const popularfiltered = products.filter(
                (product) => {
                    const rating = product.rating > 4;
                    const titleMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.category.toLowerCase().includes(searchTerm.toLowerCase());
                    return titleMatch && rating;
                }
            );
            setPopularFilteredProducts(popularfiltered);
        } else {
            setPopularFilteredProducts([]);
        }
    }, [searchTerm, products]);

    useEffect(() => {
        if (searchTerm) {
            const filteredCampaigns = campaigns.filter((campaign) => {
                const isTitleMatch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase());
                const isFutureDate = new Date(campaign.endDate) > new Date();
                return isTitleMatch && isFutureDate;
            });

            setFilteredCampaigns(filteredCampaigns);
        } else {
            setFilteredCampaigns([]);
        }
    }, [searchTerm, campaigns]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100) {
                setShowTopNavbar(false);
                setIsScrolled(true);
            } else {
                setShowTopNavbar(true);
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleBurgerClick = () => {
        setIsClicked(!isClicked);
        document.body.style.overflow = isClicked ? "auto" : "hidden";
    };

    const changeTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        const mainBody = document.querySelector("body");
        if (theme === "dark") {
            mainBody.classList.add("dark");
            mainBody.classList.remove("light");
        } else {
            mainBody.classList.add("light");
            mainBody.classList.remove("dark");
        }
    }, [theme]);

    const handleInputClick = () => setIsSearchOpen(true);

    const handleSearchLinkClick = () => {
        setIsSearchOpen(false);
        if (inputRef.current) setSearchTerm("");
    };

     useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                panelRef.current &&
                !panelRef.current.contains(event.target)
            ) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className={`header ${isScrolled ? "fixed" : ""}`}>
            <div className={`top-navbar ${showTopNavbar ? "visible" : "hidden"}`}>
                <nav>
                    <div className={`burger ${isClicked ? "clicked" : ""}`} onClick={handleBurgerClick}>
                        <ion-icon name={isClicked ? "close-outline" : "menu-outline"}></ion-icon>
                    </div>
                    <ul>
                        <li><NavLink to='/products'>Məhsullar</NavLink></li>
                        <li><NavLink to="/campaigns">Kampaniyalar</NavLink></li>
                    </ul>
                    <div className="nav-right-itm">
                        <div className="nav-social">
                            <div className="social">
                                <div className="nav-icons">
                                    <Link to="#" target="_blank"><FaInstagram /></Link>
                                    <Link to="#" target="_blank"><FaTiktok /></Link>
                                    <Link to="#" target="_blank"><FaTelegramPlane /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="mode-toggle" onClick={changeTheme}>
                            <div className={`toggle-round ${theme === "dark" ? "right" : "left"}`}></div>
                            <span role="button"><HiOutlineMoon /><FiSun /></span>
                        </div>
                    </div>
                </nav>
            </div>

            <div className={`main-navbar ${isScrolled ? "fixed" : ""}`}>
                <Link to="/" className="logo">Fido</Link>

                <div className={`search-bar ${isSearchOpen ? "active" : ""}`}>
                    <input
                        type="text"
                        placeholder="Məhsul axtar..."
                        value={searchTerm || ""}
                        ref={inputRef}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={handleInputClick}
                    />
                    {isSearchOpen && (
                        <div className="search-panel" ref={panelRef}>
                            <div className="left">
                                {searchTerm.length > 0 ? (
                                    <>
                                        <h6>Standart</h6>
                                        <ul>
                                            {filteredProducts.length > 0 ? (
                                                filteredProducts.map((product) => {
                                                    const hasVariants = product.variants && product.variants.length > 0;
                                                    const variant = hasVariants ? product.variants[0] : {};
                                                    const price = parseFloat(variant.price || product.price || 0);
                                                    const discount = parseFloat(variant.discount || product.discount || 0);
                                                    const finalPrice = (price - (price * discount) / 100).toFixed(2);

                                                    return (
                                                        <Link
                                                            key={product.id}
                                                            to={`/products/${slugify(product.title, { lower: true })}`}
                                                            onClick={handleSearchLinkClick}
                                                        >
                                                            <IoIosSearch />
                                                            <li>
                                                                {product.title.substring(0, 25)} –{" "}
                                                                <span>${finalPrice}</span>
                                                            </li>
                                                        </Link>
                                                    );
                                                })
                                            ) : (
                                                <li className="not-found">
                                                    <span>Nəticə tapılmadı!</span>
                                                    <PiEmpty />
                                                </li>
                                            )}
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <h6>Ən son baxılan</h6>
                                        <ul>
                                            {viewedProducts.length > 0 ? (
                                                viewedProducts.map((product) => {
                                                    const hasVariants = product.variants && product.variants.length > 0;
                                                    const variant = hasVariants ? product.variants[0] : {};
                                                    const price = parseFloat(variant.price || product.price || 0);
                                                    const discount = parseFloat(variant.discount || product.discount || 0);
                                                    const finalPrice = (price - (price * discount) / 100).toFixed(2);

                                                    return (
                                                        <Link
                                                            key={product.id}
                                                            to={`/products/${slugify(product.title, { lower: true })}`}
                                                            onClick={handleSearchLinkClick}
                                                        >
                                                            <GoHistory />
                                                            <li>
                                                                {product.title.substring(0, 25)} –{" "}
                                                                <span>${finalPrice}</span>
                                                            </li>
                                                        </Link>
                                                    );
                                                })
                                            ) : (
                                                <li className="not-found">
                                                    <span>Nəticə tapılmadı!</span>
                                                    <PiEmpty />
                                                </li>
                                            )}
                                        </ul>
                                    </>
                                )}

                                <h6>Populyar</h6>
                                {searchTerm.length > 0 ? (
                                    <ul>
                                        {popularFilteredProducts.length > 0 ? (
                                            popularFilteredProducts.map((product) => {
                                                const hasVariants = product.variants && product.variants.length > 0;
                                                const variant = hasVariants ? product.variants[0] : {};
                                                const price = parseFloat(variant.price || product.price || 0);
                                                const discount = parseFloat(variant.discount || product.discount || 0);
                                                const finalPrice = (price - (price * discount) / 100).toFixed(2);

                                                return (
                                                    <Link
                                                        key={product.id}
                                                        to={`/products/${slugify(product.title, { lower: true })}`}
                                                        onClick={handleSearchLinkClick}
                                                    >
                                                        <IoIosSearch />
                                                        <li>
                                                            {product.title.substring(0, 25)} –{" "}
                                                            <span>${finalPrice}</span>
                                                        </li>
                                                    </Link>
                                                );
                                            })
                                        ) : (
                                            <li className="not-found">
                                                <span>Nəticə tapılmadı!</span>
                                                <PiEmpty />
                                            </li>
                                        )}
                                    </ul>
                                ) : (
                                    <ul>
                                        {popularProducts.length > 0 ? (
                                            popularProducts.map((product) => {
                                                const hasVariants = product.variants && product.variants.length > 0;
                                                const variant = hasVariants ? product.variants[0] : {};
                                                const price = parseFloat(variant.price || product.price || 0);
                                                const discount = parseFloat(variant.discount || product.discount || 0);
                                                const finalPrice = (price - (price * discount) / 100).toFixed(2);

                                                return (
                                                    <Link
                                                        key={product.id}
                                                        to={`/products/${slugify(product.title, { lower: true })}`}
                                                        onClick={handleSearchLinkClick}
                                                    >
                                                        <IoIosSearch />
                                                        <li>
                                                            {product.title.substring(0, 25)} –{" "}
                                                            <span>${finalPrice}</span>
                                                        </li>
                                                    </Link>
                                                );
                                            })
                                        ) : (
                                            <li className="not-found">
                                                <span>Nəticə tapılmadı!</span>
                                                <PiEmpty />
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </div>

                            <div className="right">
                                <div className="searched-products">
                                    <h6>Məhsullar</h6>
                                    {searchTerm.length > 0 ? (
                                        <div className="searched-list">
                                            {filteredProducts.length > 0 ? (
                                                filteredProducts.map((product) => {
                                                    const hasVariants = product.variants && product.variants.length > 0;
                                                    const variant = hasVariants ? product.variants[0] : {};
                                                    const price = parseFloat(variant.price || product.price || 0);
                                                    const discount = parseFloat(variant.discount || product.discount || 0);
                                                    const finalPrice = (price - (price * discount) / 100).toFixed(2);

                                                    return (
                                                        <Link
                                                            key={product.id}
                                                            to={`/products/${slugify(product.title, { lower: true })}`}
                                                            className="product-box"
                                                            onClick={handleSearchLinkClick}
                                                        >
                                                            <div className="img-div">
                                                                <img src={product.image1} alt={product.title} />
                                                            </div>
                                                            <div className="details">
                                                                <span>{product.category}</span>
                                                                <p>{product.title.substring(0, 20)}...</p>
                                                            </div>
                                                            <Link className="pricing" onClick={handleSearchLinkClick}>
                                                                {discount > 0 && <p className="old-price">${price}</p>}
                                                                <p className="current-price">${finalPrice}</p>
                                                            </Link>
                                                        </Link>
                                                    );
                                                })
                                            ) : (
                                                <p className="not-found">
                                                    <span>Məhsul tapılmadı!</span>
                                                    <PiEmpty />
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            {discountedProducts.length > 0 ? (
                                                discountedProducts.map((product) => {
                                                    const hasVariants = product.variants && product.variants.length > 0;
                                                    const variant = hasVariants ? product.variants[0] : {};
                                                    const price = parseFloat(variant.price || product.price || 0);
                                                    const discount = parseFloat(variant.discount || product.discount || 0);
                                                    const finalPrice = (price - (price * discount) / 100).toFixed(2);

                                                    return (
                                                        <Link
                                                            key={product.id}
                                                            to={`/products/${slugify(product.title, { lower: true })}`}
                                                            className="product-box"
                                                            onClick={handleSearchLinkClick}
                                                        >
                                                            <div className="img-div">
                                                                <img src={product.image1} alt={product.title} />
                                                            </div>
                                                            <div className="details">
                                                                <span>{product.category}</span>
                                                                <p>{product.title.substring(0, 20)}...</p>
                                                            </div>
                                                            <Link className="pricing" onClick={handleSearchLinkClick}>
                                                                {discount > 0 && <p className="old-price">${price}</p>}
                                                                <p className="current-price">${finalPrice}</p>
                                                            </Link>
                                                        </Link>
                                                    );
                                                })
                                            ) : (
                                                <p className="not-found">Məhsul tapılmadı!</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="campaign-img">
                                    {searchTerm.length > 0 ? (
                                        filteredCampaigns.length > 0 ? (
                                            <img src={filteredCampaigns[0].image} alt="Filtered Campaign" />
                                        ) : (
                                            <p className="not-found">Kampaniya tapılmadı!</p>
                                        )
                                    ) : filteredCampaigns.length > 0 ? (
                                        <p className="not-found">Kampaniya tapılmadı!</p>
                                    ) : (
                                        <img
                                            src={
                                                campaigns.sort((a, b) => new Date(b.endDate) - new Date(a.endDate))[0]
                                                    ?.image
                                            }
                                            alt="Latest Campaign"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                <div className="actions">
                    <NavLink to="/wishlist">
                        <Badge count={totalWishlistItems} className="custom-badge" showZero>
                            <button className="wish-btn"><FaRegHeart /></button>
                        </Badge>
                    </NavLink>
                    <NavLink to="/cart">
                        <Badge count={totalUniqueItems} className="custom-badge" showZero>
                            <button className="cart-btn"><RiShoppingCart2Line /></button>
                        </Badge>
                    </NavLink>
                </div>
            </div>
            <div className={`mobile-navbar ${isClicked ? "active" : ""}`}>
                <div className="mobile-menu-content">
                    <p className="top-text">Sayt üzrə naviqasiya</p>
                    <div className="mobile-navbar-top-icons">
                        {totalWishlistItems === 0 ? (
                            <NavLink to="/wishlist">
                                <button><FaRegHeart /></button>
                            </NavLink>
                        ) : (
                            <Badge count={totalWishlistItems} className="custom-badge" showZero>
                                <NavLink to="/wishlist">
                                    <button><FaRegHeart /></button>
                                </NavLink>
                            </Badge>
                        )}
                        {totalUniqueItems === 0 ? (
                            <NavLink to="/cart">
                                <button><RiShoppingCart2Line /></button>
                            </NavLink>
                        ) : (
                            <Badge count={totalUniqueItems} className="custom-badge" showZero>
                                <NavLink to="/cart">
                                    <button><RiShoppingCart2Line /></button>
                                </NavLink>
                            </Badge>
                        )}
                    </div>
                    <nav className="mobile-navbar-menu">
                        <ul>
                            <li>
                                <Link to="/products">
                                    Məhsullar <ion-icon name="chevron-forward-outline"></ion-icon>
                                </Link>
                            </li>
                            <li>
                                <Link to="/campaigns">
                                    Kampaniyalar <ion-icon name="chevron-forward-outline"></ion-icon>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </header>
    );
};

export default Header;
