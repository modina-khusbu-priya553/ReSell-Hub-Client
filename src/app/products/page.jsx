import React from 'react';
import { getAllProducts } from '@/lib/data';
import ProductCards from '@/components/Main/AllProducts/ProductCards';
import Searchbar from '@/components/Main/AllProducts/SearchBar';
import SidebarFilter from '@/components/Main/AllProducts/SidebarFilter';
import ProductSort from '@/components/Main/AllProducts/ProductSort';



const AllProducts = async () => {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-slate-50 md:py-10 py-4">
      {/* Hero header strip */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <h1 className="text-3xl font-bold text-slate-900">Discover Pre-Owned Treasures</h1>
          <p className="mt-2 text-sm text-slate-500">
            {products.length} verified listings from trusted sellers across Bangladesh.
          </p>

          {/* Search bar */}
          <div className="relative mt-6 max-w-2xl">
            <Searchbar></Searchbar>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar filters */}
          <SidebarFilter></SidebarFilter>

          {/* Product grid */}
          <div className="lg:col-span-3">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-800">{products.length}</span> results
              </p>

             {/* Sort options */}
             <ProductSort></ProductSort>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-20">
                <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p className="text-sm font-medium text-slate-600">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCards key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;