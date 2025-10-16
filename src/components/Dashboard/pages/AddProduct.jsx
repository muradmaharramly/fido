import React from 'react'
import { Link } from 'react-router-dom'
import ProductForm from '../elements/ProductForm'
import { addProduct } from '../../../tools/actions/productActions';

const AddProduct = () => {

  const handleAddProduct = (productData) => {
    addProduct(productData);
  };
    return (
        <div className='add-product'>
            <div className='page-head'>
                <h3>Məhsul əlavə et</h3>
                <Link to="/administrative/products">Məhsullara bax</Link>
            </div>
            <ProductForm isEditMode={false} onSubmit={handleAddProduct} />
        </div>
    )
}

export default AddProduct