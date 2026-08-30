'use client'
import React, { useState } from 'react';
import {
  Link,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // TODO: replace with real auth state from Better Auth session
  const isLoggedIn = false;
  const user = { name: "Rakib Hasan", image: "" };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Left: Mobile toggle + Logo */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2">
            <svg className="h-7 w-7 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114-4.9M20 15a8 8 0 01-14 4.9" />
            </svg>
            <p className="font-bold text-lg text-slate-800">
              ReSell<span className="text-teal-700">Hub</span>
            </p>
          </Link>
        </div>

        {/* Center: Nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-teal-700 transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Auth area */}
        <div className="hidden items-center gap-4 md:flex">
          {isLoggedIn ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  size="sm"
                  src={user.image || undefined}
                  name={user.name}
                  className="cursor-pointer ring-2 ring-teal-700/20"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile actions">
                <DropdownItem key="profile">My Profile</DropdownItem>
                <DropdownItem key="orders">My Orders</DropdownItem>
                <DropdownItem key="wishlist">Wishlist</DropdownItem>
                <DropdownItem key="logout" className="text-red-600" color="danger">
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition">
                Login
              </Link>
              <Button
                as={Link}
                href="/register"
                className="rounded-lg bg-teal-700 px-5 font-medium text-white hover:bg-teal-800 transition"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 md:hidden">
          <ul className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-2 text-sm font-medium text-slate-700">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-4">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard/profile" className="block py-2 text-sm">My Profile</Link>
                  <Button className="w-full rounded-lg bg-red-50 text-red-600">Logout</Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block py-2 text-sm">Login</Link>
                  <Button className="w-full rounded-lg bg-teal-700 text-white">Register</Button>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;