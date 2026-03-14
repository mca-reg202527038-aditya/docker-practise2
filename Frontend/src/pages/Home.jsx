import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panel, setPanel] = useState(false);
  const panelRef = useRef(null);

  const submithandler = (e) => {
    e.preventDefault();
  };

  // ✅ Always call this hook (no conditional logic around it)
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panel ? "70%" : "0%",
    });
  }, [panel]);

  return (
    <div className="h-screen relative">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>
      <div className="h-screen flex flex-col justify-end absolute top-0 w-full">
        <div className="h-[30%] bg-white p-5 relative">
          <h5
            onClick={() => {
              setPanel(false);
            }}
            className="absolute top-0 left-0"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={submithandler}>
            <input
              className="border rounded px-12 py-2 w-full text-center"
              type="text"
              onClick={() => setPanel(true)}
              onChange={(e) => setPickup(e.target.value)}
              value={pickup}
              placeholder="Add a pickup location"
            />
            <input
              className="border rounded px-12 py-2 mt-2 w-full text-center"
              type="text"
              onClick={() => setPanel(true)}
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
              placeholder="Enter your destination"
            />
          </form>
        </div>

        <div
          ref={panelRef}
          className="h-0 bg-red-500 transition-all duration-500 overflow-hidden"
        ></div>
      </div>
    </div>
  );
};

export default Home;
