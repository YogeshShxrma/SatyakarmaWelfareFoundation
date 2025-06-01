
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "What We Do", href: "/what-we-do" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-2 border-teal-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 hover-scale group">
              <div className="relative">
                <img 
                  src="/lovable-uploads/da4b2fb3-1e46-41c3-a9bd-6504bde7a5d0.png" 
                  alt="SatyaKarma Logo" 
                  className="h-14 w-14 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-violet-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="font-bold text-2xl bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent">
                  SatyaKarma
                </span>
                <p className="text-sm font-medium text-gray-600 -mt-1">Welfare Foundation</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-teal-600 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover-scale story-link bg-white/50 hover:bg-gradient-to-r hover:from-teal-50 hover:to-violet-50 border border-transparent hover:border-teal-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-teal-600 transition-colors p-2 rounded-lg hover:bg-teal-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-t border-teal-100">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-teal-600 block px-4 py-3 rounded-xl text-base font-semibold transition-all hover:bg-gradient-to-r hover:from-teal-50 hover:to-violet-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
