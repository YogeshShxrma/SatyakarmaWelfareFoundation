
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";

const GetInvolved = () => {
  const { t, lang } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t("nav.getInvolved")}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
            {t("getInvolved.subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {t("getInvolved.readyTitle")}
          </h2>
          <form className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input 
                type="text" 
                placeholder={t("contactForm.firstName")} 
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" 
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
              />
              <input 
                type="email" 
                placeholder={t("contactForm.email")} 
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" 
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
              />
            </div>
            <div className="mb-6">
              <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                <option>{t("getInvolved.howToInvolve")}</option>
                <option>{t("contactForm.subjectOptions.volunteer")}</option>
                <option>{t("contactForm.subjectOptions.partner")}</option>
                <option>{t("contactForm.subjectOptions.donate")}</option>
                <option>{t("contactForm.subjectOptions.general")}</option>
              </select>
            </div>
            <div className="mb-6">
              <textarea 
                rows={5} 
                placeholder={t("getInvolved.messagePlaceholder")} 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
              ></textarea>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              {t("contactForm.send")}
            </button>
          </form>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{t("privacyPolicy.title")}</h2>
          <div className="prose prose-lg text-gray-600 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">{t("privacyPolicy.infoTitle")}</h3>
            <p style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
              {t("privacyPolicy.infoContent")}
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800">{t("privacyPolicy.useTitle")}</h3>
            <p style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
              {t("privacyPolicy.useContent")}
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800">{t("privacyPolicy.protectionTitle")}</h3>
            <p style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
              {t("privacyPolicy.protectionContent")}
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800">{t("privacyPolicy.contactTitle")}</h3>
            <p style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
              {t("privacyPolicy.contactContent")}
            </p>
            
            <p className="text-sm text-gray-500">
              {t("privacyPolicy.lastUpdated")}{new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetInvolved;
