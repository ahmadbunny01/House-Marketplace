import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

const Listing = (props) => {
  return (
    <>
      <div className="flex flex-nowrap items-center space-x-3 mt-3">
        <div className="w-32 h-28 lg:w-56 lg:h-44">
          <img
            src={props.image}
            className="w-max h-full rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xs lg:text-sm">{props.location}</p>
          <h1 className="font-black text-sm lg:text-base">{props.title}</h1>
          <h2 className="text-base lg:text-lg text-green-500 font-bold">
            {props.price} USD/month
          </h2>
          <div className="flex space-x-6 items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={bedIcon} />
              <p className="text-xs">{props.bedrooms} Bedrooms</p>
            </div>
            <div className="flex items-center space-x-2">
              <img src={bathtubIcon} />
              <p className="text-xs">{props.bathrooms} Bathrooms</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listing;
