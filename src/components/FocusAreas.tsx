const FocusAreas = () => {
  const areas = [{
    title: "Plastic Pollution Awareness",
    description: "Educational campaigns and compostable product promotion to reduce plastic waste in communities.",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "50+ Communities Reached"
  }, {
    title: "Children's Physical Health",
    description: "Fitness workshops, outdoor activities, and health awareness programs for young minds and bodies.",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "1000+ Children Engaged"
  }, {
    title: "Tree Plantation Drives",
    description: "Community-driven environmental restoration through organized tree planting and forest conservation.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "5000+ Trees Planted"
  }, {
    title: "Community Partnerships",
    description: "Collaborative sustainable development through education, empowerment, and local engagement.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    stats: "25+ Active Partnerships"
  }];
  return <section className="py-20 bg-white">
      <div className="max-w-max mx-auto px-4 sm:px-6 lg:px-8 bg-earth-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-gray-800 mb-6">
            Our Focus Areas
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We work across multiple areas to create sustainable positive change in our communities,
            focusing on environmental protection and children's wellness.
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
                <div className="text-sm font-medium text-green-600">{area.stats}</div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default FocusAreas;