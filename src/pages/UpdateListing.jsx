import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase.config";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { toast } from "react-toastify";

const UpdateListing = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    location: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    contact: "",
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    location,
    offer,
    regularPrice,
    discountedPrice,
    images,
    contact,
  } = formData;

  useEffect(() => {
    if (listing && listing.useRef != auth.currentUser.uid) {
      toast.error("You Cannot Edit This Listing.");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/signIn");
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const docRef = doc(db, "listings", params.listingId);
        const docSnap = await getDoc(docRef);
        setListing(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Listing Not Fetched.");
      }
    };
    fetchListing();
  }, [params.listingId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (parseInt(discountedPrice) >= parseInt(regularPrice)) {
      setLoading(false);
      toast.error("Discounted Price Should Be Less Than Regular Price");
      return;
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error("A Max Of 6 Images Are Allowed.");
      return;
    }

    //Add Images To Storage
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidV4()}`;
        const storageRef = ref(storage, "images/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images Upload Failed.");
      return;
    });

    const formDataCopy = {
      ...formData,
      imageUrls: imgUrls,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;

    await updateDoc(doc(db, "listings", params.listingId), formDataCopy);
    setLoading(false);
    toast.success("Updated Successfully.");
    navigate(`/category/${formDataCopy.type}`);
  };

  const inputHandle = (e) => {
    let boolean = null;
    const { name, value, files, type } = e.target;
    if (value === "true") {
      boolean = true;
    } else if (value === "false") {
      boolean = false;
    }
    if (files) {
      setFormData((preValue) => ({
        ...preValue,
        images: files,
      }));
    }
    if (!files) {
      setFormData((preValue) => ({
        ...preValue,
        [name]: boolean ?? value,
      }));
    }
    if (!files && type === "number" && value !== "") {
      setFormData((preValue) => ({
        ...preValue,
        [name]: parseInt(value),
      }));
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
              Update Listing
            </h1>
          </div>
          <div className="flex mx-3 lg:mx-12 lg:justify-center mt-12 pb-32">
            <form
              className="grid grid-cols-1 lg:grid-cols-2 w-full lg:w-1/2"
              onSubmit={onSubmit}
            >
              <div className="flex flex-col w-full mt-3">
                <label className="font-semibold">Type</label>
                <div className="flex mt-1 w-full space-x-2">
                  <button
                    type="button"
                    value="sell"
                    name="type"
                    className={
                      type === "sell" && type !== null
                        ? "px-2 py-2 w-20 rounded-lg bg-green-500 text-white shadow-md"
                        : "px-2 py-2 w-20 rounded-lg bg-white shadow-md"
                    }
                    onClick={inputHandle}
                  >
                    Sell
                  </button>
                  <button
                    type="button"
                    value="rent"
                    name="type"
                    className={
                      type === "rent" && type !== null
                        ? "px-2 py-2 w-20 rounded-lg bg-green-500 text-white shadow-md"
                        : "px-2 py-2 w-20 rounded-lg bg-white shadow-md"
                    }
                    onClick={inputHandle}
                  >
                    Rent
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-full mt-3 lg:ml-4">
                <label className="font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={inputHandle}
                  className="mt-1 px-2 py-2 rounded-lg w-full outline-none"
                />
              </div>
              <div className="flex flex-col w-full mt-3">
                <label className="font-semibold">No. Of Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={bedrooms}
                  onChange={inputHandle}
                  className="mt-1 px-2 py-2 rounded-lg w-full outline-none"
                />
              </div>
              <div className="flex flex-col w-full mt-3 lg:ml-4">
                <label className="font-semibold">No. Of Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={bathrooms}
                  onChange={inputHandle}
                  className="mt-1 px-2 py-2 rounded-lg w-full outline-none"
                />
              </div>
              <div className="flex flex-col w-full mt-3">
                <label className="font-semibold">Parking Spot</label>
                <div className="flex mt-1 w-full space-x-2">
                  <button
                    type="button"
                    value={true}
                    name="parking"
                    className={
                      parking && parking !== null
                        ? "px-2 py-2 w-20 rounded-lg bg-green-500 text-white shadow-md"
                        : "px-2 py-2 w-20 rounded-lg bg-white shadow-md"
                    }
                    onClick={inputHandle}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    value={false}
                    name="parking"
                    className={
                      parking && parking !== null
                        ? "px-2 py-2 w-20 rounded-lg bg-white shadow-md"
                        : "px-2 py-2 w-20 rounded-lg bg-green-500 text-white shadow-md"
                    }
                    onClick={inputHandle}
                  >
                    No
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-full mt-3 lg:ml-4">
                <label className="font-semibold">Furnished</label>
                <div className="flex mt-1 w-full space-x-2">
                  <button
                    type="button"
                    value={true}
                    name="furnished"
                    className={
                      furnished && parking !== null
                        ? "px-2 py-2 w-20 rounded-lg bg-green-500 text-white shadow-md"
                        : "px-2 py-2 w-20 rounded-lg bg-white shadow-md"
                    }
                    onClick={inputHandle}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    value={false}
                    name="furnished"
                    className={
                      furnished && parking !== null
                        ? "px-2 py-2 w-20 rounded-lg bg-white shadow-md"
                        : "px-2 py-2 w-20 rounded-lg bg-green-500 text-white shadow-md"
                    }
                    onClick={inputHandle}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col w-full mt-3">
                <label className="font-semibold">Address</label>
                <textarea
                  name="location"
                  value={location}
                  className="mt-1 px-2 py-2 rounded-lg w-full outline-none"
                  rows={5}
                  onChange={inputHandle}
                />
              </div>

              <div className="flex flex-col w-full mt-3">
                <label className="font-semibold">
                  Offer{" "}
                  <span className="text-xs text-gray-500">(Discount.)</span>
                </label>
                <div className="flex mt-1 w-full space-x-2">
                  <button
                    type="button"
                    value={true}
                    name="offer"
                    className={
                      offer && offer !== null
                        ? "px-2 py-2 w-20 rounded-lg bg-green-500 text-white shadow-md"
                        : "px-2 py-2 w-20 rounded-lg bg-white shadow-md"
                    }
                    onClick={inputHandle}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    value={false}
                    name="offer"
                    className={
                      offer && offer !== null
                        ? "px-2 py-2 w-20 rounded-lg bg-white shadow-md"
                        : "px-2 py-2 w-20 rounded-lg bg-green-500 text-white shadow-md"
                    }
                    onClick={inputHandle}
                  >
                    No
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-full mt-3 lg:ml-4">
                <label className="font-semibold">Regular Price</label>
                <div className="flex mt-1 w-full space-x-2 items-center">
                  <input
                    type="number"
                    name="regularPrice"
                    value={regularPrice}
                    onChange={inputHandle}
                    className="mt-1 px-2 py-2 rounded-lg w-full outline-none"
                  />
                  <p>{type == "rent" ? "USD/Month" : "USD"}</p>
                </div>
              </div>
              <div className="flex flex-col w-full mt-3">
                <label className="font-semibold">Landlord Contact:</label>
                <input
                  type="text"
                  name="contact"
                  value={contact}
                  onChange={inputHandle}
                  className="mt-1 px-2 py-2 rounded-lg w-full outline-none"
                />
              </div>
              <div
                className={
                  offer ? "flex flex-col w-full mt-3 lg:ml-4" : "hidden"
                }
              >
                <label className="font-semibold">Discounted Price</label>
                <div className="flex mt-1 w-full space-x-2 items-center">
                  <input
                    type="number"
                    name="discountedPrice"
                    value={discountedPrice}
                    onChange={inputHandle}
                    className="mt-1 px-2 py-2 rounded-lg w-full outline-none"
                  />
                  <p>USD/month</p>
                </div>
              </div>
              <div className="flex flex-col w-full mt-3 lg:col-span-2">
                <label className="font-semibold">Images</label>
                <input
                  type="file"
                  name="images"
                  multiple
                  max={6}
                  accept=".jpg,.png,.jpeg"
                  onChange={inputHandle}
                  className="mt-1 px-2 py-2 rounded-lg w-full bg-white"
                />
              </div>
              <div className="lg:col-span-2 flex flex-col w-full mt-8">
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-lg font-black mt-2">Update</h1>
                  <button type="submit">
                    <ArrowRightIcon
                      fill="white"
                      className="bg-green-500 rounded-full w-10 h-10 hover:translate-x-1 transition-all duration-500 hover:opacity-80"
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default UpdateListing;
