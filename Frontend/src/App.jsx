import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import DashBoard from "./pages/DashBoard";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home></Home>
            </UserProtectWrapper>
          }
        ></Route>
        <Route path="/upload" element={<Upload></Upload>}></Route>
        <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
        <Route path="profile" element={<Profile></Profile>}></Route>
        <Route path="/" element={<Start></Start>}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/signup" element={<UserSignup />}></Route>
        <Route path="/captain-login" element={<CaptainLogin />}></Route>
        <Route path="/captain-signup" element={<CaptainSignup />}></Route>
      </Routes>
    </div>
  );
};

export default App;
