import Navbar from "../components/Navbar";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const emailRef = useRef(null);
  const [email, setEmail] = useState(null);
  const inputHandle = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    emailRef.current.value = "";
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Link Sent Successfully");
    } catch (error) {
      toast.error("Error Sending Link");
    }
  };
  return (
    <>
      <div className="min-w-screen min-h-screen bg-slate-100">
        <div className="container mx-auto">
          <div className="mx-3 lg:mx-12 pt-4">
            <h1 className="text-3xl font-black border-l-4 border-green-500 py-3 px-1">
              Forgot Password
            </h1>
          </div>
          <div className="flex min-h-[60vh] justify-center items-center mx-3 lg:mx-12">
            <form className="flex flex-col w-full lg:w-2/6" onSubmit={onSubmit}>
              <label htmlFor="email" className="mt-3 font-bold">
                Enter Your Email
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                className="mt-1 px-2 py-2 rounded-lg w-full outline-none"
                onChange={inputHandle}
              />
              <div className="flex justify-between mt-6 items-center">
                <div>
                  <Link
                    className="font-bold text-green-500 hover:opacity-80"
                    to="/signIn"
                  >
                    Sign In
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <h1 className="font-bold text-green-500">Send Reset Link</h1>
                  <div>
                    <button type="submit">
                      <ArrowRightIcon
                        fill="white"
                        className="bg-green-500 rounded-full w-10 h-10 hover:translate-x-1 transition-all duration-500 hover:opacity-80"
                      />
                    </button>
                  </div>
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

export default ForgotPassword;
