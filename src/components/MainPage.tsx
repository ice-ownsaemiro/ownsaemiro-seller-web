import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_main.svg";
import sellhis from "..//assets/logo_sellhis.svg";
import sellreq from "..//assets/logo_sellreq.svg";
import logout from "../assets/logo_logout.svg";
import SelledHistory from "./seller/SelledHistory";
import SellRequest from "./seller/SellRequest";
import "../css/MainPage.css";

function MainPage() {
  const [activeMenu, setActiveMenu] = useState("History");

  const renderContent = () => {
    switch (activeMenu) {
      case "History":
        return <SelledHistory />;
      case "Request":
        return <SellRequest />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <Seller
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default MainPage;

interface ActiveMenuProps{
  activeMenu:any;
  setActiveMenu:any;
}

function Seller({ activeMenu, setActiveMenu }:ActiveMenuProps) {
  const navigate = useNavigate();

  return (
    <>
      <aside className="sidebar">
        <img
          src={logo}
          alt="로고 출력 실패"
          style={{
            width: "60px",
            height: "60px",
            margin: "10px 10px 80px 10px",
          }}
        />
        <div>
          <div
            className={`menu-select ${activeMenu === "History" ? "active" : ""}`}
            onClick={() => setActiveMenu("History")}
          >
            <img src={sellhis} alt="판매 이력 사진 실패" className="menu-image" />
            <div className="menu-item">판매 이력</div>
          </div>
          <div
            className={`menu-select ${activeMenu === "Request" ? "active" : ""}`}
            onClick={() => setActiveMenu("Request")}
          >
            <img src={sellreq} alt="판매 요청 사진 실패" className="menu-image" />
            <div className="menu-item">판매 요청</div>
          </div>
        </div>
        <div className="user">
          <span className="username">판매자 님</span>
          <img
            src={logout}
            alt="로그아웃 사진 실패"
            className="logout-button"
            onClick={() => {
              if (window.confirm("로그아웃 하시겠습니까?")) {
                navigate("/");
              }
            }}
          />
        </div>
      </aside>
    </>
  );
}
