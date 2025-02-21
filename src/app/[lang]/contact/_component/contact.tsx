import { CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";

const ContactForm = () => {
  return (
    <section className="bg-black text-white py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side - Contact Info */}
        <div className="bg-[#111] p-8 rounded-lg shadow-md">
          <h2 className="text-primary text-2xl font-semibold mb-4">
            +1234 567 890
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Address</h3>
            <p className="text-gray-400">example address information</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-gray-400">Support@juietibrahim.net</p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <FiFacebook className="text-gray-400 hover:text-white transition duration-300 cursor-pointer text-lg" />
            <FaInstagram className="text-gray-400 hover:text-white transition duration-300 cursor-pointer text-lg" />

            <FaXTwitter className="text-gray-400 hover:text-white transition duration-300 cursor-pointer text-lg" />
            <CiYoutube className="text-gray-400 hover:text-white transition duration-300 cursor-pointer text-lg" />
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div>
          <h4 className="text-primary uppercase text-sm font-poppins font-semibold tracking-widest">
            Let&apos;s Chat
          </h4>
          <h2 className="text-4xl font-thin uppercase">
            <span className="font-bold ">Send a </span> Message
          </h2>

          <form className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="bg-[#111] border border-white border-opacity-10 text-white w-full p-3 rounded-lg focus:outline-none focus:border-primary transition"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-[#111] border border-white border-opacity-10 text-white w-full p-3 rounded-lg focus:outline-none focus:border-primary transition"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="bg-[#111] border border-white border-opacity-10 text-white  p-3 rounded-lg focus:outline-none focus:border-primary transition w-full"
            />
            <textarea
              placeholder="Message"
              className="bg-[#111] border border-white border-opacity-10 text-white p-3 rounded-lg focus:outline-none focus:border-primary transition w-full h-32"
            ></textarea>

            <button className="w-full bg-transparent border border-white text-white py-3 rounded-full hover:bg-primary transition duration-300">
              Let&apos;s Talk
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
