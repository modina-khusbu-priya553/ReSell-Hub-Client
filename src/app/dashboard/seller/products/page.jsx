import SellerProductsData from '@/components/Seller/Products/SellerProductsData';
import { getSellerProducts } from '@/lib/data';
import React from 'react';

const SellerProducts = async() => {
    const products=  await getSellerProducts();
    console.log('Seller products data:', products);
    return (
        <div className="md:py-10 py-4">
            <SellerProductsData products={products} />
            
        </div>
    );
};

export default SellerProducts;