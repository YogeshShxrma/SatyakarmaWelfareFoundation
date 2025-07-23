
import { useTranslation } from "@/hooks/useTranslation";

const ContactMapSection = () => {
  const { t, lang } = useTranslation();
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {t("contact.visitOffice")}
        </h2>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d690.2420642329159!2d81.74683476325201!3d21.052335643827405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1753240755672!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true}
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title={t("contact.visitOffice")}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;
