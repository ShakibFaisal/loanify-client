import React from "react";

const steps = [
  {
    step: "01",
    title: "Choose Loan",
    description:
      "Browse available loan options and select the one that fits your needs.",
  },
  {
    step: "02",
    title: "Apply Online",
    description:
      "Fill out the online application form with required details and documents.",
  },
  {
    step: "03",
    title: "Get Approval",
    description:
      "Our team reviews your application and approves it quickly.",
  },
  {
    step: "04",
    title: "Receive Funds",
    description:
      "Once approved, the loan amount is transferred to your account.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-11/12 mx-auto text-center">
        
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          How It Works
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Get your loan in just a few simple steps
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl font-bold">
                {item.step}
              </div>

              <h3 className="text-xl font-semibold mt-4 text-gray-800">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
