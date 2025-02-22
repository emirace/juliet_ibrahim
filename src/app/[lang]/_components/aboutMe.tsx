import IMAGES from "@/assetes/images";
import Image from "next/image";
import { PiFilmReel } from "react-icons/pi";
import { BsCameraReels } from "react-icons/bs";
import { FaChromecast } from "react-icons/fa";

const AboutMe = () => {
  return (
    <section className="relative pt-32 md:pt-20 py-20 px-6 lg:px-20 flex flex-col lg:flex-row items-center">
      {/* Left Side - Image Section */}
      <div className="relative w-full lg:w-2/5 flex ">
        <div className=" rounded-full border border-white border-opacity-20 p-8 w-full h-[90vh]">
          <div className="relative rounded-full  overflow-hidden w-full h-full">
            <Image
              src={IMAGES.about}
              alt="About Me"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>

        {/* Floating icons */}
        <div className="absolute top-5 left-5 w-10 h-10">
          <PiFilmReel className="text-16" />
        </div>
        <div className="absolute bottom-5 left-5 w-10 h-10">
          <BsCameraReels className="text-16" />
        </div>
        <div className="absolute bottom-5 right-5 w-10 h-10">
          <FaChromecast className="text-16" />
        </div>
      </div>

      {/* Right Side - Text Section */}
      <div className="lg:w-3/5 mt-12 lg:mt-0 lg:pl-16">
        <h3 className="absolute top-20 md:top-auto md:left-auto left-10 md:block text-orange-500 text-sm uppercase tracking-widest">
          About Me
        </h3>
        <h2 className="text-2xl lg:text-4xl font-medium mt-8 leading-tight">
          From the heart of <span className="text-orange-500">Accra</span> to
          the global stage of <span className="text-orange-500">Nollywood</span>{" "}
          and beyond, Juliet Ibrahim’s journey is nothing short of
          extraordinary.
        </h2>
        <p className="text-gray-400 mt-6 leading-relaxed">
          Her rise from humble beginnings to becoming one of the most celebrated
          figures in African cinema is a testament to passion, perseverance, and
          authentic artistry. With over two decades of captivating performances,
          every role she takes on tells a story of triumph and transformation—a
          narrative that has inspired millions and redefined the essence of
          modern stardom.
        </p>
        <p className="text-gray-400 mt-6 leading-relaxed">
          Juliet’s influence extends far beyond the silver screen. Her
          commitment to uplifting communities, championing education, and
          advocating for women’s rights shines as brightly as her on-screen
          presence.
        </p>

        <div className="mt-10 flex gap-12">
          <div>
            <h3 className="text-3xl font-bold">100%</h3>
            <p className="text-gray-400 text-sm uppercase">Fans Satisfaction</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">100+</h3>
            <p className="text-gray-400 text-sm uppercase">
              Projects Completed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
