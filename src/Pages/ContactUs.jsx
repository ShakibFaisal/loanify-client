import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import contactImage from "../assets/contact.png"; // replace with your image

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-5xl mx-auto my-12 bg-base-100 rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row">

      {/* Left Image */}
      <div className="md:w-1/2">
        <img
          src={contactImage}
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-base-content">
          Contact Us
        </h2>
        <p className="mb-6 text-base-content/70">
          Have questions or feedback? We'd love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-base-content/50" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full pl-10 pr-3 py-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-base-content/50" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full pl-10 pr-3 py-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition"
            />
          </div>

          {/* Message */}
          <div className="relative">
            <FaCommentDots className="absolute top-3 left-3 text-base-content/50" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows={5}
              className="w-full pl-10 pr-3 py-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary text-base-100 px-6 py-3 rounded-lg hover:bg-primary/90 transition shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
