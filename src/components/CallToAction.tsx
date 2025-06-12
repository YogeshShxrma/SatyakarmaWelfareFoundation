
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20 bg-sage-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-lato font-bold text-gray-800 mb-6">
          Join Our Mission
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Be part of the change you want to see. Whether through volunteering, 
          partnerships, or spreading awareness - every action counts towards a cleaner, 
          healthier future for our children and communities.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Content can be added here later */}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Ready to Make a Difference?
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Contact us to learn more about our programs, volunteer opportunities, 
            or partnership initiatives. Together, we can create a sustainable future.
          </p>
          <Link 
            to="/contact"
            className="bg-earth-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-earth-700 transition-colors inline-block"
          >
            Contact Us Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
