
import { Leaf, Users, TreeDeciduous, Zap, Target, Globe } from "lucide-react";

const MissionOverview = () => {
  const missions = [
    {
      icon: <Leaf className="h-16 w-16 text-teal-500" />,
      title: "Plastic-Free Planet",
      description: "Revolutionary compostable alternatives and community cleanup drives that transform how we think about packaging.",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bgColor: "from-teal-100 to-green-100",
      accent: "teal"
    },
    {
      icon: <Users className="h-16 w-16 text-coral-500" />,
      title: "Active Kids, Bright Futures",
      description: "Fitness workshops and health awareness programs that empower children to build lifelong wellness habits.",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bgColor: "from-coral-100 to-orange-100",
      accent: "coral"
    },
    {
      icon: <TreeDeciduous className="h-16 w-16 text-emerald-500" />,
      title: "Green Communities",
      description: "Tree plantation drives and environmental education that unite neighborhoods for sustainable development.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bgColor: "from-emerald-100 to-green-100",
      accent: "emerald"
    }
  ];

  const stats = [
    { icon: <Target className="h-8 w-8" />, number: "50+", label: "Communities Reached", color: "text-teal-600" },
    { icon: <Users className="h-8 w-8" />, number: "1000+", label: "Children Engaged", color: "text-coral-600" },
    { icon: <TreeDeciduous className="h-8 w-8" />, number: "5000+", label: "Trees Planted", color: "text-emerald-600" },
    { icon: <Globe className="h-8 w-8" />, number: "25+", label: "Active Partnerships", color: "text-violet-600" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bold Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            <span className="text-teal-600 font-bold text-lg uppercase tracking-wide">Our Mission</span>
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight font-montserrat">
            Search for Truth
            <span className="block text-gradient">Through Action</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            We're not just another NGO. We're a movement of young changemakers, 
            parents, and communities creating tangible impact through bold environmental action.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {missions.map((mission, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${mission.bgColor} p-8 hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-4 animate-fade-in border-2 border-white/50`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <div className="w-full h-full rounded-full border-4 border-current animate-pulse"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
                    {mission.icon}
                  </div>
                  <Zap className="h-8 w-8 text-yellow-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {mission.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed font-medium mb-6">
                  {mission.description}
                </p>
                
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={mission.image} 
                    alt={mission.title}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-white animate-fade-in">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-black mb-4 font-montserrat">Our Impact So Far</h3>
            <p className="text-xl opacity-90">Real numbers, real change, real hope for tomorrow</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 group-hover:bg-white/30 transition-all group-hover:scale-110">
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="text-4xl md:text-5xl font-black mb-2">{stat.number}</div>
                <div className="text-lg font-medium opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionOverview;
