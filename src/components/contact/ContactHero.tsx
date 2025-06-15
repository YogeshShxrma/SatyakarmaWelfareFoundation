
import { useTranslation } from "@/hooks/useTranslation";

const ContactHero = () => {
  const { t, lang } = useTranslation();
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          {t("nav.contact")}
        </h1>
        <p
          className="text-xl text-gray-600 leading-relaxed"
          style={
            lang === "hi"
              ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
              : {}
          }
        >
          {t("contact.subtitle")}
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
