import React from "react";
import Hero from "./_component/hero";
import Image from "next/image";
import IMAGES from "@/assetes/images";

function Shop() {
  return (
    <div>
      <Hero />
      <div className="grid grid-cols-1 md:grid-cols-3 my-20">
        <a
          href="https://a.co/d/1haWSw3"
          className="flex flex-col justify-center items-center"
          target="blank"
        >
          <div className="relative w-full  h-[70vh] overflow-hidden">
            <Image
              src={IMAGES.book3}
              alt="Discussion"
              layout="fill"
              objectFit="contain"
              className="rounded-lg "
            />
          </div>
          <div className="">Get this book</div>
        </a>
      </div>
    </div>
  );
}

export default Shop;
