import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../assets/Images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Four Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8 text-center md:text-left">
          
          {/* Column 1: Logo and Description */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              <img className="h-10 w-auto inline-block mr-1" src={logo} alt="InfoBook Logo" />
              Info<span className="text-indigo-500">Book</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Your premier destination for the latest electronics and technology. We combine quality, speed, and security in one place.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-indigo-400 transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-indigo-400 transition">Products</Link></li>
              <li><Link to="/products" className="hover:text-indigo-400 transition">Categories</Link></li>
            </ul>
          </div>

          {/* Column 3: Support and Policies */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Terms of Use</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">FAQs</a></li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Follow Us</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition text-xl">
                <FaFacebook />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition text-xl">
                <FaLinkedin />
              </a>
            </div>
          </div>

        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-xs text-gray-500">
            Copyright © 2026 All rights reserved to <span className="text-gray-400 font-medium">InfoBook</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;