import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://www.shutterstock.com/image-vector/stop-traffic-light-signal-vector-600nw-2458608583.jpg)] h-screen pt-8  flex justify-between flex-col w-full bg-red-400">
        <img
          className="w-14 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white py-5 px-3">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3  rounded mt-2"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
