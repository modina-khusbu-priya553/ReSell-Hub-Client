import SellerProductsData from '@/components/Seller/Products/SellerProductsData';
import { getSellerProducts } from '@/lib/data';
import { updateProduct } from '@/lib/action';
import React from 'react';

const SellerProducts = async() => {
    const products=  await getSellerProducts();
    console.log('Seller products data:', products);
    return (
        <div className="md:py-10 py-4">
            <SellerProductsData products={products} updateProductAction={updateProduct} />
            
        </div>
    );
};

export default SellerProducts;