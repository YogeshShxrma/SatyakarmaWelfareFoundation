
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { createGmailUrl } from "@/lib/emailUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t, lang } = useTranslation();
  const isMobile = useIsMobile();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        formData.subject,
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

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
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
    <div className="bg-green-50 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("contact.sendMessage")}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder={t("contactForm.firstName")}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder={t("contactForm.lastName")}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder={t("contactForm.email")}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder={t("contactForm.phone")}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
        />
        <select
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
        >
          <option value="">{t("contactForm.subject")}</option>
          <option value="Volunteer Inquiry">{t("contactForm.subjectOptions.volunteer")}</option>
          <option value="Partnership Opportunity">{t("contactForm.subjectOptions.partner")}</option>
          <option value="Donation Information">{t("contactForm.subjectOptions.donate")}</option>
          <option value="Media Inquiry">{t("contactForm.subjectOptions.media")}</option>
          <option value="General Question">{t("contactForm.subjectOptions.general")}</option>
        </select>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          placeholder={t("contactForm.message")}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}
        ></textarea>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? t("actions.sending") : t("contactForm.send")}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
