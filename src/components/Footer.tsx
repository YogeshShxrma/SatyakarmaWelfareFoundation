
import { Leaf, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="font-bold text-xl">SatyaKarma Welfare Foundation Society</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Dedicated to environmental protection, community empowerment, and creating 
              a sustainable future through action and collaboration.
            </p>
            <div className="flex space-x-4">
              <Youtube className="h-6 w-6 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link to="/what-we-do" className="text-gray-300 hover:text-green-400 transition-colors">What We Do</Link></li>
              <li><Link to="/get-involved" className="text-gray-300 hover:text-green-400 transition-colors">Get Involved</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-green-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <p>Email: info@satyakarma.org</p>
              <p>Phone: +91 (0) 123 456 7890</p>
              <p>Address: [Your Address]</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SatyaKarma Welfare Foundation Society. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
