"use client";

import React, { useState } from "react";
import SelectCategory from "./_component/category";
import Hero from "./_component/hero";
import SelectService from "./_component/service";
import Calendar from "./_component/calender";
import ClientInfoForm from "./_component/info";

const categories = [
  {
    name: "Event",
    services: ["Event Hosting", "Guest Appearance", "Keynote Speaker"],
  },
  {
    name: "Marketing",
    services: [
      "Brand Ambassadorship Programmes",
      "Corporate/Commercial Partnership",
      "Digital Marketing",
      "Influencing",
      "Shoutouts",
    ],
  },
  {
    name: "TV & Radio",
    services: ["Acting | Producing | Directing", "Interviews"],
  },
];

function Booking() {
  const [step, setStep] = useState("category");
  const [formData, setFormData] = useState({
    category: "",
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phome: "",
  });

  const handleSelectCategory = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
    setStep("service");
  };

  const handleSelectService = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
    setStep("calendar");
  };

  const handleSelectedCalendar = ({
    date,
    time,
  }: {
    date: string;
    time: string;
  }) => {
    setFormData((prev) => ({ ...prev, date, time }));
    setStep("info");
  };

  const services = categories.find(
    (category) => category.name === formData.category
  )?.services;

  const handleSubmit = async (client: {
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, ...client }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = () => {
    switch (step) {
      case "category":
        return <SelectCategory next={handleSelectCategory} />;
      case "service":
        return (
          <SelectService
            options={services || []}
            next={handleSelectService}
            previous={() => setStep("category")}
          />
        );
      case "calendar":
        return (
          <Calendar
            next={handleSelectedCalendar}
            previous={() => setStep("service")}
          />
        );
      case "info":
        return (
          <ClientInfoForm
            previous={() => setStep("calendar")}
            handleSubmit={handleSubmit}
          />
        );

      default:
        break;
    }
  };

  return (
    <div>
      <Hero />
      <div className="w-full max-w-6xl mx-auto py-20">{renderItem()}</div>
    </div>
  );
}

export default Booking;
