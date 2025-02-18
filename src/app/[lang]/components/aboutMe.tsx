import IMAGES from "@/assetes/images";
import Image from "next/image";

const AboutMe = () => {
  return (
    <section className="py-20 px-6 lg:px-20 flex flex-col lg:flex-row items-center">
      {/* Left Side - Image Section */}
      <div className="relative w-full lg:w-2/5 flex ">
        <div className=" rounded-full border border-white border-opacity-20 p-8 lg:w-full lg:h-[90vh]">
          <div className="relative rounded-full  overflow-hidden lg:w-full lg:h-full">
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
          <Image src="/figma-icon.png" alt="Figma" width={40} height={40} />
        </div>
        <div className="absolute bottom-5 left-5 w-10 h-10">
          <Image
            src="/photoshop-icon.png"
            alt="Photoshop"
            width={40}
            height={40}
          />
        </div>
        <div className="absolute bottom-5 right-5 w-10 h-10">
          <Image src="/sketch-icon.png" alt="Sketch" width={40} height={40} />
        </div>
      </div>

      {/* Right Side - Text Section */}
      <div className="lg:w-3/5 mt-12 lg:mt-0 lg:pl-16">
        <h3 className="text-orange-500 text-sm uppercase tracking-widest">
          About Me
        </h3>
        <h2 className="text-3xl lg:text-4xl font-medium mt-8 leading-tight">
          I&apos;m <span className="font-thin">Creative Director</span> and
          <span className="font-thin"> UI-UX Designer</span> from
          <span className="text-orange-500"> Sydney, Australia</span>, working
          in
          <span className="text-orange-500"> web development</span> and print
          media.
        </h2>
        <p className="text-gray-400 mt-6 leading-relaxed">
          I enjoy turning complex problems into simple, beautiful, and intuitive
          designs. My aim is to bring across your message and identity in the
          most creative way. I have created web designs for many well-known
          brands.
        </p>

        {/* Stats Section */}
        <div className="mt-10 flex gap-12">
          <div>
            <h3 className="text-3xl font-bold">100%</h3>
            <p className="text-gray-400 text-sm uppercase">
              Clients Satisfaction
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">6700</h3>
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
