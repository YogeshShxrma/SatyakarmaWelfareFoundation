
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const GetInvolved = () => {
  const { t, lang } = useTranslation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: t("validation.required"),
        description: "",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('contact-form', {
        body: formData
      });
      if (error) throw error;
      toast({
        title: t("contact.successTitle"),
        description: t("contact.successDesc")
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('Get Involved form error:', error);
      toast({
        title: t("contact.errorTitle"),
        description: t("contact.errorDesc"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t("nav.getInvolved")}
          </h1>
          <p
            className="text-xl text-gray-600 leading-relaxed"
            style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
          >
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
          <form className="bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder={t("contactForm.firstName")}
                required
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder={t("contactForm.lastName")}
                required
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("contactForm.email")}
                required
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t("contactForm.phone")}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
              />
            </div>
            <div className="mb-6">
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
              >
                <option value="">{t("getInvolved.howToInvolve")}</option>
                <option value="Volunteer Inquiry">{t("contactForm.subjectOptions.volunteer")}</option>
                <option value="Partnership Opportunity">{t("contactForm.subjectOptions.partner")}</option>
                <option value="Donation Information">{t("contactForm.subjectOptions.donate")}</option>
                <option value="General Question">{t("contactForm.subjectOptions.general")}</option>
              </select>
            </div>
            <div className="mb-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                placeholder={t("getInvolved.messagePlaceholder")}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? t("actions.sending") : t("contactForm.send")}
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
