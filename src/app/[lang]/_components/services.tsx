import Image from "next/image";

const services = [
  {
    title: "Healthcare Support",
    description:
      "Providing essential medical services and support to underprivileged communities.",
    image: "/healthcare-support.jpg", // Replace with actual image paths
  },
  {
    title: "Educational Programs",
    description:
      "Empowering the youth through educational initiatives and scholarship programs.",
    image: "/educational-programs.jpg",
  },
  {
    title: "Disaster Relief",
    description:
      "Offering immediate assistance and resources to those affected by natural disasters.",
    image: "/disaster-relief.jpg",
  },
];

export default function Services() {
  return (
    <section className=" py-16 px-6 md:px-20">
      <div className=" grid md:grid-cols-2 gap-12">
        <div>
          <h4 className="text-orange-500 uppercase tracking-widest text-sm font-poppins">
            Juliet Ibrahim Foundation
          </h4>
          <h2 className="text-2xl md:text-5xl font-medium mt-4">
            Our services are dedicated to improving lives and providing hope.
          </h2>
          <p className="text-gray-400 mt-4">
            Committed to humanitarian efforts, we strive to make a positive
            impact through healthcare, education, and disaster relief.
          </p>
          <button className="mt-6 flex items-center text-white border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition">
            Learn more
          </button>
        </div>
        <div className="space-y-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex items-center border border-white border-opacity-30 p-6 rounded-lg"
            >
              <div className="w-24 h-24 relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-400 mt-2">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
