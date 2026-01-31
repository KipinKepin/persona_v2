import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center h-16">
          <NavLink
            to="/"
            className="
              inline-flex items-center gap-2
              text-sm text-gray-500
              hover:text-gray-700
              transition
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Segmentasi
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
