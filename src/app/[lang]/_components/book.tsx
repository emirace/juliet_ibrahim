"use client";

import React from "react";
import Image from "next/image";
import IMAGES from "@/assetes/images";
import Link from "next/link";

const Book = () => {
  return (
    <section className="bg-black py-20 px-6 md:px-20">
      <h2 className="text-2xl md:text-4xl font-medium leading-tight text-center mb-4 md:hidden">
        Discover the Journey in{" "}
        <span className="font-extrabold">A Toast to Life</span>
      </h2>
      <div className="flex flex-col md:flex-row gap-12">
        <div className=" w-full md:w-2/3 ">
          <div className=" flex flex-col md:flex-row gap-8  ">
            <div className="flex flex-col gap-6 md:flex-1 h-[55vh]">
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
              <h2 className="text-2xl md:text-4xl font-medium leading-tight hidden md:block">
                Discover the Journey in{" "}
                <span className="font-extrabold">A Toast to Life</span>
              </h2>
              <p className="text-gray-400 mt-8 text-lg">
                Dive into the inspiring story of resilience and triumph as
                Juliet Ibrahim shares her personal experiences and life lessons
                in her book, &quot;A Toast to Life.&quot;
              </p>
              <Link
                href="/shop"
                className="inline-block mt-12 text-primary transition duration-300"
              >
                Learn More About the Book →
              </Link>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-12 flex justify-center md:justify-around border-t w-full border-white border-opacity-20 py-6 items-center text-center md:text-left gap-6">
            <div className="text-3xl font-bold text-center">
              10+<p className="text-sm text-gray-400">CHAPTERS</p>
            </div>

            <div className="text-3xl font-bold text-center">
              300+
              <p className="text-sm text-gray-400">PAGES</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full md:w-1/3 h-[70vh] overflow-hidden">
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
