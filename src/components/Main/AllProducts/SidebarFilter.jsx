import { Sliders } from '@gravity-ui/icons';
import React from 'react';

const CATEGORIES = ['All', 'Electronics', 'Furniture', 'Vehicles', 'Fashion', 'Mobile Phones'];
const CONDITIONS = ['All', 'Used', 'Like New', 'Refurbished'];


const SidebarFilter = () => {
    return (
        <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <Sliders className="size-4 text-teal-700" />
                <h2 className="text-sm font-bold text-slate-900">Filters</h2>
              </div>

              {/* Category */}
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Category</p>
                <div className="mt-3 flex flex-col gap-1">
                  {CATEGORIES.map((c, i) => (
                    <button
                      key={c}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                        i === 0
                          ? 'bg-teal-50 font-semibold text-teal-700'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Condition</p>
                <div className="mt-3 flex flex-col gap-1">
                  {CONDITIONS.map((c, i) => (
                    <button
                      key={c}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                        i === 0
                          ? 'bg-teal-50 font-semibold text-teal-700'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Price Range (৳)</p>
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                  <span className="text-slate-300">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                </div>
              </div>

              <button className="mt-6 w-full rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50">
                Reset Filters
              </button>
            </div>
          </aside>
    );
};

export default SidebarFilter;