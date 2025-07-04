import React from "react";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <a href="/">
              <ProFastLogo className="h-8" />
            </a>
            <p className="text-gray-600">
              Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
              From personal packages to business shipments — we deliver on time, every time.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-500 hover:text-blue-600">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-500 hover:text-blue-400">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-500 hover:text-pink-600">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-500 hover:text-blue-700">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" className="text-gray-500 hover:text-red-600">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="/express-delivery" className="text-gray-600 hover:text-blue-600">Express Delivery</a></li>
              <li><a href="/standard-delivery" className="text-gray-600 hover:text-blue-600">Standard Delivery</a></li>
              <li><a href="/nationwide-coverage" className="text-gray-600 hover:text-blue-600">Nationwide Coverage</a></li>
              <li><a href="/cash-on-delivery" className="text-gray-600 hover:text-blue-600">Cash on Delivery</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-600 hover:text-blue-600">About Us</a></li>
              <li><a href="/careers" className="text-gray-600 hover:text-blue-600">Careers</a></li>
              <li><a href="/blog" className="text-gray-600 hover:text-blue-600">Blog</a></li>
              <li><a href="/press" className="text-gray-600 hover:text-blue-600">Press</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-gray-600 hover:text-blue-600">Contact Us</a></li>
              <li><a href="/faqs" className="text-gray-600 hover:text-blue-600">FAQs</a></li>
              <li><a href="/shipping-policy" className="text-gray-600 hover:text-blue-600">Shipping Policy</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</a></li>
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