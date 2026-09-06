// components/Main/ProductCards.jsx
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Chip } from "@heroui/react";

const CONDITION_COLOR = {
  Used: 'default',
  'Like New': 'success',
  Refurbished: 'accent',
};

const ProductCards = ({ product }) => {
  const { _id, title, category, condition, price, images } = product;

  return (
    <Card
      as={Link}
      href={`/products/${_id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        {images?.[0] && (
          <Image
            src={images[0]}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

        <Chip
          variant="soft"
          color={CONDITION_COLOR[condition] || 'default'}
          className="absolute left-2.5 top-2.5 shadow-sm backdrop-blur-sm"
        >
          {condition}
        </Chip>
      </div>

      <Card.Content className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-700/70">
          {category}
        </p>
        <h3 className="mt-1.5 line-clamp-1 text-sm font-semibold text-slate-800 transition group-hover:text-teal-700">
          {title}
        </h3>
        <div className="mt-auto flex items-end justify-between pt-3">
          <p className="text-lg font-bold text-teal-700">৳{price?.toLocaleString()}</p>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition group-hover:bg-teal-50 group-hover:text-teal-700">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProductCards;