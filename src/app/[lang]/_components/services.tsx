import IMAGES from "@/assetes/images";
import Image from "next/image";
import Link from "next/link";

const initiatives = [
  {
    title: "STEAM Education",
    description:
      "Providing young girls with access to quality education in Science, Technology, Engineering, Arts, and Mathematics (STEAM).",
    image: IMAGES.image12,
  },
  {
    title: "Mentorship Programs",
    description:
      "Connecting girls with industry leaders and professionals to guide them in their STEAM careers.",
    image: IMAGES.image13,
  },
  {
    title: "Innovation & Technology",
    description:
      "Encouraging creativity and problem-solving through hands-on projects and technological advancements.",
    image: IMAGES.image14,
  },
];
export default function Services() {
  return (
    <section className="py-16 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h4 className="text-orange-500 uppercase tracking-widest text-sm font-poppins">
            Juliet Ibrahim Foundation
          </h4>
          <h2 className="text-2xl md:text-5xl font-medium mt-4">
            Empowering Girls, Shaping Futures, Transforming Communities through
            STEAM.
          </h2>
          <p className="text-gray-400 mt-4">
            Join us in bridging the gender gap in Science, Technology,
            Engineering, Arts, and Mathematics (STEAM) across Africa. Together,
            we can unlock potential, drive innovation, and create a brighter
            future.
          </p>
          <Link
            href="https://www.hersteaminitiative.org/"
            className="mt-6 inline-block text-white  border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition"
          >
            Get Involved
          </Link>
        </div>
        <div className="space-y-6 w-full ">
          {initiatives.map((initiative, index) => (
            <div
              key={index}
              className="flex items-center border border-white border-opacity-30 p-6 rounded-lg"
            >
              <div className="w-1/2 h-40 relative">
                <Image
                  src={initiative.image}
                  alt={initiative.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="ml-6 w-1/2">
                <h3 className="text-xl font-semibold">{initiative.title}</h3>
                <p className="text-gray-400 mt-2">{initiative.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
