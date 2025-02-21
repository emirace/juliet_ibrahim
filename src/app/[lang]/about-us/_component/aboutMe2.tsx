import IMAGES from "@/assetes/images";
import Image from "next/image";

const AboutMe2 = () => {
  return (
    <section className="relative bg-black text-white py-16 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-medium mt-8 leading-tight">
            From Humble Beginnings to Global Stardom
          </h2>
          <p className="text-gray-400 mt-4">
            Juliet’s journey began in a modest environment where determination
            and innate creativity paved the way to a luminous career. Her
            breakthrough transformed her into one of Nollywood’s most respected
            figures, earning accolades and a devoted global fan base across
            bustling metropolises like London, New York, and beyond.
          </p>
        </div>
        <div className="">
          <h2 className="text-3xl lg:text-4xl font-medium mt-8 leading-tight">
            A Multifaceted Persona
          </h2>
          <p className="text-gray-400 mt-4">
            With a breathtaking blend of vulnerability and strength, Juliet sets
            new standards in beauty, integrity, and creativity. Her dynamic
            performances in films such as &quot;4 Play,&quot; &quot;30 Days in
            Atlanta,&quot; &quot;Number One Fan,&quot; &quot;Every Woman Has a
            Story,&quot; and &quot;Shattered Romance&quot; showcase her
            versatility. Beyond the screen, she is a celebrated author—her
            memoir, &quot;A Toast to Life,&quot; offers an intimate look at her
            personal struggles and triumphs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe2;
