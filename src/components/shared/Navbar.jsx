'use client'
import React, { useState } from 'react';
import {
  Link,
  Button,
  Avatar,
  Dropdown,
  Label,
} from "@heroui/react";
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { MdDashboard } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';




const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
    

  };

  const pathname = usePathname();
  if (pathname.includes("dashboard")){
    return null
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <Button
              className="text-slate-700 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
            <Link href={"/"}>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 ring-1 ring-teal-500/30">
                  <svg
                    className="h-5 w-5 text-teal-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114-4.9M20 15a8 8 0 01-14 4.9"
                    />
                  </svg>
                </div>
                <p className="text-lg font-bold text-slate-800">
                  ReSell<span className="text-teal-700">Hub</span>
                </p>
              </div>
            </Link>
          </div>

          <ul className="hidden items-center gap-8 md:flex">
            <li>
              <Link
                href="/"
                className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-sm font-medium text-teal-700"
                aria-current="page"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href={`/dashboard/${user?.role}`}
                className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
              >
                Dashboard
              </Link>
            </li>
           
          </ul>

          {!user && (
            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
              >
                Login
              </Link>
              <Link href="/register">
                <Button className="rounded-lg bg-teal-700 px-5 font-medium text-white transition hover:bg-teal-800">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {user && (
            <div className="hidden items-center gap-4 md:flex">
              <Dropdown>
                <Dropdown.Trigger className="rounded-full">
                  <div className="rounded-full px-2 py-1.5 transition hover:bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" className="ring-2 ring-teal-700/20">
                        <Avatar.Image alt={user?.name} src={user?.image} />
                        <Avatar.Fallback className="bg-teal-500/10 text-teal-700">
                          {user.name.charAt(0)}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col gap-0">
                        <p className="text-sm leading-5 font-medium text-slate-800">
                          {user?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <div className="px-3 pt-3 pb-1">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" className="ring-2 ring-teal-700/20">
                        <Avatar.Image alt={user?.name} src={user?.image} />
                        <Avatar.Fallback className="bg-teal-500/10 text-teal-700">
                          {user.name.charAt(0)}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col gap-0">
                        <p className="text-sm leading-5 font-medium text-slate-800">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-slate-400">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Dropdown.Menu
                    onAction={(key) => console.log(`Selected: ${key}`)}
                  >
                    <Dropdown.Item id="dashboard" textValue="Dashboard">
                      {/* dashboard base on role */}
                      <Link
                        className="flex items-center gap-2 text-slate-700"
                        href={`/dashboard/${user?.role}`}
                      >
                        <MdDashboard className="text-teal-700" />
                        <Label>Dashboard</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="profile" textValue="Profile">
                      <div className="flex items-center gap-2 text-slate-700">
                        <CgProfile className="text-teal-700" />
                        <Label>Profile</Label>
                      </div>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="logout"
                      textValue="Logout"
                      variant="danger"
                      onClick={handleSignOut}
                    >
                      <div className="flex items-center gap-2">
                        <BiLogOut />
                        <Label>Logout</Label>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
              <Button  onClick={handleSignOut}>Signout</Button>
            </div>
          )}
        </header>

        {isMenuOpen && (
          <div className="border-t border-slate-200 md:hidden">
            <ul className="flex flex-col gap-2 p-4">
              <li>
                <Link href="/" className="block py-2 text-sm font-medium text-slate-700">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="block py-2 text-sm font-medium text-teal-700">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="block py-2 text-sm font-medium text-slate-700">
                  Categories
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    href={`/dashboard/${user?.role}`}
                    className="block py-2 text-sm font-medium text-slate-700"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4">
                {user ? (
                  <Button
                    onClick={handleSignOut}
                    className="w-full rounded-lg bg-red-50 text-red-600"
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link href="/signin" className="block py-2 text-sm">
                      Login
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full rounded-lg bg-teal-700 text-white">
                        Sign Up
                      </Button>
                    </Link>
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