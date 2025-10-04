
import { Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const { t, lang } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-zinc-900">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/assets/logo.png" alt={t("footer.org") + " Logo"} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h3 className="font-lato font-bold text-lg">{t("footer.org")}</h3>
                <p className="text-sm text-gray-400">{t("footer.society")}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
              {t("footer.desc")}
            </p>
            <p className="text-sm text-gray-400" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
              {t("footer.motto")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">{t("nav.about")}</a></li>
              <li><a href="/what-we-do" className="text-gray-300 hover:text-white transition-colors">{t("nav.whatWeDo")}</a></li>
              <li><a href="/get-involved" className="text-gray-300 hover:text-white transition-colors">{t("nav.getInvolved")}</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors">{t("nav.blog")}</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">{t("nav.contact")}</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t("footer.connect")}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">{t("footer.email")}</span>
              </div>
               <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">{t("footer.email")}</span>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="https://m.facebook.com/61557486574874/" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://x.com/Satyakarmango" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/satyakarmango?igsh=amJtaXBycHVmcm1u" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
