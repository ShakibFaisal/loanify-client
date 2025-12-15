import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
   
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="text-gray-600 mt-3">
          Empowering people with simple, transparent, and reliable loan services
        </p>
      </div>

   
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            <span className="font-semibold">Loanify</span> is a digital loan
            management platform designed to make the loan application process
            simple, fast, and transparent. We help users explore loan options,
            apply online, and track their application status easily.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our goal is to remove complexity from financial services and provide
            a smooth experience for both borrowers and administrators.
          </p>
        </div>

        {/* Right Box */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Why Choose Loanify?
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li>✔ Simple & user-friendly loan application</li>
            <li>✔ Secure payment & application tracking</li>
            <li>✔ Transparent approval process</li>
            <li>✔ Modern dashboard for users & admins</li>
            <li>✔ Built with reliability and security in mind</li>
          </ul>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-14 bg-blue-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Our Mission
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our mission is to simplify access to financial support by providing a
          trustworthy digital platform where users can apply for loans with
          confidence, clarity, and convenience.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
