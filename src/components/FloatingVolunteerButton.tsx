
import { Link } from "react-router-dom";
import { HandHeart } from "lucide-react";

const FloatingVolunteerButton = () => {
  return (
    <Link
      to="/get-involved"
      className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
      title="Volunteer with us"
    >
      <HandHeart className="h-6 w-6 group-hover:animate-pulse" />
      <span className="sr-only">Volunteer</span>
    </Link>
  );
};

export default FloatingVolunteerButton;
