
import { Leaf, Users, TreeDeciduous } from "lucide-react";

const MissionOverview = () => {
  const missions = [
    {
      icon: <Leaf className="h-12 w-12 text-green-600" />,
      title: "Reduce Plastic Pollution",
      description: "Promoting compostable alternatives and raising awareness about plastic's environmental impact."
    },
    {
      icon: <TreeDeciduous className="h-12 w-12 text-green-600" />,
      title: "Environmental Sustainability",
      description: "Save existing trees and plant more for a greener tomorrow through community-driven initiatives."
    },
    {
      icon: <Users className="h-12 w-12 text-green-600" />,
      title: "Children's Health & Education",
      description: "Encouraging physical exercise and empowering communities through education and collaboration."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Mission: Search for Truth Through Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SatyaKarma Welfare Foundation Society is dedicated to creating positive change 
            through environmental protection, community empowerment, and sustainable development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {missions.map((mission, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-lg hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex justify-center mb-6">
                {mission.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {mission.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {mission.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionOverview;
