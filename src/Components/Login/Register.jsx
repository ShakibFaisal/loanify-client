import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthContext";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const Register = () => {
  const { createUserEP, googleLogin, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure()

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("borrower"); // default role

  const togglePassword = () => setShowPassword(!showPassword);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const photo = e.target.photo.value.trim();
    const password = e.target.pass.value.trim();
    const selectedRole = role;

    // Password Validation
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (!/[A-Z]/.test(password)) return setError("Password must contain at least one uppercase letter");
    if (!/[a-z]/.test(password)) return setError("Password must contain at least one lowercase letter");

    try {
      // Create user with email/password
      await createUserEP(email, password);

      // Update display name & photo
      await updateUser(name, photo);

     const userInfo = {
      name,
      email,
      photo,
      role: selectedRole,
    };

    await axiosSecure.post("users", userInfo);

    toast.success("Registered Successfully ✅");
    navigate("/login");
  } catch (err) {
    toast.error(err.message);
  }
  };

  const handleGoogleRegister = async () => {
    try {
      await googleLogin();
      toast.success("Registered with Google 🔐");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f5f7fb] px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

        {/* LEFT */}
        <div className="md:w-1/2 w-full bg-primary text-white p-10 md:p-16 flex flex-col justify-center items-center text-center">
          <div className="text-5xl mb-4">🏦</div>
          <h1 className="text-4xl font-bold mb-3">Loanify 💰</h1>
          <p className="text-lg opacity-90 mb-4">Smart & Secure Loan Platform 🔒</p>
          <p className="text-sm opacity-90 max-w-xs">
            Create an account to access loans, track applications, and manage repayments 📈
          </p>
        </div>

        {/* RIGHT */}
        <div className="md:w-1/2 w-full p-8 md:p-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Create Your Account 👤</h2>

          <form onSubmit={handleRegister} className="space-y-4">

            {/* Name */}
            <div>
              <label className="font-semibold">Full Name</label>
              <input type="text" name="name" placeholder="Your full name" className="w-full border rounded-lg px-4 py-3 mt-1 outline-none" required />
            </div>

            {/* Photo URL */}
            <div>
              <label className="font-semibold">Photo URL</label>
              <input type="text" name="photo" placeholder="Profile image URL" className="w-full border rounded-lg px-4 py-3 mt-1 outline-none" required />
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold">Email 📧</label>
              <input type="email" name="email" placeholder="Enter your email" className="w-full border rounded-lg px-4 py-3 mt-1 outline-none" required />
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="font-semibold">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded-lg px-4 py-3 mt-1 outline-none" required>
                <option value="borrower">Borrower</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="font-semibold">Password 🔑</label>
              <input type={showPassword ? "text" : "password"} name="pass" placeholder="Create a strong password" className="w-full border rounded-lg px-4 py-3 mt-1 outline-none" required />
              <button type="button" onClick={togglePassword} className="absolute right-3 top-[55%] -translate-y-1/2 text-gray-600">
                {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition">
              Register 🚀
            </button>
          </form>

          {/* Google Register */}
          <button onClick={handleGoogleRegister} className="w-full border py-3 rounded-lg mt-6 flex items-center justify-center gap-3 text-lg hover:bg-gray-50 transition">
            <FcGoogle /> Register with Google 🔐
          </button>

          <p className="mt-6 text-center">
            Already have an account? <Link to="/login" className="text-primary font-semibold">Login 📝</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
