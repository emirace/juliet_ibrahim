"use client";
import Link from "next/link";
import React from "react";
import ReactPlayer from "react-player/youtube";

const videos = [
  { id: 3, url: "https://youtu.be/TJlhqPY8kEM" },
  { id: 1, url: "https://youtu.be/UncLikIMfKI" },
  { id: 2, url: "https://youtu.be/3CDqcMoadaE" },
];

const Filmography = () => {
  return (
    <div className="py-20 px-6 lg:px-20">
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between mb-6">
        <div>
          <div className="text-primary font-poppins text-sm uppercase tracking-widest">
            FILMOGRAPHY
          </div>
          <div className="text-3xl lg:text-5xl font-thin mt-4 leading-tight">
            <span className="font-bold">SELECTED</span> WORKS.
          </div>
        </div>
        <Link
          href="/filmography"
          className="hidden md:block px-8 py-2 border border-white rounded-full font-semibold transition hover:bg-white hover:text-black"
        >
          VIEW ALL
        </Link>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-6 mt-12">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative group rounded-lg overflow-hidden"
          >
            {/* Video Preview */}
            <ReactPlayer
              url={video.url}
              width="100%"
              //   height="200px"
              //   controls
              //   light // Shows thumbnail preview
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <Link
          href="/filmography"
          className="md:hidden  px-8 py-2 border border-white rounded-full font-semibold transition hover:bg-white hover:text-black"
        >
          VIEW ALL
        </Link>
      </div>
    </div>
  );
};

export default Filmography;
