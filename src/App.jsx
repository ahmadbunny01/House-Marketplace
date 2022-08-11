import { Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateListing from "./pages/CreateListing";
import PrivateRoute from "./pages/PrivateRoute";
import Category from "./pages/Category";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleListing from "./pages/SingleListing";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Explore />} />
        <Route path="/category/:categoryName" exact element={<Category />} />
        <Route path="/offers" exact element={<Offers />} />
        <Route path="/profile" exact element={<PrivateRoute />}>
          <Route path="/profile" exact element={<Profile />} />
        </Route>
        <Route path="/signIn" exact element={<SignIn />} />
        <Route path="/signUp" exact element={<SignUp />} />
        <Route path="/forgotPassword" exact element={<ForgotPassword />} />
        <Route path="/create-listing" exact element={<CreateListing />} />
        <Route path="/listing/:listingId" exact element={<SingleListing />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
