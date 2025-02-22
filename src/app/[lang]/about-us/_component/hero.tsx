import IMAGES from "@/assetes/images";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full md:h-screen h-96 bg-black text-white flex items-end md:items-center ">
      <div className="absolute left-0 -bottom-1 h-full   w-full bg-gradient-to-t from-background  to-black/0 z-10 " />
      <h1 className="text-6xl md:text-8xl font-thin uppercase text-center z-20 w-full">
        <span className="font-bold ">About</span> Juliet
      </h1>
      <Image
        src={IMAGES.image6}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 hidden md:block object-top"
      />
      <Image
        src={IMAGES.image4}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 md:hidden object-top"
      />
    </section>
  );
};

export default Hero;
