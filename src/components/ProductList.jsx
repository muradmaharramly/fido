import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchProducts } from "../tools/request/fetchProducts";
import ProductCard from "./PorductCard";
import PreLoader from "./PreLoader";
import ErrorPage from "./ErrorPage";

function ProductList() {
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        fetchProducts(); 
    }, []);

    if (loading) return <PreLoader />;
    if (error) return <p><ErrorPage error={error} /></p>;

    return (
        <div className="product-list">
            {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductList;