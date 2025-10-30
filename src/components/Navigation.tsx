import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Settings } from "lucide-react";
import LanguageSwitcher from "./ui/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {
    t
  } = useTranslation();
  const navItems = [{
    name: t("nav.home"),
    href: "/"
  }, {
    name: t("nav.about"),
    href: "/about"
  }, {
    name: t("nav.whatWeDo"),
    href: "/what-we-do"
  }, {
    name: t("nav.getInvolved"),
    href: "/get-involved"
  }, {
    name: t("nav.blog"),
    href: "/blog"
  }, {
    name: t("nav.contact"),
    href: "/contact"
  }];

  // Handler for secret admin logo shortcut
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Mac: shift+meta, Windows: shift+ctrl
    if (e.shiftKey && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigate("/admin-login");
    }
    // else: default link to homepage
  };
  return <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group" onClick={handleLogoClick} title="SatyaKarma">
              <img src="/database/asset/logo.png" alt="SatyaKarma Logo" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <span className="font-lato font-bold text-xl text-gray-800">
                  SatyaKarma
                </span>
                <p className="text-xs text-gray-600 -mt-1">{t("footer.society")}</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map(item => <Link key={item.name} to={item.href} className="text-gray-700 hover:text-sage-600 px-4 py-2 text-sm font-medium transition-colors duration-200 relative group">
                  {item.name}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-sage-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>)}

              <div className="ml-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-sage-600 transition-colors p-2">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden fade-in">
            <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t border-gray-100">
              {navItems.map(item => <Link key={item.name} to={item.href} className="text-gray-700 hover:text-sage-600 block px-3 py-2 text-base font-medium transition-colors" onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>)}
              
              <div className="mt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;