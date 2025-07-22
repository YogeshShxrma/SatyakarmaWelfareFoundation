
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { createGmailUrl } from "@/lib/emailUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const GetInvolvedForm = () => {
  const { t, lang } = useTranslation();
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
      const gmailUrl = createGmailUrl(
        "yogeshsharma8223803625@gmail.com",
        `Get Involved - ${formData.subject}`,
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone,
        formData.message
      );

      // Open Gmail (mobile-friendly approach)
      if (isMobile) {
        window.location.href = gmailUrl;
      } else {
        window.open(gmailUrl, '_blank');
      }

      toast({
        title: t("contact.gmailSuccess"),
        description: t("contact.gmailSuccessDesc")
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
      console.error('Gmail redirect error:', error);
      toast({
        title: t("contact.errorTitle"),
        description: t("contact.gmailErrorDesc"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
  );
};

export default GetInvolvedForm;
