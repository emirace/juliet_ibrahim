import IMAGES from "@/assetes/images";
import Image from "next/image";

const AboutMe3 = () => {
  return (
    <section className="relative py-16 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="relative flex justify-center items-center ">
          <div className="relative -rotate-6">
            <Image
              src={IMAGES.about}
              alt="Teamwork"
              width={180}
              height={140}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div>
          <h2 className="text-3xl lg:text-4xl font-medium mt-8 leading-tight">
            Beyond the Spotlight
          </h2>
          <p className="text-gray-400 mt-4">
            Off-screen, Juliet is a humanitarian at heart. Passionate about
            giving back, she champions causes in education, women’s rights, and
            social justice. Her global influence is further reflected in her
            collaborations with esteemed brands like Glo, Moet & Chandon, Dana
            Air, Gulder, Boom Play, Dubai Economy & Tourism, Ghana Tourism,
            Marriott Hotels, Martini, South African Tourism, Tecno Mobile, and
            United Airlines.
          </p>
        </div>
        <div className="relative flex justify-center items-center bg-red-500">
          <div className="absolute  rotate-6">
            <Image
              src={IMAGES.about}
              alt="Teamwork"
              width={180}
              height={140}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe3;
