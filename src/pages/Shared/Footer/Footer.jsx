import React from "react";
import { Link } from "react-router";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/">
              <ProFastLogo className="h-8" />
            </Link>
            <p className="text-gray-600">
              Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
              From personal packages to business shipments — we deliver on time, every time.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/express-delivery" className="text-gray-600 hover:text-blue-600">Express Delivery</Link></li>
              <li><Link to="/standard-delivery" className="text-gray-600 hover:text-blue-600">Standard Delivery</Link></li>
              <li><Link to="/nationwide-coverage" className="text-gray-600 hover:text-blue-600">Nationwide Coverage</Link></li>
              <li><Link to="/cash-on-delivery" className="text-gray-600 hover:text-blue-600">Cash on Delivery</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-blue-600">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-blue-600">Press</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact Us</Link></li>
              <li><Link to="/faqs" className="text-gray-600 hover:text-blue-600">FAQs</Link></li>
              <li><Link to="/shipping-policy" className="text-gray-600 hover:text-blue-600">Shipping Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Profast Courier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
