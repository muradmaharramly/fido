import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProducts } from "../tools/request/fetchProducts";
import ProductCard from "./PorductCard";
import PreLoader from "./PreLoader";
import { PiEmpty } from "react-icons/pi";
import { SlRefresh } from "react-icons/sl";
import ErrorPage from "./ErrorPage";


function ProductList() {
    const { products, loading, error } = useSelector((state) => state.products);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <PreLoader />;
    if (error) return <p><ErrorPage error={error} /></p>;

    const categories = ["Parfum", "Aksesuar","Case", "Çanta"];

    const filteredProducts = products.filter((product) =>
        selectedCategory === "all"
            ? categories.includes(product.category)
            : product.category === selectedCategory
    );
    const resetFilters = () => {
        setSelectedCategory("all");
    };

    return (
        <div className="products-container">
            <div className="area-head filtered">
                <div className="text">
                    <p>Özəl təkliflər</p>
                    <h3>Şərtlər indi daha da sadələşdi!</h3>
                </div>

                <div className="filter-con">
                    <div className="filter">
                        <span
                            className={`filter-item ${selectedCategory === "all" ? "selected" : ""}`}
                            onClick={() => setSelectedCategory("all")}
                        >
                            Hamısı
                        </span>
                        {categories.map((category, index) => (
                            <span
                                key={index}
                                onClick={() => setSelectedCategory(category)}
                                className={`filter-item ${selectedCategory === category ? "selected" : ""}`}
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="product-list">
                {products && products.length > 0 ? (<div className='empty-area'>
                    <div className='icon'><PiEmpty /></div>
                    <p>Uyğun məhsul yoxdur.</p>
                </div>) : (filteredProducts.length > 0 ? (
                    filteredProducts.slice(0, 8).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className='empty-area'>
                        <div className='icon'><PiEmpty /></div>
                        <p>Uyğun məhsul tapılmadı.</p>
                        <button className='reset-btn' onClick={resetFilters}><SlRefresh /> Filtrləri sıfırla</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
