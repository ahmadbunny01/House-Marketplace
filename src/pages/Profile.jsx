import Navbar from "../components/Navbar";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Profile = () => {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    setUser(auth.currentUser);
  }, [user]);
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
  return (
    <>
      <Navbar />
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
          <div className="flex mx-3 lg:mx-12 justify-between items-center my-8 pb-12">
            <div>
              <h1 className="text-xl font-black">My Listings</h1>
            </div>
            <div>
              <button
                type="button"
                className="py-1 w-20 px-3 bg-green-500 rounded-md text-white hover:opacity-80"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
