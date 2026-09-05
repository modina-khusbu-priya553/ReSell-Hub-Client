import SellerProductsData from '@/components/Seller/Products/SellerProductsData';
import { getSellerProducts } from '@/lib/data';
import { deleteProduct, updateProduct } from '@/lib/action';
import React from 'react';

const SellerProducts = async() => {
    const products=  await getSellerProducts();

    return (
        <div className="md:py-10 py-4">
            <SellerProductsData products={products} updateProductAction={updateProduct} deleteProductAction={deleteProduct} />
            
        </div>
    );
};

export default SellerProducts;