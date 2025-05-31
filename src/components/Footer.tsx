
import { Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo and Mission */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/da4b2fb3-1e46-41c3-a9bd-6504bde7a5d0.png" 
                alt="SatyaKarma Logo" 
                className="h-16 w-16"
              />
              <div>
                <span className="font-bold text-2xl block">SatyaKarma</span>
                <span className="text-blue-300 text-lg">Welfare Foundation Society</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              Dedicated to environmental protection, community empowerment, and creating 
              a sustainable future through action and collaboration.
            </p>
            <p className="text-blue-300 mb-6 font-semibold">
              कर्म में सत्य की खोज करें
            </p>
            <div className="flex space-x-4">
              <Youtube className="h-8 w-8 text-gray-400 hover:text-blue-400 cursor-pointer transition-all hover-scale" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-blue-300">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors story-link text-lg">About Us</Link></li>
              <li><Link to="/what-we-do" className="text-gray-300 hover:text-blue-400 transition-colors story-link text-lg">What We Do</Link></li>
              <li><Link to="/get-involved" className="text-gray-300 hover:text-blue-400 transition-colors story-link text-lg">Get Involved</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-blue-400 transition-colors story-link text-lg">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors story-link text-lg">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-blue-300">Contact Info</h3>
            <div className="space-y-3 text-gray-300 text-lg">
              <p className="hover:text-blue-400 transition-colors">Email: info@satyakarma.org</p>
              <p className="hover:text-blue-400 transition-colors">Phone: +91 (0) 123 456 7890</p>
              <p className="hover:text-blue-400 transition-colors">Address: [Your Address]</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p className="text-lg">&copy; 2024 SatyaKarma Welfare Foundation Society. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
