"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Form,
  TextField,
  NumberField,
  Label,
  Input,
  TextArea,
  FieldError,
  Select,
  ListBox,
  RadioGroup,
  Radio,
  Button,
} from "@heroui/react";
import { uploadImage } from "@/lib/imageBB";

const CATEGORIES = [
  "Electronics",
  "Furniture",
  "Vehicles",
  "Fashion",
  "Mobile Phones",
];
const CONDITIONS = ["Used", "Like New", "Refurbished"];

const AddProducts = ({ addProductDataAction }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [condition, setCondition] = useState("Used");
  const [category, setCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 4 - images.length);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const result = await uploadImage(file);
          return result.url;
        }),
      );
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImageField = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const productData = {
      ...data,
      category,
      condition,
      price: Number(data.price),
      quantity: Number(quantity),
      images,
      sellerInfo: {
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      },
      status: "available",
    };

    console.log("Product Data:", productData);

    await addProductDataAction(productData);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Add New Product</h1>
        <p className="mt-1 text-sm text-slate-500">
          List a pre-owned item for buyers to discover.
        </p>
      </div>

      <Form
        onSubmit={handleAddProduct}
        className="rounded-xl border border-slate-200 bg-white p-6 md:p-8"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left: Images */}
          <div className="lg:col-span-2">
            <Label className="text-sm font-medium text-slate-700">
              Product Images
            </Label>
            <p className="mt-0.5 text-xs text-slate-400">
              Upload up to 4 images
            </p>

            <div className="mt-3 grid grid-cols-2 gap-3">
              {images.map((url, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              {images.length < 4 && (
                <label
                  htmlFor="product-image-upload"
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-slate-300 text-slate-400 transition hover:border-teal-500 hover:text-teal-600"
                >
                  {uploading ? (
                    <svg
                      className="h-6 w-6 animate-spin text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                  ) : (
                    <>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-xs">Add photo</span>
                    </>
                  )}
                  <input
                    id="product-image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {images.length === 0 && (
              <p className="mt-2 text-xs text-red-500">
                At least 1 image is required
              </p>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <TextField isRequired name="title" type="text">
              <Label className="text-sm font-medium text-slate-700">
                Product Title
              </Label>
              <Input
                placeholder="Used Dell Inspiron 15 Laptop"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              />
              <FieldError className="text-xs text-red-500" />
            </TextField>

            <div className="grid grid-cols-2 gap-4">
              {/* Category — HeroUI compound Select */}
              <Select
                placeholder="Select category"
                selectedKey={category}
                onSelectionChange={setCategory}
                isRequired
              >
                <Label className="text-sm font-medium text-slate-700">
                  Category
                </Label>
                <Select.Trigger className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {CATEGORIES.map((c) => (
                      <ListBox.Item key={c} id={c} textValue={c}>
                        {c}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
                <FieldError className="text-xs text-red-500" />
              </Select>

              <TextField isRequired name="price" type="number">
                <Label className="text-sm font-medium text-slate-700">
                  Price
                </Label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-slate-400">
                    ৳
                  </span>
                  <Input
                    min={0}
                    placeholder="35000"
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-8 pr-4 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                </div>
                <FieldError className="text-xs text-red-500" />
              </TextField>
            </div>

            {/* Condition — HeroUI RadioGroup */}
            <Label className="text-sm font-medium text-slate-700">
              Condition
            </Label>
            <RadioGroup
              name="condition"
              value={condition}
              onChange={setCondition}
              orientation="horizontal"
              className="gap-2"
            >
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {CONDITIONS.map((c) => (
                  <Radio key={c} value={c} className="cursor-pointer">
                    <Radio.Control className="hidden">
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content className="flex w-full items-center justify-center rounded-lg border border-slate-300 px-3 py-2.5 text-center text-sm font-medium text-slate-600 transition group-data-[selected]:border-teal-600 group-data-[selected]:bg-teal-50 group-data-[selected]:text-teal-700 group-data-[selected]:ring-1 group-data-[selected]:ring-teal-600 data-[selected]:border-teal-600 data-[selected]:bg-teal-50 data-[selected]:text-teal-700 data-[selected]:ring-1 data-[selected]:ring-teal-600">
                      {c}
                    </Radio.Content>
                  </Radio>
                ))}
              </div>
            </RadioGroup>

            {/* Stock quantity — HeroUI NumberField */}
            <NumberField value={quantity} onChange={setQuantity} minValue={1}>
              <Label className="text-sm font-medium text-slate-700">
                Stock Quantity
              </Label>
              <div className="mt-1.5 flex w-32 items-center rounded-lg border border-slate-300">
                <Button
                  variant="secondary"
                  slot="decrement"
                  className="rounded-lg px-3 py-2.5 bg-white border-teal-600 text-slate-500 hover:text-teal-700"
                >
                  −
                </Button>
                <Input className="w-full border-x border-slate-300 py-2.5 text-center text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20" />
                <Button
                  variant="secondary"
                  slot="increment"
                  className="rounded-lg px-3 py-2.5 bg-white text-slate-500 hover:text-teal-700"
                >
                  +
                </Button>
              </div>
            </NumberField>

            <TextField isRequired name="description" type="text">
              <Label className="text-sm font-medium text-slate-700">
                Description
              </Label>
              <TextArea
                rows={4}
                placeholder="Dell Inspiron 15, Core i5 10th Gen, 8GB RAM, 512GB SSD. Used for 2 years."
                className="mt-1.5 w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              />
              <FieldError className="text-xs text-red-500" />
            </TextField>
          </div>
        </div>

        {/* Seller info — auto-filled */}
        <div className="mt-6 flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-xs font-semibold text-teal-700">
            {user?.name?.charAt(0)}
          </div>
          <p className="text-xs text-slate-500">
            Listing as{" "}
            <span className="font-medium text-slate-700">{user?.name}</span> (
            {user?.email}) — seller info is pulled automatically from your
            account.
          </p>
        </div>

        <div className="mt-6 flex gap-3 border-t border-slate-200 pt-6">
          <Button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Publish Product
          </Button>
          <Button
            type="reset"
            variant="secondary"
            onPress={() => {
              setCondition("Used");
              setCategory(null);
              setImages([]);
              setQuantity(1);
            }}
            className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProducts;
