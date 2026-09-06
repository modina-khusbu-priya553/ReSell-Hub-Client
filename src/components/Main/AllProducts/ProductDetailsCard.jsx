"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Chip, Button } from "@heroui/react";
import {
  HiOutlineArrowLeft,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { toast } from "react-toastify";

const STATUS_COLOR = {
  available: "success",
  unavailable: "default",
  "sold out": "danger",
};

const CONDITION_COLOR = {
  Used: "default",
  "Like New": "success",
  Refurbished: "accent",
};

const ProductDetailsCard = ({ product }) => {
  const {
    _id,
    title,
    category,
    condition,
    price,
    quantity,
    status,
    images,
    description,
    sellerInfo,
  } = product;

  const [activeImage, setActiveImage] = useState(images?.[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
    // TODO: call backend action here to persist wishlist state
  };

  return (
    <div>
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-teal-700"
      >
        <HiOutlineArrowLeft className="size-4" />
        Back to All Products
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
        {/* Left: Image gallery */}
        <div className="lg:col-span-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            {activeImage && (
              <Image
                src={activeImage}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            )}

            <button
              onClick={handleWishlist}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition hover:scale-105"
            >
              {isWishlisted ? (
                <HiHeart className="size-5 text-red-500" />
              ) : (
                <HiOutlineHeart className="size-5 text-slate-500" />
              )}
            </button>
          </div>

          {images?.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {images.map((url, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(url)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                    activeImage === url
                      ? "border-teal-600"
                      : "border-transparent hover:border-slate-300"
                  }`}
                >
                  <Image
                    src={url}
                    alt={`${title} ${index + 1}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Chip variant="soft" color="accent" className="text-xs">
                {category}
              </Chip>
              <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                {title}
              </h1>
            </div>
            <Chip
              variant="soft"
              color={STATUS_COLOR[status] || "default"}
              className="shrink-0 capitalize"
            >
              {status}
            </Chip>
          </div>

          <p className="mt-4 text-3xl font-bold text-teal-700">
            ৳{price?.toLocaleString()}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="text-xs text-slate-400">Condition</p>
              <Chip
                variant="soft"
                color={CONDITION_COLOR[condition] || "default"}
                className="mt-1.5 text-xs"
              >
                {condition}
              </Chip>
            </div>
            <div>
              <p className="text-xs text-slate-400">Stock Quantity</p>
              <p className="mt-1.5 text-sm font-semibold text-slate-800">
                {quantity} available
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Category</p>
              <p className="mt-1.5 text-sm font-semibold text-slate-800">
                {category}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-slate-800">
              Description
            </h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {description}
            </p>
          </div>

          <div className="mt-6 flex gap-3">

            {/* data for payment */}
            <form action="/api/payment" method="POST">
              <input type="hidden" name="price" value={price} />
              <input type="hidden" name="productId" value={_id} />
              <input type="hidden" name="title" value={title} />
              <input type="hidden" name="image" value={images} />
              <input type="hidden" name="quantity" value={quantity} />
              <input type="hidden" name="sellerId" value={sellerInfo?.userId} />
              <input type="hidden" name="sellerName" value={sellerInfo?.name} />
              <input
                type="hidden"
                name="sellerEmail"
                value={sellerInfo?.email}
              />

              <Button
                type="submit"
                isDisabled={status !== "available"}
                className="flex-1 rounded-lg bg-teal-700 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-50"
              >
                {status === "available" ? "Buy Now" : "Currently Unavailable"}
              </Button>
            </form>
            <Button
              onPress={handleWishlist}
              variant="secondary"
              className={`flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition ${
                isWishlisted
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-slate-300 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {isWishlisted ? (
                <HiHeart className="size-4" />
              ) : (
                <HiOutlineHeart className="size-4" />
              )}
              {isWishlisted ? "Saved" : "Save"}
            </Button>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Seller Information
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-sm font-semibold text-teal-700">
                {sellerInfo?.name?.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">
                  {sellerInfo?.name}
                </p>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1 truncate">
                    <HiOutlineMail className="size-3.5 shrink-0" />
                    {sellerInfo?.email}
                  </span>
                  <span className="flex items-center gap-1 shrink-0">
                    <HiOutlinePhone className="size-3.5" />
                    {sellerInfo?.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
