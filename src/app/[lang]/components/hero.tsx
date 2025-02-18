import IMAGES from "@/assetes/images";
import Image from "next/image";

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
        <h2 className="text-2xl md:text-4xl mt-2 text-gray-300">
          I am a product designer
        </h2>
        <p className="mt-4 text-gray-400">
          From the inception of a project to its completion, we employ a
          comprehensive and holistic approach.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 border border-white rounded-full font-semibold transition hover:bg-white hover:text-black">
            Let&apos;s Contact
          </button>
        </div>

        {/* Contact Info */}
      </div>
      <div className=" absolute z-10 left-32 bottom-20 mt-12 flex flex-wrap items-center gap-6">
        <div>
          Email: <p className="">Webfolio.Info@gmail.com</p>
        </div>
        <div className="w-[1] h-8 bg-white" />
        <div>
          Phone: <p className="">+2 456 (343) 24 45</p>
        </div>
        <div className="w-[1] h-8 bg-white" />

        <div>
          Address: <p className="">5919 Trussville Pkwy, Birmingham</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
