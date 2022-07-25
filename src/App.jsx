import { Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Explore />} />
        <Route path="/offers" exact element={<Offers />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/signIn" exact element={<SignIn />} />
        <Route path="/signUp" exact element={<SignUp />} />
        <Route path="/forgotPassword" exact element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;