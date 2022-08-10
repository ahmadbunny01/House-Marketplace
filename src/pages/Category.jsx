import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Listing from "../components/Listing";
import {
  collection,
  query,
  where,
  limit,
  getDocs,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );
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
  }, [params.categoryName]);
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
  return listings.length >= 1 ? (
    <>
      <div className="min-w-screen min-h-screen bg-slate-100">
        <div className="container mx-auto">
          <div className="mx-3 lg:mx-12 pt-4">
            <h1 className="text-3xl font-black border-l-4 border-green-500 py-3 px-1">
              Places For{" "}
              {params.categoryName.charAt(0).toUpperCase() +
                params.categoryName.slice(1)}
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 mx-3 lg:mx-12 mt-12 pb-28">
            {listings.map((item) => {
              return (
                <>
                  <Link to="/">
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
              );
            })}
          </div>
        </div>
        <Navbar />
      </div>
    </>
  ) : (
    <>
      <div className="min-w-screen min-h-screen bg-slate-100">
        <div className="container mx-auto">
          <div className="mx-3 lg:mx-12 pt-4">
            <h1 className="text-3xl font-black border-l-4 border-green-500 py-3 px-1">
              Places For{" "}
              {params.categoryName.charAt(0).toUpperCase() +
                params.categoryName.slice(1)}
            </h1>
          </div>
          <div className="flex mx-3 lg:mx-12 items-center justify-center min-h-[70vh]">
            <h1 className="text-xl">
              No Listings For{" "}
              {params.categoryName.charAt(0).toUpperCase() +
                params.categoryName.slice(1)}{" "}
              {":("}
            </h1>
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default Category;
