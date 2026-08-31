"use client";
import React from 'react';

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineNotificationsNone } from "react-icons/md";


const ROLE_BADGE = {
  buyer: "bg-teal-500/10 text-teal-400",
  seller: "bg-amber-400/10 text-amber-400",
  admin: "bg-white/10 text-white",
};



const DashboardNavbar = ({ onMenuClick }) => {
     const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pageTitle =
    pathname.split("/").filter(Boolean).slice(-1)[0]?.replace(/-/g, " ") || "overview";

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8">
      <div className="flex items-center gap-3">
        <Button
          className="text-slate-600 lg:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <BiMenu className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold capitalize text-slate-900">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button aria-label="Notifications" className="relative text-slate-500 hover:text-slate-700">
          <MdOutlineNotificationsNone className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-400" />
        </button>

        {user && (
          <Dropdown>
            <Dropdown.Trigger className="rounded-full">
              <Avatar size="sm" className="cursor-pointer ring-2 ring-teal-700/20">
                <Avatar.Image alt={user?.name} src={user?.image} />
                <Avatar.Fallback className="bg-teal-500/10 text-teal-700">
                  {user.name?.charAt(0)}
                </Avatar.Fallback>
              </Avatar>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <div className="px-3 pt-3 pb-1">
                <div className="flex items-center gap-2">
                  <Avatar size="sm" className="ring-2 ring-teal-700/20">
                    <Avatar.Image alt={user?.name} src={user?.image} />
                    <Avatar.Fallback className="bg-teal-500/10 text-teal-700">
                      {user.name?.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                  <div className="flex flex-col gap-0">
                    <p className="text-sm leading-5 font-medium text-slate-800">{user?.name}</p>
                    <p className="text-xs leading-none text-slate-400">{user?.email}</p>
                  </div>
                </div>
              </div>
              <Dropdown.Menu>
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
        )}
      </div>
    </header>
  );
};

export default DashboardNavbar;