import React from "react";
import logo from "../../assets/logo.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#16578D] to-[#6da2cd] text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          
          {/* Logo & Project Info */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <img src={logo} alt="LoanLink Logo" className="w-36 mb-4" />
            <p className="text-sm">
              <strong>LoanLink</strong> is a web-based microloan request, review & approval management system. Many small financial organizations, NGOs, and microloan providers struggle to maintain loan applications, verification, approvals, EMI schedules, and repayments in one platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul>
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/available" className="hover:underline">All Loans</a></li>
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-200"><FaFacebookF /></a>
              <a href="#" className="hover:text-gray-200"><FaTwitter /></a>
              <a href="#" className="hover:text-gray-200"><FaLinkedinIn /></a>
              <a href="#" className="hover:text-gray-200"><FaInstagram /></a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} LoanLink. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
