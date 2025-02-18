import { Facebook, Dribbble, Linkedin, Instagram, ArrowUp } from "lucide-react";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 pt-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Logo & Contact Info */}
        <div>
          <h2 className="text-2xl font-bold">folio</h2>
          <p className="text-gray-400 mt-4">
            5919 Trussville Crossings Pkwy, Birmingham
          </p>
          <p className="mt-2 font-semibold">Hello@webfolio.com</p>
          <p className="text-orange-500 mt-2 font-bold">+2 456 (343) 24 45</p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold">Useful Links</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social Links */}
        <div>
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <div className="flex items-center mt-4 border-b border-gray-600 pb-2">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-transparent border-none focus:ring-0 text-white w-full placeholder-gray-400"
            />
            <button className="text-gray-400 hover:text-white">
              <ArrowUp />
            </button>
          </div>
          <div className="flex space-x-4 mt-4">
            <Link
              href="#"
              className="p-2 rounded-full border border-white border-opacity-30"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full border border-white border-opacity-30"
            >
              <Dribbble className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full border border-white border-opacity-30"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full border border-white border-opacity-30"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-4">
        © 2024 Webfolio is Proudly Powered by{" "}
        <a href="#" className="text-orange-500">
          UiCamp
        </a>
      </div>
    </footer>
  );
}
