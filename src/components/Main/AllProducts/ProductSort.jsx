import React from 'react';
import { TextField, Input, Select, ListBox } from "@heroui/react";
import { Magnifier, ChevronDown, Sliders } from "@gravity-ui/icons";


const SORT_OPTIONS = ['Newest', 'Price: Low to High', 'Price: High to Low'];

const ProductSort = () => {
    return (
        <div>
            <Select defaultSelectedKey="Newest" aria-label="Sort products">
                <Select.Trigger className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20">
                  <Select.Value />
                  <Select.Indicator>
                    <ChevronDown className="size-4" />
                  </Select.Indicator>
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {SORT_OPTIONS.map((s) => (
                      <ListBox.Item key={s} id={s} textValue={s}>
                        {s}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
        </div>
    );
};

export default ProductSort;