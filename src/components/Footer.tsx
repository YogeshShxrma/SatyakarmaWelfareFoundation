
import { Mail, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white dark:bg-background dark:text-foreground dark:border-t dark:border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/da4b2fb3-1e46-41c3-a9bd-6504bde7a5d0.png" 
                alt="SatyaKarma Logo" 
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h3 className="font-lato font-bold text-lg">SatyaKarma</h3>
                <p className="text-sm text-lightblue dark:text-muted-foreground">Welfare Foundation Society</p>
              </div>
            </div>
            <p className="text-lightblue dark:text-muted-foreground mb-4 leading-relaxed">
              Searching for truth through action. Creating sustainable positive change 
              through environmental protection, children's wellness, and community empowerment.
            </p>
            <p className="text-sm text-lightblue dark:text-muted-foreground">
              कर्म में सत्य की खोज करें
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-lightblue dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="/what-we-do" className="text-lightblue dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors">What We Do</a></li>
              <li><a href="/get-involved" className="text-lightblue dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors">Get Involved</a></li>
              <li><a href="/blog" className="text-lightblue dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-lightblue dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Connect</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-lightblue dark:text-muted-foreground" />
                <span className="text-lightblue dark:text-muted-foreground text-sm">info@satyakarma.org</span>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-lightblue dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-lightblue dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-lightblue dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-lightblue dark:border-border mt-8 pt-8 text-center">
          <p className="text-lightblue dark:text-muted-foreground text-sm">
            © 2024 SatyaKarma Welfare Foundation Society. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
