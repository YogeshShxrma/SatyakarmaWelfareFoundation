
import { useTranslation } from "@/hooks/useTranslation";
const FocusAreas = () => {
  const { t, lang } = useTranslation();
  const areas = [
    {
      title: t("focusAreas.plastic.title"),
      description: t("focusAreas.plastic.desc"),
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: t("focusAreas.plastic.stats")
    },
    {
      title: t("focusAreas.children.title"),
      description: t("focusAreas.children.desc"),
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: t("focusAreas.children.stats")
    },
    {
      title: t("focusAreas.tree.title"),
      description: t("focusAreas.tree.desc"),
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: t("focusAreas.tree.stats")
    },
    {
      title: t("focusAreas.community.title"),
      description: t("focusAreas.community.desc"),
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: t("focusAreas.community.stats")
    }
  ];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-max mx-auto px-4 sm:px-6 lg:px-8 py-[32px] bg-green-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-gray-800 mb-6">
            {t("focusAreas.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', Arial, sans-serif" } : {}}>
            {t("focusAreas.desc")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((area, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img src={area.image} alt={area.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{area.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{area.description}</p>
                <div className="text-sm font-medium text-green-600">{area.stats}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FocusAreas;
