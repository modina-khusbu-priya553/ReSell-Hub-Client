import AddProducts from '@/components/Seller/Products/AddProducts';
import { addProduct } from '@/lib/action';
import React from 'react';

const SellerAddProducts = () => {
    return (
        <div>
            <AddProducts addProductDataAction={addProduct}></AddProducts>
        </div>
    );
};

export default SellerAddProducts;