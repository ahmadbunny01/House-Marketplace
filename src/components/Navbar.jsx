import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as PersonIcon } from "../assets/svg/personIcon.svg";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const matchPathRoute = (route) => {
        if (route == location.pathname) {
            return true;
        } else {
            return false;
        }
    }
    return (
        <>
            <nav className="w-screen bottom-0 fixed bg-white shadow-lg">
                <div className="container mx-auto">
                    <div className="flex justify-center items-center mx-3 lg:mx-12 space-x-16 lg:space-x-28 py-1">
                        <NavLink to={"/"}>
                            <ExploreIcon fill={matchPathRoute('/') ? '#000000' : '#8f8f8f'} className="mx-auto w-8 h-8" />
                            <p className={matchPathRoute('/') ? '#000000 text-sm font-semibold' : '#8f8f8f text-sm'}>Explore</p>
                        </NavLink >
                        <NavLink to={"/offers"}>
                            <OfferIcon fill={matchPathRoute('/offers') ? '#000000' : '#8f8f8f'} className="mx-auto w-8 h-8" />
                            <p className={matchPathRoute('/offers') ? '#000000 text-sm font-semibold' : '#8f8f8f text-sm'}>Offers</p>
                        </NavLink>
                        <NavLink to={"/profile"}>
                            <PersonIcon fill={matchPathRoute('/profile') ? '#000000' : '#8f8f8f'} className="mx-auto w-8 h-8" />
                            <p className={matchPathRoute('/profile') ? '#000000 text-sm font-semibold' : '#8f8f8f text-sm'}>Profile</p>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;