import { getProductDetails } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ViewProductDetails = async ({ params }) => {
  const { iD } = await params;
  const productDetails = await getProductDetails(iD);

  if (!productDetails) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p className="text-sm font-medium text-slate-600">Product not found</p>
        <Link href="/dashboard/seller/products" className="text-sm font-medium text-teal-700 hover:text-teal-800">
          Back to My Products
        </Link>
      </div>
    );
  }

  const {
    title,
    category,
    condition,
    price,
    quantity,
    status,
    images,
    description,
    sellerInfo,
  } = productDetails;

  const STATUS_COLORS = {
    available: 'bg-teal-50 text-teal-700',
    unavailable: 'bg-slate-100 text-slate-500',
    'sold out': 'bg-red-50 text-red-600',
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 md:py-10">
      {/* Breadcrumb / back link */}
      <Link
        href="/dashboard/seller/products"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-teal-700"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to My Products
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Left: Image gallery */}
        <div className="lg:col-span-2">
          <div className="aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {images?.[0] && (
              <Image
                src={images[0]}
                alt={title}
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {images?.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {images.slice(1).map((url, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                >
                  <Image
                    src={url}
                    alt={`${title} ${index + 2}`}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
                {category}
              </span>
              <h1 className="mt-3 text-2xl font-bold text-slate-900">{title}</h1>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_COLORS[status] || 'bg-slate-100 text-slate-500'}`}
            >
              {status}
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-teal-700">৳{price?.toLocaleString()}</p>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="text-xs text-slate-400">Condition</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{condition}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Stock Quantity</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{quantity}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Category</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{category}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-slate-800">Description</h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {description}
            </p>
          </div>

          {/* Seller info */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-sm font-semibold text-teal-700">
              {sellerInfo?.name?.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800">{sellerInfo?.name}</p>
              <p className="truncate text-xs text-slate-400">{sellerInfo?.email}</p>
            </div>
            <span className="shrink-0 text-xs font-medium text-slate-400">{sellerInfo?.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductDetails;