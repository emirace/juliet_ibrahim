import Image from "next/image";

const services = [
  {
    title: "Web Design",
    description:
      "This is the main factor that sets us apart from our competition and allows us.",
    image: "/web-design.jpg", // Replace with actual image paths
  },
  {
    title: "Branding",
    description:
      "This is the main factor that sets us apart from our competition and allows us.",
    image: "/branding.jpg",
  },
  {
    title: "Marketing",
    description:
      "This is the main factor that sets us apart from our competition and allows us.",
    image: "/marketing.jpg",
  },
];

export default function Services() {
  return (
    <section className=" py-16 px-6 md:px-20">
      <div className=" grid md:grid-cols-2 gap-12">
        <div>
          <h4 className="text-orange-500 uppercase tracking-widest text-sm font-poppins">
            Trusted Services
          </h4>
          <h2 className="text-4xl md:text-5xl font-medium mt-4">
            The service we offer is specifically designed to meet your needs.
          </h2>
          <p className="text-gray-400 mt-4">
            Driven professionals dedicated to making a lasting impact through
            innovative solutions and unwavering excellence.
          </p>
          <button className="mt-6 flex items-center text-white border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition">
            {/* <ArrowRight className="w-5 h-5 mr-2" /> */}
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
