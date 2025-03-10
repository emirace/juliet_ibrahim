"use client";
import { useState } from "react";
import { CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong!");

      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black text-white py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side - Contact Info */}
        <div className="bg-[#111] p-8 rounded-lg shadow-md">
          <h2 className="text-primary text-2xl font-semibold mb-4">
            Contact Us
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Phone</h3>
            <p className="text-gray-400">+233 267 065 858, +234 807 748 7580</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-gray-400">info@juietibrahim.net</p>
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
            <span className="font-bold">Send a </span> Message
          </h2>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Error / Success Messages */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-[#111] border border-white border-opacity-10 text-white w-full p-3 rounded-lg focus:outline-none focus:border-primary transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#111] border border-white border-opacity-10 text-white w-full p-3 rounded-lg focus:outline-none focus:border-primary transition"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="bg-[#111] border border-white border-opacity-10 text-white p-3 rounded-lg focus:outline-none focus:border-primary transition w-full"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="bg-[#111] border border-white border-opacity-10 text-white p-3 rounded-lg focus:outline-none focus:border-primary transition w-full h-32"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-transparent border border-white text-white py-3 rounded-full hover:bg-primary transition duration-300 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Let&apos;s Talk"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
