"use client";
import IMAGES from "@/assetes/images";
import { getDictionary } from "@/get-dictionary";
import Image from "next/image";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about-us" },
  { name: "FILMOGRAPHY", href: "/filmography" },
  { name: "SHOP", href: "/shop" },
  { name: "CONTACT US", href: "/contact" },
];

const Navbar = ({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["counter"];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(dictionary);

  return (
    <div
      className={`fixed top-0 left-0 w-full ${
        isOpen && "h-full"
      } md:h-auto bg-black/30 backdrop-blur-lg border-b border-white border-opacity-10 z-50`}
    >
      <div className="mx-auto px-6 lg:px-20 flex flex-col md:flex-row gap-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center justify-between w-full md:w-auto ">
          <Link
            href="/"
            className="flex items-center w-full md:w-auto  gap-2 text-white text-xl font-bold pr-5 md:border-r py-2 border-white border-opacity-10 "
          >
            <Image src={IMAGES.logo} alt="Logo" width={180} height={180} />
          </Link>
          <div className="text-3xl md:hidden ">
            {isOpen ? (
              <IoCloseSharp onClick={() => setIsOpen(!isOpen)} />
            ) : (
              <RiMenu3Fill onClick={() => setIsOpen(!isOpen)} />
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row  items-center  gap-8 md:gap-16 font-medium font-[family-name:var(--font-poppins)]`}
        >
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-sm hover:text-primary hover:scale-105 transition h-full"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Contact Button */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex md:border-l md:pl-5  border-white border-opacity-10 h-full items-center gap-4`}
        >
          <div onClick={() => setIsOpen(false)}>
            <Link
              href="/booking"
              className="bg-primary text-white  font-[family-name:var(--font-poppins)] px-6 py-2 rounded font-medium hover:scale-105 transition"
            >
              Bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
