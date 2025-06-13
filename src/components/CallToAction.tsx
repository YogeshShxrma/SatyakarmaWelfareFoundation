import { Link } from "react-router-dom";
const CallToAction = () => {
  return <section className="py-20 bg-sage-200">
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

        <div className="p-8 shadow-sidebar-border border border-gray-100 my-0 px-[86px] py-[20px] rounded-xl mx-[101px] bg-sage-200">
          
          
          <Link to="/contact" className="bg-earth-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-earth-700 transition-colors inline-block">
            Contact Us Today
          </Link>
        </div>
      </div>
    </section>;
};
export default CallToAction;