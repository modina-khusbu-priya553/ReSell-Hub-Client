"use client";
import React from 'react';

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdSpaceDashboard,
  MdOutlineShoppingBag,
  MdOutlineFavoriteBorder,
  MdOutlineReceiptLong,
  MdOutlinePerson,
  MdOutlineAddBox,
  MdOutlineInventory2,
  MdOutlineAssignment,
  MdOutlineBarChart,
  MdOutlineGroup,
} from "react-icons/md";

const MENU_ITEMS = {
  buyer: [
    { label: "Overview", href: "/dashboard/buyer", icon: MdSpaceDashboard },
    { label: "My Orders", href: "/dashboard/buyer/orders", icon: MdOutlineShoppingBag },
    { label: "Wishlist", href: "/dashboard/buyer/wishlist", icon: MdOutlineFavoriteBorder },
    { label: "Payment History", href: "/dashboard/buyer/payments", icon: MdOutlineReceiptLong },
    { label: "Profile Settings", href: "/dashboard/buyer/profile", icon: MdOutlinePerson },
  ],
  seller: [
    { label: "Overview", href: "/dashboard/seller", icon: MdSpaceDashboard },
    { label: "Add Product", href: "/dashboard/seller/add-product", icon: MdOutlineAddBox },
    { label: "My Products", href: "/dashboard/seller/products", icon: MdOutlineInventory2 },
    { label: "Manage Orders", href: "/dashboard/seller/orders", icon: MdOutlineAssignment },
    { label: "Sales Analytics", href: "/dashboard/seller/analytics", icon: MdOutlineBarChart },
    { label: "Profile Settings", href: "/dashboard/seller/profile", icon: MdOutlinePerson },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: MdSpaceDashboard },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: MdOutlineGroup },
    { label: "Manage Products", href: "/dashboard/admin/products", icon: MdOutlineInventory2 },
    { label: "Manage Orders", href: "/dashboard/admin/orders", icon: MdOutlineAssignment },
    { label: "Platform Analytics", href: "/dashboard/admin/analytics", icon: MdOutlineBarChart },
    { label: "Profile Settings", href: "/dashboard/admin/profile", icon: MdOutlinePerson },
  ],
};

const ROLE_BADGE = {
  buyer: "bg-teal-500/10 text-teal-400",
  seller: "bg-amber-400/10 text-amber-400",
  admin: "bg-white/10 text-white",
};

const DashboardSidebar = ({ mobileOpen, onClose }) => {
    const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const role = user?.role || "buyer";
  const menuItems = MENU_ITEMS[role] || MENU_ITEMS.buyer;
    const content = (
    <div className="flex h-full flex-col bg-slate-900">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 ring-1 ring-teal-500/30">
          <svg className="h-4.5 w-4.5 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114-4.9M20 15a8 8 0 01-14 4.9" />
          </svg>
        </div>
        <p className="text-lg font-bold text-white">
          ReSell<span className="text-teal-400">Hub</span>
        </p>
      </Link>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
          Menu
        </p>
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const ItemIcon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-teal-500/10 text-teal-400"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <ItemIcon className="h-4.5 w-4.5 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Profile snippet */}
      {user && (
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-sm font-semibold text-teal-400">
              {user.name?.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold capitalize ${ROLE_BADGE[role]}`}>
                {role}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 lg:block">{content}</aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <aside className="absolute left-0 top-0 h-full w-64">{content}</aside>
        </div>
      )}
    </>
  );

};

export default DashboardSidebar;