import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductForm from '../elements/ProductForm'
import { useDispatch, useSelector } from 'react-redux';
import { editProduct } from '../../../tools/actions/productActions';
import { fetchProducts } from '../../../tools/request/fetchProducts';
import PreLoader from '../../PreLoader';
import slugify from 'slugify';

const EditProduct = () => {
    const { slug } = useParams();  
    const [product, setProduct] = useState(null); 
    const { products, loading, error } = useSelector((state) => state.products);
    const dispatch = useDispatch();

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

    if (loading) return <PreLoader />;
    if (error) return <p>Xəta: {error}</p>;

    if (!product) {
        return <div>Ürün bulunamadı</div>; 
    }

    const handleEditProduct = (updatedProduct) => {
        editProduct(updatedProduct); 
    };

    return (
        <div className='edit-product'>
            <div className='page-head'>
                <h3>Məhsul redaktə et</h3>
                <Link to="/administrative/products">Məhsullara bax</Link>
            </div>
            <ProductForm 
                isEditMode={true}  
                existingProduct={product} 
                onSubmit={handleEditProduct}  
            />
        </div>
    );
}

export default EditProduct;
