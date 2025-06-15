
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Leaf, TreeDeciduous, Users } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const WhatWeDo = () => {
  const { t, lang } = useTranslation();
  
  const programs = [
    {
      icon: <Leaf className="h-16 w-16 text-green-600" />,
      title: t("whatWeDo.program1Title"),
      description: t("whatWeDo.program1Desc"),
      initiatives: [
        t("whatWeDo.program1Init1"),
        t("whatWeDo.program1Init2"),
        t("whatWeDo.program1Init3"),
        t("whatWeDo.program1Init4")
      ],
      impact: t("whatWeDo.program1Impact")
    },
    {
      icon: <Users className="h-16 w-16 text-green-600" />,
      title: t("whatWeDo.program2Title"),
      description: t("whatWeDo.program2Desc"),
      initiatives: [
        t("whatWeDo.program2Init1"),
        t("whatWeDo.program2Init2"),
        t("whatWeDo.program2Init3"),
        t("whatWeDo.program2Init4")
      ],
      impact: t("whatWeDo.program2Impact")
    },
    {
      icon: <TreeDeciduous className="h-16 w-16 text-green-600" />,
      title: t("whatWeDo.program3Title"),
      description: t("whatWeDo.program3Desc"),
      initiatives: [
        t("whatWeDo.program3Init1"),
        t("whatWeDo.program3Init2"),
        t("whatWeDo.program3Init3"),
        t("whatWeDo.program3Init4")
      ],
      impact: t("whatWeDo.program3Impact")
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t("nav.whatWeDo")}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
            {t("whatWeDo.subtitle")}
          </p>
        </div>
      </section>

      {/* Main Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {programs.map((program, index) => (
            <div key={index} className={`mb-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} lg:flex lg:items-center lg:gap-12`}>
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <div className="flex items-center mb-6">
                  {program.icon}
                  <h2 className="text-3xl font-bold text-gray-800 ml-4">
                    {program.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                  {program.description}
                </p>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">{t("whatWeDo.keyInitiatives")}</h3>
                  <ul className="space-y-2">
                    {program.initiatives.map((initiative, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span className="text-gray-600" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>{initiative}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-4 bg-green-100 rounded">
                    <p className="text-green-800 font-semibold" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>{t("whatWeDo.impact")}: {program.impact}</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src={`https://images.unsplash.com/photo-${index === 0 ? '1581090464777-f3220bbe1b8b' : index === 1 ? '1535268647677-300dbf3d78d1' : '1509316975850-ff9c5deb0cd9'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                    alt={program.title}
                    className="rounded-lg shadow-lg"
                  />
                  <img 
                    src={`https://images.unsplash.com/photo-${index === 0 ? '1518495973542-4542c06a5843' : index === 1 ? '1472396961693-142e6e269027' : '1513836279014-a89f7a76ae86'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                    alt={program.title}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Partnerships */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            {t("whatWeDo.partnershipsTitle")}
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
            {t("whatWeDo.partnershipsDesc")}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-600 mb-4">{t("whatWeDo.partnership1Title")}</h3>
              <p className="text-gray-600" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                {t("whatWeDo.partnership1Desc")}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-600 mb-4">{t("whatWeDo.partnership2Title")}</h3>
              <p className="text-gray-600" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                {t("whatWeDo.partnership2Desc")}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-600 mb-4">{t("whatWeDo.partnership3Title")}</h3>
              <p className="text-gray-600" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                {t("whatWeDo.partnership3Desc")}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-600 mb-4">{t("whatWeDo.partnership4Title")}</h3>
              <p className="text-gray-600" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
                {t("whatWeDo.partnership4Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhatWeDo;
