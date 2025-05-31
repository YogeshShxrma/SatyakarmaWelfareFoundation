
import { Leaf, Users, TreeDeciduous } from "lucide-react";

const MissionOverview = () => {
  const missions = [
    {
      icon: <Leaf className="h-12 w-12 text-blue-600" />,
      title: "Reduce Plastic Pollution",
      description: "Promoting compostable alternatives and raising awareness about plastic's environmental impact.",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <TreeDeciduous className="h-12 w-12 text-emerald-600" />,
      title: "Environmental Sustainability",
      description: "Save existing trees and plant more for a greener tomorrow through community-driven initiatives.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Users className="h-12 w-12 text-purple-600" />,
      title: "Children's Health & Education",
      description: "Encouraging physical exercise and empowering communities through education and collaboration.",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Our Mission: Search for Truth Through Action
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            SatyaKarma Welfare Foundation Society is dedicated to creating positive change 
            through environmental protection, community empowerment, and sustainable development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {missions.map((mission, index) => (
            <div 
              key={index}
              className="group text-center p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-4 bg-white/80 backdrop-blur-sm border border-white/50 animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img 
                  src={mission.image} 
                  alt={mission.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="flex justify-center mb-6 group-hover:animate-bounce">
                {mission.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
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
