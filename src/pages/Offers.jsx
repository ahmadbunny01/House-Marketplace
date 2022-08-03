import Navbar from "../components/Navbar";

const Offers = () => {
  return (
    <>
      <div className="min-w-screen min-h-screen bg-slate-100">
        <div className="container mx-auto">
          <div className="mx-3 lg:mx-12 pt-4">
            <h1 className="text-3xl font-black border-l-4 border-green-500 py-3 px-1">
              Offers
            </h1>
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default Offers;
