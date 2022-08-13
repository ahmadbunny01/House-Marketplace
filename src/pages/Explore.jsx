import Navbar from "../components/Navbar";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import bannerImage from "../assets/png/home-banner.png";
import { toast } from "react-toastify";
import Listing from "../components/Listing";
import { collection, query, limit, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";

const Explore = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, orderBy("timestamp", "desc"), limit(10));
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could Not Fetch Listings");
      }
    };
    fetchListings();
  }, []);
  if (loading) {
    return (
      <>
        <div className="conatiner mx-auto">
          <div className="flex min-h-screen min-w-full justify-center items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                ></path>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="min-w-screen min-h-screen bg-slate-100">
        <div className="container mx-auto">
          <div className="mx-3 lg:mx-12 pt-4">
            <h1 className="text-3xl font-black border-l-4 border-green-500 py-3 px-1">
              Browse By Category
            </h1>
          </div>
          <div className="flex flex-row mx-3 lg:mx-12 justify-center items-center space-x-3 lg:space-x-6 pt-12">
            <Link
              to="/category/sell"
              className="hover:scale-105 transition-all duration-500"
            >
              <img
                src={sellCategoryImage}
                className="max-h-28 lg:max-h-[20rem] object-cover rounded-lg"
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
                className="max-h-28 lg:max-h-[20rem] object-cover rounded-lg"
                alt="For Rent"
              />
              <div className="flex py-2 lg:py-4 justify-center items-center">
                <h1 className="font-black text-green-500 text-lg lg:text-xl">
                  Places For Rent
                </h1>
              </div>
            </Link>
          </div>
          <div className="mx-3 lg:mx-12 pt-8">
            <h1 className="text-3xl font-black border-l-4 border-green-500 py-3 px-1">
              Who We Are ?
            </h1>
          </div>
          <section className="text-gray-600 body-font">
            <div className="container mx-auto flex pt-3 md:flex-row flex-col items-center">
              <div className="flex mx-3 lg:mx-12 flex-col justify-center order-1">
                <h1 className="title-font text-2xl mb-4 font-bold text-indigo-500">
                  Before It Sold Out.
                  <br className="inline-block" />
                  Get It.
                </h1>
                <p className="mb-3 leading-relaxed">
                  House Marketplace is a digital platform designed to help you
                  with all your real estate worries! We pledge to make real
                  estate experiences more accessible to everyone – whether they
                  need to buy, sell, or rent properties, products, projects, or
                  services! With House marketplace, you don’t have to worry
                  about finding the right place, again!
                </p>
                <div className="flex space-x-3 items-center">
                  <h1 className="text-lg font-black">Sign Up For Free</h1>
                  <Link to="signUp">
                    <ArrowRightIcon
                      fill="white"
                      className="bg-green-500 rounded-full w-10 h-10 hover:translate-x-1 transition-all duration-500 hover:opacity-80"
                    />
                  </Link>
                </div>
              </div>
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 lg:mt-0 lg:order-2">
                <img
                  className="object-cover object-center rounded"
                  alt="hero"
                  src={bannerImage}
                />
              </div>
            </div>
          </section>
          <div className="mx-3 lg:mx-12 pt-4">
            <h1 className="text-3xl font-black border-l-4 border-green-500 py-3 px-1">
              Latest Listings
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 mx-3 lg:mx-12 mt-12 pb-28">
            {listings.map((item) => {
              return listings.length >= 1 ? (
                <>
                  <Link to={"/listing/" + item.id}>
                    <Listing
                      key={item.id}
                      type={item.type}
                      title={item.data.name}
                      location={item.data.location}
                      price={item.data.regularPrice}
                      bedrooms={item.data.bedrooms}
                      bathrooms={item.data.bathrooms}
                      image={item.data.imageUrls[0]}
                    />
                  </Link>
                </>
              ) : (
                <></>
              );
            })}
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default Explore;
