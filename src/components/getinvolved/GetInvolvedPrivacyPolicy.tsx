
import { useTranslation } from "@/hooks/useTranslation";

const GetInvolvedPrivacyPolicy = () => {
  const { t, lang } = useTranslation();

  return (
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
  );
};

export default GetInvolvedPrivacyPolicy;
