
import { Link } from "react-router-dom";
import GlareCard from "./ui/GlareCard";

const MissionOverview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-gray-800 mb-6">
            About SatyaKarma
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            SatyaKarma Welfare Foundation Society is dedicated to creating sustainable positive change 
            through environmental protection, children's wellness, and community empowerment. We believe 
            in "Search for truth through action" - our guiding principle that drives every initiative we undertake.
          </p>
          <div className="mt-8">
            <Link 
              to="/about" 
              className="bg-earth-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-earth-700 transition-colors inline-block"
            >
              Know More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionOverview;
