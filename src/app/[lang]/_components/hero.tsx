import IMAGES from "@/assetes/images";
import Image from "next/image";
import TypingAnimation from "./typing";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-black text-white flex items-end md:items-center ">
      {/* Background Overlay */}
      <div className="absolute left-0 -bottom-1 h-1/2  md:h-full w-full md:w-[60%] bg-gradient-to-t md:bg-gradient-to-r from-black via-black/60 to-black/0 z-10 " />

      <Image
        src={IMAGES.hero}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 hidden md:block"
      />
      <Image
        src={IMAGES.image}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 md:hidden"
      />
      <div className="relative z-20 px-6 md:px-12 lg:px-32 max-w-4xl pb-20">
        <p className="text-lg flex items-center gap-2">
          <span role="img" aria-label="wave">
            👋
          </span>
          Hello! there
        </p>
        <h1 className="text-4xl md:text-7xl font-bold mt-2 md:mt-4">
          I&apos;m <span className="text-primary">Juliet Ibrahim</span>
        </h1>
        <h2 className=" flex gap-2 items-center text-2xl md:text-4xl md:mt-2">
          A Force of{" "}
          <TypingAnimation
            texts={["Elegance", "Resilience", "Global Influence"]}
          />
        </h2>
        <p className="md:mt-2 text-gray-400">
          A professional actress, film producer, singer, and humanitarian. Best
          Actress award at the 2010 Ghana Movie Awards, Best Director at Ghana
          Movie Awards 2024.
        </p>

        {/* Buttons */}
      </div>
      <div className=" absolute z-10 left-5 md:left-32 top-20 md:top-auto md:bottom-20 mt-12 flex flex-col md:flex-row flex-wrap items-center gap-6">
        <FiFacebook size={30} />
        <div className="w-[1] h-8 bg-white hidden" />
        <Link href="https://www.instagram.com/julietibrahim?igsh=MW9wOHF2OWVhY200YQ==">
          <FaInstagram size={30} />
        </Link>

        <div className="w-[1] h-8 bg-white hidden" />
        <Link href="https://x.com/julietibrahim?t=cgvX2VhlWl252ur0WznU9g&s=09">
          <FaXTwitter size={30} />
        </Link>
        <div className="w-[1] h-8 bg-white hidden" />
        <Link href="https://www.youtube.com/@julietibrahimdiaries">
          <CiYoutube size={30} />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
