import { Magnifier } from "@gravity-ui/icons";
import React from "react";

const Searchbar = () => {
  return (
    <div>
      <Magnifier className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        placeholder="Search for laptops, phones, furniture..."
        className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
      />
    </div>
  );
};

export default Searchbar;
