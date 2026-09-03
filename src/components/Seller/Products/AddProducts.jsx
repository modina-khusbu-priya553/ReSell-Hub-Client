"use client";
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const CATEGORIES = ['Electronics', 'Furniture', 'Vehicles', 'Fashion', 'Mobile Phones'];
const CONDITIONS = ['Used', 'Like New', 'Refurbished'];


const AddProducts = () => {


  const { data: session } = authClient.useSession();
  const user = session?.user;

    const [condition, setCondition] = useState('Used');
  const [images, setImages] = useState(['']);
  const [quantity, setQuantity] = useState(1);
 

  

     const handleImageChange = (index, value) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  const addImageField = () => {
    if (images.length < 4) setImages([...images, '']);
  };


  const handleAddProduct = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const productData = {
      ...data,
      images: images.filter((url) => url.trim() !== ''),
       sellerInfo: {
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      },
      status: 'available',
    };
    console.log('Form Data:', data);
    console.log('Product Data:', productData);
  }
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Add New Product</h1>
        <p className="mt-1 text-sm text-slate-500">
          List a pre-owned item for buyers to discover.
        </p>
      </div>

      <form onSubmit={handleAddProduct} className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left: Images */}
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-slate-700">Product Images</label>
            <p className="mt-0.5 text-xs text-slate-400">Add up to 4 image URLs</p>

            <div className="mt-3 flex flex-col gap-3">
              {images.map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50">
                    {url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <svg className="h-5 w-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="text-slate-400 hover:text-red-500"
                      aria-label="Remove image"
                    >
                      <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {images.length < 4 && (
              <button
                type="button"
                onClick={addImageField}
                className="mt-3 flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add another image
              </button>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <div>
              <label htmlFor="title" className="text-sm font-medium text-slate-700">
                Product Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Used Dell Inspiron 15 Laptop"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="text-sm font-medium text-slate-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  defaultValue=""
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                >
                  <option value="" disabled>Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="price" className="text-sm font-medium text-slate-700">
                  Price
                </label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">৳</span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    required
                    placeholder="35000"
                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-8 pr-4 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                </div>
              </div>
            </div>

            {/* Condition segmented control */}
            <div>
              <label className="text-sm font-medium text-slate-700">Condition</label>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {CONDITIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCondition(c)}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                      condition === c
                        ? 'border-teal-600 bg-teal-50 text-teal-700 ring-1 ring-teal-600'
                        : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock quantity stepper */}
            <div>
              <label className="text-sm font-medium text-slate-700">Stock Quantity</label>
              <div className="mt-1.5 flex w-32 items-center rounded-lg border border-slate-300">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2.5 text-slate-500 hover:text-teal-700"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full border-x border-slate-300 py-2.5 text-center text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2.5 text-slate-500 hover:text-teal-700"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                placeholder="Dell Inspiron 15, Core i5 10th Gen, 8GB RAM, 512GB SSD. Used for 2 years."
                className="mt-1.5 w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              />
            </div>
          </div>
        </div>

        {/* Seller info — auto-filled, read-only, not manually typed */}
        <div className="mt-6 flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-xs font-semibold text-teal-700">
            {user?.name?.charAt(0)}
          </div>
          <p className="text-xs text-slate-500">
            Listing as <span className="font-medium text-slate-700">{user?.name}</span> ({user?.email}) — seller info is pulled automatically from your account.
          </p>
        </div>

        <div className="mt-6 flex gap-3 border-t border-slate-200 pt-6">
          <button
            type="submit"
            
            className="flex items-center gap-2 rounded-lg bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
           
          </button>
          <button
            type="reset"
            onClick={() => { setCondition('Used'); setImages(['']); setQuantity(1); }}
            className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
