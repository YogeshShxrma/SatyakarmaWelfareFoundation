
import { useTranslation } from "@/hooks/useTranslation";

const ContactMapSection = () => {
  const { t, lang } = useTranslation();
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {t("contact.visitOffice")}
        </h2>
        <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p
              className="text-gray-600 mb-4"
              style={
                lang === "hi"
                  ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
                  : {}
              }
            >
              {t("contact.mapComingSoon")}
            </p>
            <p
              className="text-sm text-gray-500"
              style={
                lang === "hi"
                  ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
                  : {}
              }
            >
              {t("contact.mapDescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;
