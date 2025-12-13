import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../Provider/AuthContext";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, type = "text", readOnly = false, required = false }) => (
  <div>
    <label className="font-semibold">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
      className="w-full border rounded-lg px-4 py-3 mt-1 bg-white text-gray-900 dark:bg-white dark:text-gray-900"
    />
  </div>
);

// Reusable TextArea Field Component
const TextAreaField = ({ label, name, value, onChange, rows = 3 }) => (
  <div>
    <label className="font-semibold">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full border rounded-lg px-4 py-3 mt-1 bg-white text-gray-900 dark:bg-white dark:text-gray-900"
    />
  </div>
);

const LoanApplication = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    nationalId: "",
    incomeSource: "",
    monthlyIncome: "",
    loanAmount: "",
    reason: "",
    address: "",
    extraNotes: "",
  });
  const axiosSecure = UseAxiosSecure();

  // Fetch loan details
  useEffect(() => {
    
      axiosSecure.get(`/loans/${id}`)
      .then((res) => setLoan(res.data))
      .catch(() => toast.error("Failed to fetch loan details"))
      .finally(() => setLoading(false));
  }, [id]);
  console.log(loan)

  // Redirect if user not logged in
  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to apply for a loan!");
      navigate("/login");
    }
  }, [user, navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!loan) return <p className="text-center mt-10 text-red-600">Loan not found</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const applicationData = {
      userEmail: user?.email || "",
      loanId: loan._id,
      loanTitle: loan.loanTitle,
      interestRate: loan.interestRate,
      ...formData,
      status: "Pending",
      applicationFeeStatus: "Unpaid",
      createdAt: new Date(),
    };

    try {
      await axios.post("/loan-applications", applicationData);
      toast.success("Loan application submitted successfully ✅");
      navigate("/my-loans");
    } catch {
      toast.error("Failed to submit loan application ❌");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white dark:bg-gray-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-900">
        Loan Application Form
      </h2>

      {/* Loan Info Card */}
      <div className="mb-6 p-4 bg-gradient-to-b from-blue-500 to-blue-700 text-white rounded-xl shadow-md flex flex-col md:flex-row items-center md:items-start gap-4">
        <img
          src={loan.loanImage}
          alt={loan.loanTitle}
          className="w-32 h-32 object-cover rounded-full"
        />
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold">{loan.loanTitle}</h3>
          <p>Interest Rate: {loan.interestRate}</p>
          <p>Max Limit: ৳{loan.maxLimit?.toLocaleString() || "N/A"}</p>
          {loan.requiredDocuments && (
            <div className="mt-2 text-sm">
              <p className="font-semibold">Required Documents:</p>
              <ul className="list-disc list-inside">
                {loan.requiredDocuments.map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Auto-filled fields */}
        <InputField label="User Email" type="email" value={user?.email || ""} readOnly />
        <InputField label="Loan Title" value={loan.loanTitle} readOnly />
        <InputField label="Interest Rate" value={loan.interestRate} readOnly />

        {/* User input fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
          <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
          <InputField label="National ID / Passport Number" name="nationalId" value={formData.nationalId} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Income Source" name="incomeSource" value={formData.incomeSource} onChange={handleChange} required />
          <InputField label="Monthly Income" type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} required />
        </div>

        <InputField label="Loan Amount" type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required />
        <TextAreaField label="Reason for Loan" name="reason" value={formData.reason} onChange={handleChange} />
        <TextAreaField label="Address" name="address" value={formData.address} onChange={handleChange} rows={2} />
        <TextAreaField label="Extra Notes" name="extraNotes" value={formData.extraNotes} onChange={handleChange} rows={2} />

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Submit Loan Application
        </button>
      </form>
    </div>
  );
};

export default LoanApplication;
