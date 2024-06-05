import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Seller_signup";
import FindPW from "./pages/Seller_findpw";
import MainPage1 from "./pages/Seller_mainpage";
import StartPage from "./pages/Seller_startpage";
import SellerLoginPage from "./pages/Seller_loginpage";
import MainPage from "./components/MainPage";
import "./css/StartPage.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/manager_loginpage" element={<SellerLoginPage />} />
      <Route path="/manager_signup" element={<Signup />} />
      <Route path="/manager_findPW" element={<FindPW />} />
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/mainpage1" element={<MainPage1 />} />

    </Routes>
  );
}

export default App;
