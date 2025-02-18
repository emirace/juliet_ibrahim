import IMAGES from "@/assetes/images";
import Image from "next/image";
import TypingAnimation from "./typing";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";

const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-black text-white flex items-center ">
      {/* Background Overlay */}
      <div className="absolute left-0 h-full w-[60%] bg-gradient-to-r from-black via-black/60 to-black/0 z-10" />

      {/* Background Image */}
      {/* <div className="absolute right-0 top-0 w-1/2 h-full"> */}
      <Image
        src={IMAGES.hero}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />
      {/* </div> */}
      {/* Content */}
      <div className="relative z-20 px-6 md:px-12 lg:px-32 max-w-4xl">
        <p className="text-lg flex items-center gap-2">
          <span role="img" aria-label="wave">
            👋
          </span>
          Hello! there
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mt-4">
          I&apos;m <span className="text-primary">Juliet Ibrahim</span>
        </h1>
        <h2 className=" flex gap-2 items-center text-2xl md:text-4xl mt-2">
          A Force of{" "}
          <TypingAnimation
            texts={["Elegance", "Resilience", "Global Influence"]}
          />
        </h2>
        <p className="mt-2 text-gray-400">
          A professional actress, film producer, singer, and humanitarian. Best
          Actress award at the 2010 Ghana Movie Awards.
        </p>

        {/* Buttons */}
      </div>
      <div className=" absolute z-10 left-32 bottom-20 mt-12 flex flex-wrap items-center gap-6">
        <FiFacebook size={30} />
        <div className="w-[1] h-8 bg-white" />
        <FaInstagram size={30} />

        <div className="w-[1] h-8 bg-white" />
        <FaXTwitter size={30} />
        <div className="w-[1] h-8 bg-white" />
        <CiYoutube size={30} />
      </div>
    </section>
  );
};

export default Hero;
