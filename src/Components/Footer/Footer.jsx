import React from "react";
import logo from "../../assets/logo.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-base-100 pt-10 pb-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">

          {/* Logo & Project Info */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <img src={logo} alt="LoanLink Logo" className="w-36 mb-4" />
            <p className="text-base-100/80 text-sm">
              <strong>LoanLink</strong> is a web-based microloan request, review & approval management system. Many small financial organizations, NGOs, and microloan providers struggle to maintain loan applications, verification, approvals, EMI schedules, and repayments in one platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h3 className="text-lg font-semibold mb-3 text-base-100">Quick Links</h3>
            <ul>
              <li><a href="/" className="hover:text-secondary transition-colors">Home</a></li>
              <li><a href="/available" className="hover:text-secondary transition-colors">All Loans</a></li>
              <li><a href="/about" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-secondary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-3 text-base-100">Follow Us</h3>
            <div className="flex space-x-4 text-base-100/80">
              <a href="#" className="hover:text-secondary transition-colors"><FaFacebookF /></a>
              <a href="#" className="hover:text-secondary transition-colors"><FaTwitter /></a>
              <a href="#" className="hover:text-secondary transition-colors"><FaLinkedinIn /></a>
              <a href="#" className="hover:text-secondary transition-colors"><FaInstagram /></a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-base-300" />

        <div className="text-center text-sm text-base-100/70">
          &copy; {new Date().getFullYear()} LoanLink. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
