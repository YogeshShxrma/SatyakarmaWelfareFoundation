
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About SatyaKarma
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            "Search for truth through action" - Our guiding principle since inception
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our History</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6 leading-relaxed">
              SatyaKarma Welfare Foundation Society was born from a simple yet powerful belief: 
              that meaningful change comes through dedicated action, not just words. Founded by a 
              group of passionate environmental advocates and community leaders, our organization 
              emerged in response to the growing environmental challenges facing our communities.
            </p>
            <p className="mb-6 leading-relaxed">
              What started as local tree plantation drives has evolved into a comprehensive approach 
              to environmental protection, combining plastic pollution awareness, children's health 
              initiatives, and community empowerment programs. Our journey reflects the Sanskrit 
              principle of "Satyakarma" - the pursuit of truth through righteous action.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Mission</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              "Search for Truth Through Action"
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We are committed to creating sustainable positive change through:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Environmental protection and restoration through community-driven initiatives
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Reducing plastic pollution by promoting compostable alternatives
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Empowering children through health awareness and physical activity programs
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Building strong community partnerships for sustainable development
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Integrity</h3>
              <p className="text-gray-600">
                We believe in transparent, honest action that aligns with our environmental 
                and social commitments.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Collaboration</h3>
              <p className="text-gray-600">
                Change happens when communities come together. We foster partnerships 
                that amplify our collective impact.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We embrace creative solutions to environmental challenges, from compostable 
                alternatives to engaging children's programs.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Sustainability</h3>
              <p className="text-gray-600">
                Every initiative we undertake considers long-term environmental impact 
                and community benefit.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Empowerment</h3>
              <p className="text-gray-600">
                We believe in empowering individuals and communities with the knowledge 
                and tools to create positive change.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Compassion</h3>
              <p className="text-gray-600">
                Our work is driven by genuine care for our planet, our communities, 
                and future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
