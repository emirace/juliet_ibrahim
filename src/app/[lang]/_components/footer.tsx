"use client";
import { Facebook, Instagram } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import IMAGES from "@/assetes/images";
import { CiYoutube } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function Footer() {
  const [sent, setSent] = useState(false);
  const [input, setInput] = useState("");

  const subscribeToNewsletter = async () => {
    try {
      await fetch("/api/newsletters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: input }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setInput("");
      setSent(true);
    }
  };

  return (
    <footer className="bg-black text-white py-10 pt-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Logo & Contact Info */}
        <div>
          <Image src={IMAGES.logo} alt="Logo" width={180} height={180} />

          {/* <p className="text-gray-400 mt-4">
            5919 Trussville Crossings Pkwy, Birmingham
          </p> */}
          <p className="mt-2 font-semibold">support@julietibrahim.net</p>
          <p className="text-orange-500 mt-2 font-bold">
            +233 267 065 858, +234 807 748 7580
          </p>
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sent}
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-white w-full placeholder-gray-400"
            />
            {sent ? (
              <FaCheck className="text-lg" />
            ) : (
              <button
                onClick={subscribeToNewsletter}
                className="text-gray-400 hover:text-black hover:bg-white border border-gray-400 rounded-full px-6 p-1"
              >
                Send
              </button>
            )}
          </div>
          <div className="flex space-x-4 mt-4">
            <Link
              href="#"
              className="p-2 rounded-full border border-white border-opacity-30"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="https://x.com/julietibrahim?t=cgvX2VhlWl252ur0WznU9g&s=09"
              className="p-2 rounded-full border border-white border-opacity-30"
            >
              <FaXTwitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.youtube.com/@julietibrahimdiaries"
              className="p-2 rounded-full border border-white border-opacity-30"
            >
              <CiYoutube className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.instagram.com/julietibrahim?igsh=MW9wOHF2OWVhY200YQ=="
              className="p-2 rounded-full border border-white border-opacity-30"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-4">
        © 2025 Juliet Ibrahim. All Rights Reserved
      </div>
    </footer>
  );
}
