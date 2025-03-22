"use client";
import Image from "next/image";
import IMAGES from "@/assetes/images";
import { CiYoutube } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { FaCheck, FaInstagram, FaPinterest } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  const [sent, setSent] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribeToNewsletter = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
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
          <a
            href="mailto:contact@julietibrahim.com"
            className="mt-2 font-semibold text-orange-500 hover:underline"
          >
            contact@julietibrahim.com
          </a>
          <a
            href="tel:+233267065858"
            className="text-orange-500 mt-2 font-bold block"
          >
            +233 267 065 858
          </a>
          <a
            href="tel:+2348077487580"
            className="text-orange-500 mt-2 font-bold block"
          >
            +234 807 748 7580
          </a>
          <a
            href="tel:+14378607008"
            className="text-orange-500 mt-2 font-bold block"
          >
            +1 (437) 860 7008
          </a>
          <a
            href="tel:+18173815340"
            className="text-orange-500 mt-2 font-bold block"
          >
            +1817 381 5340
          </a>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold">Useful Links</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li>
              <Link href="/about_us" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <a href="services" className="hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
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
                {loading ? "Sending" : "Send"}
              </button>
            )}
          </div>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com/share/1NtK3tSdk4/?mibextid=wwXIfr"
              className="p-2 rounded-full border border-white border-opacity-30"
              target="_blank"
            >
              <FiFacebook className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/julietibrahim?t=cgvX2VhlWl252ur0WznU9g&s=09"
              className="p-2 rounded-full border border-white border-opacity-30"
              target="_blank"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/@julietibrahimdiaries"
              className="p-2 rounded-full border border-white border-opacity-30"
              target="_blank"
            >
              <CiYoutube className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/julietibrahim?igsh=MW9wOHF2OWVhY200YQ=="
              className="p-2 rounded-full border border-white border-opacity-30"
              target="_blank"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://pin.it/27DjTlWVZ"
              className="p-2 rounded-full border border-white border-opacity-30"
              target="_blank"
            >
              <FaPinterest size={30} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-4">
        © 2025 Juliet Ibrahim. All Rights Reserved
      </div>
    </footer>
  );
}
