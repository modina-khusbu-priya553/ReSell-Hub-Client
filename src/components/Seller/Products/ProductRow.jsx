'use client';
import React from 'react';
import { Table } from "@heroui/react";
import Image from 'next/image';
import Link from 'next/link';
import EditProduct from './EditProduct';

const ProductRow = ({ product, updateProductAction }) => {
  const { title, category, condition, price, quantity, status, images } = product;

  return (
    <Table.Row className="transition hover:bg-slate-50">
      <Table.Cell className="px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            {images?.[0] && (
              <Image src={images[0]} alt={title} width={44} height={44} className="h-full w-full object-cover" />
            )}
          </div>
          <span className="max-w-[200px] truncate font-medium text-slate-800">
            {title}
          </span>
        </div>
      </Table.Cell>
      <Table.Cell className="px-5 py-3 text-slate-600">{category}</Table.Cell>
      <Table.Cell className="px-5 py-3 text-slate-600">{condition}</Table.Cell>
      <Table.Cell className="px-5 py-3 font-medium text-slate-800">৳{price?.toLocaleString()}</Table.Cell>
      <Table.Cell className="px-5 py-3 text-slate-600">{quantity}</Table.Cell>
      <Table.Cell className="px-5 py-3">
        <span
          className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
            status === 'available'
              ? 'bg-teal-50 text-teal-700'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          {status}
        </span>
      </Table.Cell>
      <Table.Cell className="px-5 py-3">
        <div className="flex items-center justify-end gap-2">
          <EditProduct product={product} updateProductAction={updateProductAction} />
          <button className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600" aria-label="Delete product">
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.87 12.14A2 2 0 0116.14 21H7.86a2 2 0 01-1.99-1.86L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default ProductRow;