import IMAGES from "@/assetes/images";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full h-96 bg-black text-white flex items-end md:items-center ">
      <div className="absolute left-0 -bottom-1 h-full   w-full bg-gradient-to-t from-background  to-black/0 z-10 " />
      <h1 className="text-4xl md:text-8xl font-thin uppercase text-center z-20 w-full">
        <span className="font-bold ">SHOP</span>
      </h1>
      <Image
        src={IMAGES.image11}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 "
      />
    </section>
  );
};

export default Hero;
