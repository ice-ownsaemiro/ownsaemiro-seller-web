import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/SignupPage/SignupPageindex";
import FindPW from "./pages/FindPWPage/FindPWindex";
import StartPage from "./pages/StartPage/StartPageindex";
import SellerLoginPage from "./pages/LoginPage/LoginPageindex";
import MainPage from "./pages/Seller_mainpage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/seller_loginpage" element={<SellerLoginPage />} />
      <Route path="/seller_signup" element={<Signup />} />
      <Route path="/seller_findPW" element={<FindPW />} />
      <Route path="/mainpage" element={<MainPage />} />
    </Routes>
  );
}

export default App;
