'use client';
import React from 'react';
import { Table } from "@heroui/react";
import Link from 'next/link';
import SearchAndFilter from './SearchAndFilter';
import ProductRow from './ProductRow';

const SellerProductsData = ({products}) => {
   
  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900">My Products</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage all your listed products — edit, update or remove them anytime.
          </p>
        </div>
        <Link href="/dashboard/seller/add-product">
          <button className="flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </Link>
      </div>

      <SearchAndFilter />

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-sm font-medium text-slate-600">No products found</p>
            <p className="text-xs text-slate-400">You haven't listed any products yet.</p>
          </div>
        ) : (
          <Table variant="secondary">
            <Table.ScrollContainer>
              <Table.Content aria-label="My products" className="min-w-[800px]">
                <Table.Header className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <Table.Column isRowHeader className="px-5 py-3 font-medium">Product</Table.Column>
                  <Table.Column className="px-5 py-3 font-medium">Category</Table.Column>
                  <Table.Column className="px-5 py-3 font-medium">Condition</Table.Column>
                  <Table.Column className="px-5 py-3 font-medium">Price</Table.Column>
                  <Table.Column className="px-5 py-3 font-medium">Stock</Table.Column>
                  <Table.Column className="px-5 py-3 font-medium">Status</Table.Column>
                  <Table.Column className="px-5 py-3 text-right font-medium">Actions</Table.Column>
                </Table.Header>

                <Table.Body className="divide-y divide-slate-100">
                  {products.map((product) => (
                    <ProductRow key={product._id} product={product} />
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        )}
      </div>
    </div>
  );
};

export default SellerProductsData;