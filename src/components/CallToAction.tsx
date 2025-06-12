
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-lato font-bold text-dark mb-6">
          Join Our Mission
        </h2>
        <p className="text-lg text-deepblue mb-12 max-w-2xl mx-auto leading-relaxed">
          Be part of the change you want to see. Whether through volunteering, 
          partnerships, or spreading awareness - every action counts towards a cleaner, 
          healthier future for our children and communities.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Content can be added here later */}
        </div>

        <div className="p-8 shadow-lg border border-lightblue bg-brand-50 rounded-xl max-w-md mx-auto">
          <Link to="/contact" className="bg-blue text-white py-3 px-8 rounded-lg font-medium hover:bg-deepblue transition-colors inline-block">
            Contact Us Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
