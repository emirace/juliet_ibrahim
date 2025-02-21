"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import IMAGES from "@/assetes/images";

const brands = [
  { name: "Terra", logo: IMAGES.axe_logo },
  { name: "Hues", logo: IMAGES.belaire },
  { name: "Theo", logo: IMAGES.boomplay },
  { name: "Rise", logo: IMAGES.gulder },
  { name: "Hitech", logo: IMAGES.lg_logo },
];

// Duplicate array for seamless looping effect
const brandLogos = [...brands, ...brands];

const Brands = () => {
  return (
    <section className="py-16 overflow-hidden border-t border-white border-opacity-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-semibold">
          We‘re proud to work with
        </h2>
        <p className="text-3xl md:text-5xl font-extrabold mt-2">
          a diverse range of companies.
        </p>
      </div>

      {/* Scrolling Brands Container */}
      <div className="relative w-full mt-20 flex items-center overflow-hidden">
        <motion.div
          className="flex space-x-32 min-w-max"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 50,
            ease: "linear",
          }}
        >
          {brandLogos.map((brand, index) => (
            <Image
              key={index}
              src={brand.logo}
              alt={brand.name}
              width={100}
              height={100}
              className=""
            />
          ))}
        </motion.div>
      </div>

      {/* Footer Text */}
      <div className="mt-12 text-center">
        <p className="inline-block border border-white border-opacity-30 px-6 py-2 rounded-full text-sm font-medium">
          More than <span className="font-bold">200+</span> companies trusted us
          worldwide
        </p>
      </div>
    </section>
  );
};

export default Brands;
