import IMAGES from "@/assetes/images";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about-us" },
  { name: "FILMOGRAPHY", href: "#" },
  { name: "BLOGS", href: "#" },
  { name: "CONTACT US", href: "#" },
];

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-lg border-b border-white border-opacity-10 z-50">
      <div className="mx-auto px-6 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white text-xl font-bold pr-5 border-r py-2 border-white border-opacity-10 "
        >
          <Image src={IMAGES.logo} alt="Logo" width={180} height={180} />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex  items-center  gap-16 font-medium font-[family-name:var(--font-poppins)]">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-sm hover:text-primary hover:scale-105 transition h-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Contact Button */}
        <div className="border-l pl-5  border-white border-opacity-10 h-full flex items-center gap-4">
          <Link
            href="#"
            className="bg-primary text-white  font-[family-name:var(--font-poppins)] px-6 py-2 rounded font-medium hover:scale-105 transition"
          >
            Let&apos;s contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
