
import { Link } from "react-router-dom";
import { HandHeart, Users, Share2 } from "lucide-react";

const HowYouCanHelpSection = () => {
  const helpOptions = [
    {
      icon: HandHeart,
      title: "Volunteer",
      description: "Join our community initiatives and make a direct impact through hands-on environmental and social work.",
      cta: "Start Volunteering"
    },
    {
      icon: Users,
      title: "Join Program",
      description: "Participate in our structured programs for children's health, environmental awareness, and community building.",
      cta: "Explore Programs"
    },
    {
      icon: Share2,
      title: "Spread Awareness",
      description: "Help us reach more people by sharing our mission and encouraging others to join our cause.",
      cta: "Share Mission"
    }
  ];

  return (
    <section className="py-20 bg-earth-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-gray-800 mb-6">
            How You Can Help
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every action counts. Choose how you want to contribute to creating a better world for children and the environment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {helpOptions.map((option, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-6">
                <option.icon className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-lato font-bold text-gray-800 mb-4">
                  {option.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {option.description}
              </p>
              <Link 
                to="/get-involved" 
                className="bg-yellow-500 text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-block"
              >
                {option.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowYouCanHelpSection;
