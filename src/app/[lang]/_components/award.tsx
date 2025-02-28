import IMAGES from "@/assetes/images";
import Image from "next/image";

const award = {
  title: "Best Director",
  event: "Ghana Movie Awards 2024",
  images: [IMAGES.image18, IMAGES.image15, IMAGES.image16, IMAGES.image17], // Replace with actual image paths
};

export default function Awards() {
  return (
    <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-8">{award.title}</h2>
      <div className="bg-white text-black p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold">{award.event}</h3>
        <div className="flex items-center gap-4 mt-4 overflow-x-auto">
          {award.images.map((image, index) => (
            <div
              key={index}
              className="w-40 h-72 relative rounded-lg overflow-hidden "
            >
              <Image
                src={image}
                alt={award.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
