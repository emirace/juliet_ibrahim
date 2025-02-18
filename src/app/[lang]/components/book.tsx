"use client";

import React from "react";
import Image from "next/image";
import IMAGES from "@/assetes/images";

const Book = () => {
  return (
    <section className="bg-black py-20 px-6 md:px-20">
      <div className="flex flex-col md:flex-row gap-12">
        <div className=" w-2/3 ">
          <div className=" flex gap-8  ">
            <div className="flex flex-col gap-6 flex-1 h-[55vh]">
              <div className="relative flex-1 h-full overflow-hidden">
                <Image
                  src={IMAGES.book1}
                  alt="Teamwork"
                  layout="fill"
                  objectFit="cover"
                  className=""
                />
              </div>
              <div className="relative flex-1 h-full overflow-hidden">
                <Image
                  src={IMAGES.book2}
                  alt="Teamwork"
                  layout="fill"
                  objectFit="cover"
                  className=""
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-medium leading-tight">
                We believe in the{" "}
                <span className="font-extrabold">power of</span> individual
                contribution.
              </h2>
              <p className="text-gray-400 mt-8 text-lg">
                We back the founders of new forms of network, digital
                organizations that harness the talents of individuals for the
                benefit of the collective.
              </p>
              <a
                href="#"
                className="inline-block mt-12 text-primary transition duration-300"
              >
                More About Us →
              </a>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-12 flex flex-col md:flex-row justify-center md:justify-around border-t border-white border-opacity-20 py-6 items-center text-center md:text-left gap-6">
            <div className="text-3xl font-bold">
              100%
              <p className="text-sm text-gray-400">CLIENT SATISFACTION</p>
            </div>

            <div className="text-3xl font-bold">
              6700
              <p className="text-sm text-gray-400">PROJECTS COMPLETED</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-1/3 h-[70vh] overflow-hidden">
          <Image
            src={IMAGES.book3}
            alt="Discussion"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Book;
