import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_main.svg";
import sellhis from "../../assets/logo_sellhis.svg";
import sellreq from "../../assets/logo_sellreq.svg";
import logout from "../../assets/logo_logout.svg";
import SelledHistory from "../Seller/SalesHistory";
import SellRequest from "../Seller/SalesRequest";
import { instance } from "../../apis/axios";

import * as Styled from "./style";
import Cookies from "js-cookie";

export default function Main() {
  const [activeMenu, setActiveMenu] = useState("History");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      navigate("/");
    }
  });

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
    <Styled.Container>
      <Seller activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <Styled.MainContent>{renderContent()}</Styled.MainContent>
    </Styled.Container>
  );
}

interface ActiveMenuProps {
  activeMenu: any;
  setActiveMenu: any;
}

function Seller({ activeMenu, setActiveMenu }: ActiveMenuProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("판매자");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await instance.get("/api/seller/nickname");

        if (response.status === 200) {
          setUsername(response.data.data.nickname);
        } else {
          alert("사용자 정보를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("사용자 정보 요청 실패", error);
        alert("사용자 정보 요청 중 오류가 발생했습니다.");
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        const response = await instance.get("/api/auth/logout");

        if (response.status === 200) {
          alert("로그아웃 되었습니다.");
          navigate("/");
        } else {
          alert("로그아웃에 실패했습니다.");
        }
      } catch (error) {
        console.error("로그아웃 요청 실패", error);
        alert("로그아웃 요청 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Styled.Sidebar>
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
        <Styled.MenuSelect
          className={activeMenu === "History" ? "active" : ""}
          onClick={() => setActiveMenu("History")}
        >
          <Styled.MenuImage src={sellhis} alt="판매 이력 사진 실패" />
          <Styled.MenuItem>판매 이력</Styled.MenuItem>
        </Styled.MenuSelect>
        <Styled.MenuSelect
          className={activeMenu === "Request" ? "active" : ""}
          onClick={() => setActiveMenu("Request")}
        >
          <Styled.MenuImage src={sellreq} alt="판매 요청 사진 실패" />
          <Styled.MenuItem>판매 요청</Styled.MenuItem>
        </Styled.MenuSelect>
      </div>
      <Styled.UserSection>
        <Styled.Username>{username} 님</Styled.Username>
        <Styled.LogoutButton
          src={logout}
          alt="로그아웃 사진 실패"
          onClick={handleLogout}
        />
      </Styled.UserSection>
    </Styled.Sidebar>
  );
}
