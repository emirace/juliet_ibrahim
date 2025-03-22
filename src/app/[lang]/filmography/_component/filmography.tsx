"use client";
import React from "react";
import ReactPlayer from "react-player/youtube";

const videos = [
  { id: 3, url: "https://youtu.be/TJlhqPY8kEM" },
  { id: 1, url: "https://youtu.be/UncLikIMfKI" },
  { id: 2, url: "https://youtu.be/3CDqcMoadaE" },
  { id: 4, url: "https://youtu.be/Q_t_QIXH3v4?si=plBjqLuRCYaABTDp" },
  { id: 5, url: "https://youtu.be/v9OXZ7B1SQw?si=gnmn5ao3EDHVZoUz" },
  { id: 6, url: "https://youtu.be/ExrkTxBx6pk?si=bzCiAymIgnS8oiz8" },
  { id: 6, url: "https://youtu.be/8SUvbGNQm9g?si=_Rsrhu4Gz-T7KdSi" },
  { id: 6, url: "https://youtu.be/yHr0hye-k84?si=SWzMRGEQkKTeW_sW" },
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
              width="100%"
              //   height="200px"
              //   controls
              // light // Shows thumbnail preview
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmographySection;
