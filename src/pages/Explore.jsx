import Navbar from "../components/Navbar";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import { Link } from "react-router-dom";

const Explore = () => {
  return (
    <>
      <div className="min-w-screen min-h-screen bg-slate-100">
        <div className="container mx-auto">
          <div className="mx-3 lg:mx-12 pt-4">
            <h1 className="text-3xl font-black border-l-4 border-green-500 py-3 px-1">
              Browse By Category
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row mx-3 lg:mx-12 justify-center lg:justify-start items-center lg:min-h-[80vh] lg:space-x-6 pt-12 pb-24 space-y-6 lg:space-y-0">
            <Link
              to="/category/sell"
              className="hover:scale-105 transition-all duration-500"
            >
              <img
                src={sellCategoryImage}
                className="max-w-screen lg:max-w-[40vw] lg:h-[50vh] object-cover rounded-lg"
                alt="For Sell"
              />
              <div className="flex py-2 lg:py-4 justify-center items-center">
                <h1 className="font-black text-green-500 text-lg lg:text-xl">
                  Places For Sell
                </h1>
              </div>
            </Link>
            <Link
              to="/category/rent"
              className="hover:scale-105 transition-all duration-500"
            >
              <img
                src={rentCategoryImage}
                className="max-w-screen lg:max-w-[40vw] lg:h-[50vh] object-cover rounded-lg"
                alt="For Rent"
              />
              <div className="flex py-2 lg:py-4 justify-center items-center">
                <h1 className="font-black text-green-500 text-lg lg:text-xl">
                  Places For Rent
                </h1>
              </div>
            </Link>
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default Explore;
