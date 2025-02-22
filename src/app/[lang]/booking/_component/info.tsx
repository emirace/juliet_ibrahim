"use client";

import React, { useState } from "react";

const ClientInfoForm: React.FC<{ previous: () => void }> = ({ previous }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Client Info:", { name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit} className="px-4">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Client Information</h2>
        <p className="text-gray-400 mt-2">
          Please fill out the form below with your information. This will help
          us get in touch with you.
        </p>
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium ">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-4 border border-white/20 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium ">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-4 border border-white/20 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block font-medium ">
          Phone Number:
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-4 border border-white/20 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div className="flex items-center gap-4 mt-8">
        <button
          className={` px-4 py-2 rounded-md border border-primary text-primary font-semibold transition`}
          onClick={() => previous()}
        >
          Back
        </button>
        <button
          // type="submit"
          className="w-full px-4 py-2 bg-primary text-white font-medium rounded-md shadow-sm hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ClientInfoForm;
