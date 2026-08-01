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
              src={IMAGES.about2}
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
          Juliet Ibrahim is an{" "}
          <span className="text-orange-500">award-winning actress</span>,
          filmmaker, author, entrepreneur, humanitarian and creative
          entrepreneur whose career has inspired{" "}
          <span className="text-orange-500">millions</span> across Africa and
          around the world.
        </h2>
        <p className="text-gray-400 mt-6 leading-relaxed">
          For more than twenty years, she has used storytelling not only to
          entertain but to spark conversations, challenge perceptions, and
          champion meaningful social change. Her work extends far beyond the
          screen, reflecting a lifelong commitment to empowering women,
          investing in young people, and creating opportunities where they are
          needed most.
        </p>
        <p className="text-gray-400 mt-6 leading-relaxed">
          That commitment gave birth to HER STEAM Initiative—a platform
          dedicated to preparing girls and young women for the future through
          education, mentorship, leadership development, innovation, and
          entrepreneurship.
        </p>
        <p className="text-gray-400 mt-6 leading-relaxed">
          Juliet believes that talent is universal, but opportunity is not.
          Through strategic partnerships, transformative programs, and community
          engagement, HER STEAM Initiative is helping bridge that gap by
          equipping the next generation of female innovators with the skills and
          confidence to lead in an increasingly technology-driven world.
        </p>
        <p className="text-gray-400 mt-6 leading-relaxed">
          With every initiative, Juliet Ibrahim continues to prove that true
          success is measured not only by personal achievement but by the lives
          transformed along the way.
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
