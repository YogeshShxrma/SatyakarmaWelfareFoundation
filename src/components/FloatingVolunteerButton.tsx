
import { Link } from "react-router-dom";
import { HandHeart } from "lucide-react";

const FloatingVolunteerButton = () => {
  return (
    <Link 
      to="/get-involved"
      className="fixed bottom-6 right-6 bg-blue text-white p-4 rounded-full shadow-lg hover:bg-deepblue transition-all duration-300 transform hover:scale-110 z-50 group"
      title="Volunteer with Us"
    >
      <HandHeart className="h-6 w-6" />
      <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-dark text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Volunteer with Us
      </span>
    </Link>
  );
};

export default FloatingVolunteerButton;
