import React from "react";
import { useState } from "react";
import { use } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [userdata, setUserdata] = useState("");

  const submithandler = (e) => {
    e.preventDefault();
    setUserdata({
      email: email,
      password: password,
    });
    console.log(userdata);
    setEmail("");
    setpassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="hidden w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submithandler(e);
          }}
        >
          <h3 className="text-xl font-medium mb-2">Whats your Email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="email@wxample.com"
          />
          <h3 className="text-xl font-medium mb-2">Enter password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            required
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 w-full px-4 py-2 rounded">
            Login
          </button>
        </form>
        <p className="text-center">
          Regiter as a painter?
          <Link to="/captain-signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="flex items-center justify-center bg-[yellow] text-white font-semibold mb-7 w-full px-4 py-2 rounded"
        >
          Sign in as user
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
