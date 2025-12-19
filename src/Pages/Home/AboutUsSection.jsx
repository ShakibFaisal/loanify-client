import React from "react";
import aboutImage from "../../assets/contact.png"; // replace with your image

const AboutUsSection = () => {
  return (
    <div className="max-w-6xl mx-auto my-12 flex flex-col md:flex-row items-center gap-10 px-4">
      
      {/* Image Section */}
      <div className="md:w-1/2">
        <img
          src={aboutImage}
          alt="About Us"
          className="w-full h-full object-cover rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl"
        />
      </div>

      {/* Text Section */}
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold mb-4 text-base-content">
          Why Choose Loanify?
        </h2>
        <p className="text-base-content/70 mb-4">
          We provide fast, secure, and reliable loan services. Our goal is to make borrowing easy and transparent for everyone.
        </p>
        <ul className="list-disc list-inside text-base-content/70 space-y-2">
          <li>Quick loan approvals</li>
          <li>Flexible repayment plans</li>
          <li>Trusted by thousands of users</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUsSection;
