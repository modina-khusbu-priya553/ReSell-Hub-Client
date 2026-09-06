import React from 'react';
import { getProductDetails } from '@/lib/data';
import ProductDetailsCard from '@/components/Main/AllProducts/ProductDetailsCard';
import Link from 'next/link';

const ProductDetails = async ({ params }) => {
    const { productId } = await params;
    const product = await getProductDetails(productId);
      if (!product) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-24">
        <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p className="text-sm font-medium text-slate-600">Product not found</p>
        <Link href="/products" className="text-sm font-medium text-teal-700 hover:text-teal-800">
          Back to All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl min-h-screen bg-slate-50 md:py-10 py-4">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <ProductDetailsCard product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;