
import { ArrowRight, Zap, Users, Target } from "lucide-react";

const CallToAction = () => {
  const actions = [
    {
      title: "Volunteer Now",
      description: "Join our next community action",
      icon: <Users className="h-8 w-8" />,
      bgColor: "bg-teal-500",
      hoverColor: "hover:bg-teal-600"
    },
    {
      title: "Join Our Tree Drive",
      description: "Plant hope, grow futures",
      icon: <Target className="h-8 w-8" />,
      bgColor: "bg-emerald-500",
      hoverColor: "hover:bg-emerald-600"
    },
    {
      title: "Support Compostable Solutions",
      description: "Fund plastic-free alternatives",
      icon: <Zap className="h-8 w-8" />,
      bgColor: "bg-violet-500",
      hoverColor: "hover:bg-violet-600"
    },
    {
      title: "Train Kids for Health",
      description: "Sponsor fitness programs",
      icon: <Users className="h-8 w-8" />,
      bgColor: "bg-coral-500",
      hoverColor: "hover:bg-coral-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-violet-900 to-teal-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-float delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-coral-500/10 rounded-full blur-3xl animate-float delay-300"></div>
      </div>
      
      {/* Dotted Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-4 mb-6">
            <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
            <span className="text-yellow-400 font-bold text-lg uppercase tracking-wide">Take Action</span>
            <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight font-montserrat animate-fade-in delay-300">
            Ready to Inspire
            <span className="block text-gradient">Change?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto font-medium animate-fade-in delay-500">
            Join thousands of volunteers, educators, and changemakers creating a sustainable future. 
            Every action counts. Every moment matters. Every choice shapes tomorrow.
          </p>
        </div>
        
        {/* Action Buttons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {actions.map((action, index) => (
            <button 
              key={index}
              className={`group ${action.bgColor} ${action.hoverColor} text-white p-8 rounded-3xl transition-all transform hover:scale-105 hover:shadow-2xl animate-fade-in border-2 border-white/20 hover:border-white/40`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 group-hover:bg-white/30 transition-all group-hover:scale-110">
                  {action.icon}
                </div>
                <h3 className="text-xl font-black mb-2 group-hover:scale-105 transition-transform">
                  {action.title}
                </h3>
                <p className="text-sm opacity-90 font-medium mb-4">
                  {action.description}
                </p>
                <ArrowRight className="h-6 w-6 opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </div>
            </button>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center animate-fade-in delay-1000">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h3 className="text-3xl font-black text-white mb-4">Can't decide? Start here!</h3>
            <p className="text-gray-300 mb-6 text-lg">Begin your journey with a simple action that creates lasting impact.</p>
            <button className="bg-gradient-to-r from-teal-500 to-violet-500 text-white px-12 py-5 rounded-full text-xl font-black hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-white/30">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
