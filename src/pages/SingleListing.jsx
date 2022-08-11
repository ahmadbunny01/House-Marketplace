import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useParams } from "react-router-dom";

const SingleListing = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingRef = doc(db, "listings", params.listingId);
        const docSnap = await getDoc(listingRef);
        if (docSnap.exists()) {
          setListing(docSnap.data());
          setMainImage(docSnap.data().imageUrls[0]);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Could Not Fetch Listing");
      }
    };
    fetchListing();
  }, [params.listingId]);

  const imageClick = (e) => {
    setMainImage(e.target.src);
  };

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
              Listing
            </h1>
            <div className="container pt-12 pb-32 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src={mainImage}
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {listing.name}
                  </h1>
                  <div className="flex mb-4">
                    <span className="text-gray-600">{listing.location}</span>
                  </div>
                  <p className="leading-relaxed border-b-2">
                    For:
                    <span className="p-3 font-bold">
                      {listing.type.charAt(0).toUpperCase() +
                        listing.type.slice(1)}
                    </span>
                  </p>
                  <p className="leading-relaxed border-b-2">
                    Bedrooms:
                    <span className="p-3 font-bold">{listing.bedrooms}</span>
                  </p>
                  <p className="leading-relaxed border-b-2">
                    Bathrooms:
                    <span className="p-3 font-bold">{listing.bathrooms}</span>
                  </p>
                  <p className="leading-relaxed border-b-2">
                    Furnished:
                    <span className="p-3 font-bold">
                      {listing.furnished ? "Yes" : "No"}
                    </span>
                  </p>
                  <p className="leading-relaxed border-b-2">
                    Price:
                    <span className="p-3 font-bold">
                      {listing.regularPrice}
                    </span>
                    <span>{listing.type == "rent" ? "USD/Month" : "USD"}</span>
                  </p>
                  <p className="leading-relaxed border-b-2">
                    Offer:
                    <span className="p-3 font-bold">
                      {listing.offer
                        ? listing.discountedPrice + " USD "
                        : "No Offer"}
                    </span>
                  </p>
                  <p className="leading-relaxed border-b-2 border-green-500 pt-4">
                    Contact:
                    <span className="p-3 font-bold">{listing.contact}</span>
                  </p>
                </div>
                <div className="flex flex-col lg:flex-row pt-12 mx-auto space-y-4 lg:space-y-0 lg:space-x-4">
                  {listing.imageUrls.map((image) => {
                    return (
                      <>
                        <div className="h-48 rounded">
                          <img
                            alt="listing-images"
                            className="object-cover object-center w-full h-full block cursor-pointer hover:border-2 hover:border-gray-300"
                            src={image}
                            onClick={imageClick}
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Navbar />
      </div>
    </>
  );
};

export default SingleListing;
