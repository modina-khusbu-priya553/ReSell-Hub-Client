import React from "react";
import { Link } from "@heroui/react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: <FaFacebook /> },
  { label: "Instagram", href: "#", icon: <AiFillInstagram /> },
  { label: "X", href: "#", icon: <FaXTwitter /> },
  { label: "LinkedIn", href: "#", icon: <FaLinkedin /> },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-slate-900 text-slate-300">
      {/* top gradient accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-400" />

      {/* subtle ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Information */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 ring-1 ring-teal-500/30">
                <svg
                  className="h-5 w-5 text-teal-400"
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
              <p className="font-bold text-xl text-white">
                ReSell<span className="text-teal-400">Hub</span>
              </p>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              A trusted marketplace for buying and selling pre-owned products —
              reducing waste, promoting sustainable consumption, and helping
              buyers find affordable, quality items.
            </p>

            {/* Social Media Links */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition hover:-translate-y-0.5 hover:border-teal-400 hover:text-teal-400 hover:shadow-[0_0_12px_rgba(45,212,191,0.35)]"
                >
                  <span className="text-base">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Quick Links
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 transition hover:text-teal-400 hover:pl-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Contact
            </h3>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                  <svg
                    className="h-4 w-4 text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="pt-1.5 text-slate-300">Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                  <svg
                    className="h-4 w-4 text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <a
                  href="mailto:support@resellhub.com"
                  className="pt-1.5 text-slate-300 transition hover:text-teal-400"
                >
                  support@resellhub.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                  <svg
                    className="h-4 w-4 text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11 11 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span className="pt-1.5 text-slate-300">+880 1712-345678</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} ReSellHub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-teal-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-teal-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
