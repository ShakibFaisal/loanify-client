import React, { useState } from "react";
import toast from "react-hot-toast";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import axios from "axios";

const AddLoan = () => {
  const axiosSecure = UseAxiosSecure();
  const imgbbKey = import.meta.env.VITE_IMGBB_KEY;

  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    loanTitle: "",
    description: "",
    category: "",
    interestRate: "",
    maxLimit: "",
    requiredDocuments: "",
    emiPlans: "",
    imageFile: null,
    showOnHome: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  // 🔥 Upload image to imgbb
  const uploadImage = async (image) => {
    const form = new FormData();
    form.append("image", image);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
      form
    );

    return res.data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setImageUploading(true);

      // Upload image
      const imageURL = await uploadImage(formData.imageFile);

      const loanData = {
        loanTitle: formData.loanTitle,
        description: formData.description,
        category: formData.category,
        interestRate: formData.interestRate,
        maxLimit: Number(formData.maxLimit),
        requiredDocuments: formData.requiredDocuments
          .split(",")
          .map((d) => d.trim()),
        availableEMIPlan: formData.emiPlans
          .split(",")
          .map((e) => Number(e.trim())),
        loanImage: imageURL,
        showOnHome: formData.showOnHome,
        createdAt: new Date(),
      };

      await axiosSecure.post("/loans", loanData);

      toast.success("Loan added successfully!");
      e.target.reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add loan");
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Add New Loan</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="loanTitle"
          placeholder="Loan Title"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="interestRate"
          placeholder="Interest Rate (%)"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="number"
          name="maxLimit"
          placeholder="Max Loan Limit"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="requiredDocuments"
          placeholder="NID, Bank Statement"
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          name="emiPlans"
          placeholder="6, 12, 24"
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        {/* 🔥 Image Upload */}
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="showOnHome"
            onChange={handleChange}
          />
          Show on Home
        </label>

        <button
          disabled={imageUploading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {imageUploading ? "Uploading..." : "Add Loan"}
        </button>
      </form>
    </div>
  );
};

export default AddLoan;
