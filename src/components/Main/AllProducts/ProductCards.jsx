'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Chip } from "@heroui/react";
import { HiOutlineArrowRight } from "react-icons/hi";

const CONDITION_COLOR = {
  Used: 'default',
  'Like New': 'success',
  Refurbished: 'accent',
};

const ProductCards = ({ product }) => {
  const { _id, title, category, condition, price, images } = product;

  return (
    <Card className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5">
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
        <h3 className="mt-1.5 line-clamp-1 text-sm font-semibold text-slate-800">
          {title}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="text-lg font-bold text-teal-700">৳{price?.toLocaleString()}</p>

          <Link
            href={`/products/${_id}`}
            aria-label="View product details"
            className="flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 transition hover:bg-teal-700 hover:text-white"
          >
            Details
            <HiOutlineArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProductCards;