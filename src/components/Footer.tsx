import { Mail, Instagram, Facebook, Twitter } from "lucide-react";
const Footer = () => {
  return <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-zinc-900">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/lovable-uploads/da4b2fb3-1e46-41c3-a9bd-6504bde7a5d0.png" alt="SatyaKarma Logo" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h3 className="font-lato font-bold text-lg">SatyaKarma</h3>
                <p className="text-sm text-gray-400">Welfare Foundation Society</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Searching for truth through action. Creating sustainable positive change 
              through environmental protection, children's wellness, and community empowerment.
            </p>
            <p className="text-sm text-gray-400">
              कर्म में सत्य की खोज करें
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/what-we-do" className="text-gray-300 hover:text-white transition-colors">What We Do</a></li>
              <li><a href="/get-involved" className="text-gray-300 hover:text-white transition-colors">Get Involved</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Connect</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">info@satyakarma.org</span>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 SatyaKarma Welfare Foundation Society. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;