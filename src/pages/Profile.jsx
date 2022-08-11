import Navbar from "../components/Navbar";
import homeIcon from "../assets/svg/homeIcon.svg";
import Listing from "../components/Listing";
import { Link } from "react-router-dom";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import {
  doc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  limit,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Profile = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    setUser(auth.currentUser);
  }, [user]);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("userRef", "==", user.uid),
          limit(10),
          orderBy("timestamp", "desc")
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
  }, []);
  const [changeDetails, setChangeDetails] = useState(false);
  const changeDetailsEvent = (e) => {
    if (changeDetails === false) {
      setChangeDetails(true);
    } else if (changeDetails === true) {
      setChangeDetails(false);
    }
  };
  const navigate = useNavigate();
  const logoutEvent = (e) => {
    auth.signOut();
    navigate("/");
  };
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setFormData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const submitEvent = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
      });
      await updateEmail(auth.currentUser, formData.email);
      await updateDoc(doc(db, "users", auth.currentUser.uid), formData);
      toast.success("Profile Updated Successfully");
      nameRef.current.value = "";
      emailRef.current.value = "";
      changeDetailsEvent();
    } catch (error) {
      toast.error("Failed To Update Profile");
    }
  };
  const onDelete = async (listingId) => {
    if (window.confirm("Sure You Want To Delete?")) {
      setLoading(true);
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id != listingId
      );
      setListings(updatedListings);
      setLoading(false);
    }
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
              Profile
            </h1>
          </div>
          <div className="flex mx-3 lg:mx-12 justify-between items-center mt-12">
            <div>
              <h1 className="text-2xl font-black">My Account</h1>
            </div>
            <div>
              <button
                onClick={logoutEvent}
                className="py-1 px-3 w-20 bg-green-500 rounded-md text-white hover:opacity-80"
              >
                Logout
              </button>
            </div>
          </div>
          <div
            className={
              changeDetails
                ? "hidden"
                : "flex mx-3 lg:mx-12 items-center justify-between mt-8"
            }
          >
            <div className="flex flex-col space-y-1">
              <h1 className="text-xl font-black">Personal Info</h1>
              <p>
                <span className="font-bold">Name:</span> {user.displayName}
              </p>
              <p>
                <span className="font-bold">Email:</span> {user.email}
              </p>
            </div>
            <div>
              <button
                onClick={changeDetailsEvent}
                className={
                  changeDetails
                    ? "hidden"
                    : "py-1 px-3 w-20 bg-green-500 rounded-md text-white hover:opacity-80"
                }
              >
                Change
              </button>
            </div>
          </div>
          <div className={changeDetails ? "flex mx-3 lg:mx-12 mt-8" : "hidden"}>
            <form
              className="flex flex-col space-y-1 w-full lg:w-2/6"
              onSubmit={submitEvent}
            >
              <label className="font-bold">New Name:</label>
              <input
                onChange={inputHandle}
                className="mt-1 px-2 py-2 rounded-lg w-full outline-none"
                name="name"
                ref={nameRef}
              />
              <label className="font-bold">New Email:</label>
              <input
                onChange={inputHandle}
                className="mt-1 px-2 py-2 rounded-lg w-full outline-none"
                name="email"
                ref={emailRef}
              />
              <div className="flex justify-between pt-6">
                <button
                  onClick={changeDetailsEvent}
                  type="button"
                  className="py-1 px-3 bg-green-500 rounded-md text-white hover:opacity-80"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-1 px-3 bg-green-500 rounded-md text-white hover:opacity-80"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          <div className="flex mx-3 lg:mx-12 justify-between items-center my-8">
            <div>
              <h1 className="text-xl font-black">My Listings</h1>
            </div>
            <div>
              <Link
                to="/create-listing"
                className="flex space-x-1 py-1 w-full px-3 shadow-md bg-green-500 rounded-md text-white hover:opacity-80"
              >
                <img src={homeIcon} />
                <div>Sell/Rent</div>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 mx-3 lg:mx-12 pb-28">
            {listings.map((item) => {
              return (
                <>
                  <div className="flex items-center">
                    <Link to={"/listing/" + item.id}>
                      <Listing
                        key={item.id}
                        title={item.data.name}
                        location={item.data.location}
                        price={item.data.regularPrice}
                        bedrooms={item.data.bedrooms}
                        bathrooms={item.data.bathrooms}
                        image={item.data.imageUrls[0]}
                      />
                    </Link>
                    <div className="flex flex-col lg:flex-row items-center space-y-3 lg:space-y-0 lg:space-x-3">
                      <Link to={"/listing/update/" + item.id}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="blue"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </Link>
                      <button onClick={() => onDelete(item.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default Profile;
