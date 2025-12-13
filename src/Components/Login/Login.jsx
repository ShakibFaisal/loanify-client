import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthContext";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.pass.value;

    signIn(email, password)
      .then(() => {
        toast.success("Login successful ✅");
        navigate(location.state || "/");
      })
      .catch((error) => toast.error(error.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Login successful 🔐");
        navigate(location.state || "/");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f5f7fb] px-4 py-10 ">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

        {/* LEFT */}
        <div className="md:w-1/2 w-full bg-primary text-white p-10 md:p-16 flex flex-col justify-center items-center text-center">
          <div className="text-5xl mb-4">🏦</div>
          <h1 className="text-4xl font-bold mb-3">
            Loanify 💰
          </h1>
          <p className="text-lg opacity-90 mb-4">
            Smart & Secure Loan Platform 🔒
          </p>
          <p className="text-sm opacity-90 max-w-xs">
            Access loans, track applications, and manage repayments with confidence 📈
          </p>
        </div>

        {/* RIGHT */}
        <div className="md:w-1/2 w-full p-8 md:p-14 ">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Login to Your Account 👤
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-semibold">Email 📧</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="relative">
              <label className="font-semibold">Password 🔑</label>
              <input
                type={showPassword ? "text" : "password"}
                name="pass"
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-primary"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[55%] -translate-y-1/2 text-gray-600"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </button>
            </div>

            <div className="flex justify-end">
              <Link to="/reset" className="text-sm text-primary hover:underline">
                Forgot password? ❓
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition"
            >
              Login 🚀
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="w-full border py-3 rounded-lg mt-6 flex items-center justify-center gap-3 text-lg hover:bg-gray-50 transition"
          >
            <FcGoogle /> Login with Google 🔐
          </button>

          <p className="mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Sign up 📝
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;