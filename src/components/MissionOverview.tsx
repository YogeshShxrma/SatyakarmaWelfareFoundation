
import { Link } from "react-router-dom";

const MissionOverview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-lato font-bold text-dark mb-6">
            About SatyaKarma
          </h2>
          <p className="text-lg text-deepblue max-w-3xl mx-auto leading-relaxed">
            SatyaKarma Welfare Foundation Society is dedicated to creating sustainable positive change 
            through environmental protection, children's wellness, and community empowerment. We believe 
            in "Search for truth through action" - our guiding principle that drives every initiative we undertake.
          </p>
          <div className="mt-8">
            <Link 
              to="/about" 
              className="bg-blue text-white py-3 px-8 rounded-lg font-medium hover:bg-deepblue transition-colors inline-block"
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
