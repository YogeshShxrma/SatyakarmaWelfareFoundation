
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GlareCard from "@/components/ui/GlareCard";
import MembersSection from "@/components/about/MembersSection";
import { useTranslation } from "@/hooks/useTranslation";

const About = () => {
  const { t, lang } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t("about.title")}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{t("about.historyTitle")}</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6 leading-relaxed" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
              {t("about.historyPara1")}
            </p>
            <p className="mb-6 leading-relaxed" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
              {t("about.historyPara2")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{t("about.missionTitle")}</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              {t("about.missionQuote")}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
              {t("about.missionDesc")}
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>{t("about.missionPoint1")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>{t("about.missionPoint2")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>{t("about.missionPoint3")}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>{t("about.missionPoint4")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Values Section with GlareCard effects */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{t("about.valuesTitle")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <GlareCard>
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold text-green-600 mb-4">{t("about.value1Title")}</h3>
                <p className="text-gray-600" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                  {t("about.value1Desc")}
                </p>
              </div>
            </GlareCard>
            
            <GlareCard>
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold text-green-600 mb-4">{t("about.value2Title")}</h3>
                <p className="text-gray-600" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                  {t("about.value2Desc")}
                </p>
              </div>
            </GlareCard>
            
            <GlareCard>
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold text-green-600 mb-4">{t("about.value3Title")}</h3>
                <p className="text-gray-600" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                  {t("about.value3Desc")}
                </p>
              </div>
            </GlareCard>
            
            <GlareCard>
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold text-green-600 mb-4">{t("about.value4Title")}</h3>
                <p className="text-gray-600" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                  {t("about.value4Desc")}
                </p>
              </div>
            </GlareCard>
            
            <GlareCard>
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold text-green-600 mb-4">{t("about.value5Title")}</h3>
                <p className="text-gray-600" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                  {t("about.value5Desc")}
                </p>
              </div>
            </GlareCard>
            
            <GlareCard>
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold text-green-600 mb-4">{t("about.value6Title")}</h3>
                <p className="text-gray-600" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                  {t("about.value6Desc")}
                </p>
              </div>
            </GlareCard>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <MembersSection />

      <Footer />
    </div>
  );
};

export default About;
