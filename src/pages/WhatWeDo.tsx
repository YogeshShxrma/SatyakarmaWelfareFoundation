
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Leaf, TreeDeciduous, Users } from "lucide-react";

const WhatWeDo = () => {
  const programs = [
    {
      icon: <Leaf className="h-16 w-16 text-green-600" />,
      title: "Plastic Pollution Awareness",
      description: "Educational campaigns and workshops to raise awareness about plastic's environmental impact while promoting compostable alternatives.",
      initiatives: [
        "Community awareness workshops",
        "School education programs", 
        "Compostable product distribution",
        "Plastic-free lifestyle campaigns"
      ],
      impact: "50+ communities reached, 2000+ families educated"
    },
    {
      icon: <Users className="h-16 w-16 text-green-600" />,
      title: "Children's Physical Health Programs",
      description: "Comprehensive health and fitness initiatives designed to promote physical activity and wellness among children.",
      initiatives: [
        "Fitness workshops for kids",
        "Outdoor sports activities",
        "Health awareness sessions",
        "Nutrition education programs"
      ],
      impact: "1000+ children engaged, 25+ schools partnered"
    },
    {
      icon: <TreeDeciduous className="h-16 w-16 text-green-600" />,
      title: "Tree Plantation & Environmental Restoration",
      description: "Large-scale tree plantation drives and forest conservation efforts to combat climate change and restore natural habitats.",
      initiatives: [
        "Community tree planting drives",
        "Forest restoration projects",
        "Urban greening initiatives",
        "Environmental education campaigns"
      ],
      impact: "5000+ trees planted, 15+ restoration sites"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What We Do
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our comprehensive approach to environmental protection and community empowerment
          </p>
        </div>
      </section>

      {/* Main Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {programs.map((program, index) => (
            <div key={index} className={`mb-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} lg:flex lg:items-center lg:gap-12`}>
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <div className="flex items-center mb-6">
                  {program.icon}
                  <h2 className="text-3xl font-bold text-gray-800 ml-4">
                    {program.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {program.description}
                </p>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">Key Initiatives:</h3>
                  <ul className="space-y-2">
                    {program.initiatives.map((initiative, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span className="text-gray-600">{initiative}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-4 bg-green-100 rounded">
                    <p className="text-green-800 font-semibold">Impact: {program.impact}</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src={`https://images.unsplash.com/photo-${index === 0 ? '1581090464777-f3220bbe1b8b' : index === 1 ? '1535268647677-300dbf3d78d1' : '1509316975850-ff9c5deb0cd9'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                    alt={program.title}
                    className="rounded-lg shadow-lg"
                  />
                  <img 
                    src={`https://images.unsplash.com/photo-${index === 0 ? '1518495973542-4542c06a5843' : index === 1 ? '1472396961693-142e6e269027' : '1513836279014-a89f7a76ae86'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                    alt={program.title}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Partnerships */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Community Partnerships & Sustainable Development
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We believe that lasting change happens through collaboration. Our partnership approach 
            brings together local communities, educational institutions, government bodies, and 
            environmental organizations to create sustainable solutions.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Educational Partnerships</h3>
              <p className="text-gray-600">
                Working with schools and universities to integrate environmental education 
                and health awareness into curricula.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Government Collaboration</h3>
              <p className="text-gray-600">
                Partnering with local authorities to implement large-scale environmental 
                protection and public health initiatives.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Corporate Partnerships</h3>
              <p className="text-gray-600">
                Engaging businesses in sustainable practices and corporate social 
                responsibility programs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Community Networks</h3>
              <p className="text-gray-600">
                Building grassroots networks that empower local communities to lead 
                environmental and health initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhatWeDo;
