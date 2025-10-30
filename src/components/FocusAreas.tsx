import { useTranslation } from "@/hooks/useTranslation";

const plasticWasteImage = "/database/asset/plastic-waste.jpg";
const childrenEducationImage = "/database/asset/children-education.jpg";
const treePlantingImage = "/database/asset/tree-planting.jpg";
const communityDevelopmentImage = "/database/asset/community-development.jpg";
const FocusAreas = () => {
  const {
    t,
    lang
  } = useTranslation();
  const areas = [{
    title: t("focusAreas.plastic.title"),
    description: t("focusAreas.plastic.desc"),
    image: plasticWasteImage,
    stats: t("focusAreas.plastic.stats")
  }, {
    title: t("focusAreas.children.title"),
    description: t("focusAreas.children.desc"),
    image: childrenEducationImage,
    stats: t("focusAreas.children.stats")
  }, {
    title: t("focusAreas.tree.title"),
    description: t("focusAreas.tree.desc"),
    image: treePlantingImage,
    stats: t("focusAreas.tree.stats")
  }, {
    title: t("focusAreas.community.title"),
    description: t("focusAreas.community.desc"),
    image: communityDevelopmentImage,
    stats: t("focusAreas.community.stats")
  }];
  return <section className="py-20 bg-white">
      <div className="max-w-max mx-auto px-4 sm:px-6 lg:px-8 py-[32px] bg-green-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-gray-800 mb-6">
            {t("focusAreas.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={lang === "hi" ? {
          fontFamily: "'Noto Sans Devanagari', Arial, sans-serif"
        } : {}}>
            {t("focusAreas.desc")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((area, index) => <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img src={area.image} alt={area.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{area.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{area.description}</p>
                
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default FocusAreas;