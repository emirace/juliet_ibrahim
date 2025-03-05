import IMAGES from "@/assetes/images";
import Image from "next/image";
import Link from "next/link";

const AboutMe = () => {
  return (
    <section className="relative py-16 px-4 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="relative flex gap-8">
          {" "}
          <Image
            src={IMAGES.logo}
            alt="Logo"
            width={300}
            height={300}
            className="absolute bottom-0 left-0"
          />
          <div className="w-1/2 mb-12 z-20">
            <Image
              src={IMAGES.image7}
              alt="Creative team working"
              width={500}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-1/2 mt-12">
            <Image
              src={IMAGES.image8}
              alt="Creative team working"
              width={500}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-medium mt-8 leading-tight">
            A Force of Elegance, Resilience, and Global Influence
          </h2>
          <p className="text-gray-400 mt-6 ">
            Juliet Ibrahim is more than an acclaimed actress and style
            icon—she’s a trailblazer whose journey of passion, perseverance, and
            authenticity has inspired millions. Born and raised in Accra, Ghana,
            her raw talent and undeniable charisma have redefined the face of
            African cinema, captivating audiences in Nollywood and on the
            international stage.
          </p>

          {/* Our Services Link */}
          <div className="mt-6">
            <Link
              href="/filmography"
              className="text-primary  font-medium hover:underline flex items-center"
            >
              Filmography
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
