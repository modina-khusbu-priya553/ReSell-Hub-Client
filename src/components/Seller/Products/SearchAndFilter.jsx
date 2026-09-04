import React from "react";

const SearchAndFilter = () => {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <svg
          className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by product name..."
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
        />
      </div>

      <select className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 sm:w-48">
        <option>All Categories</option>
        <option>Electronics</option>
        <option>Furniture</option>
        <option>Vehicles</option>
        <option>Fashion</option>
        <option>Mobile Phones</option>
      </select>
    </div>
  );
};

export default SearchAndFilter;
