
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Typewriter } from "@/components/ui/typewriter";

const CallToAction = () => {
  const { t, lang } = useTranslation();
  return (
    <section className="px-0 py-[48px] bg-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-lato font-bold text-gray-800 mb-6">
          {t("callToAction.title")}
        </h2>
        <p
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          style={
            lang === "hi"
              ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" }
              : {}
          }
        >
          {t("callToAction.desc")}
        </p>
        <div className="flex flex-col items-center w-full mb-2">
          <span className="md:text-2xl text-lg text-green-700 font-semibold mb-1">
            We are here to{" "}
          </span>
          <Typewriter
            text={[
              t("cta.typewriter1") || "Get involved.",
              t("cta.typewriter2") || "Help us create change.",
              t("cta.typewriter3") || "Every action counts!"
            ]}
            speed={60}
            waitTime={1200}
            deleteSpeed={35}
            className="text-green-700 font-semibold md:text-2xl text-lg min-h-[2.5em]"
            cursorChar="_"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Content can be added here later */}
        </div>
        <div className="p-8 shadow-sidebar-border border border-gray-100 rounded-xl px-0 my-0 mx-[240px] py-[9px]">
          <Link
            to="/contact"
            className="bg-earth-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-500 inline-block"
          >
            {t("cta.contactUsToday")}
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CallToAction;

