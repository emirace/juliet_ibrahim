"use client";
import React from "react";
import ReactPlayer from "react-player/youtube";

const videos = [
  { id: 1, url: "https://youtu.be/UncLikIMfKI" },
  { id: 2, url: "https://youtu.be/3CDqcMoadaE" },
];

const FilmographySection = () => {
  return (
    <div className="py-20 px-6 lg:px-20">
      <div className="flex flex-row items-center justify-between mb-6">
        <div>
          <div className="text-3xl lg:text-5xl font-thin mt-4 leading-tight">
            <span className="font-bold">SELECTED</span> WORKS.
          </div>
        </div>
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
              //   width="100%"
              //   height="200px"
              //   controls
              //   light // Shows thumbnail preview
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmographySection;
