import { instance } from "@/apis/axios";
import { userNicknameState } from "@/atoms/atoms";
import { useFetchSellerNickname } from "@/hooks/useFetchSellerNickname";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import * as Styled from "./style";
import logo from "@/assets/logo_main.svg";
import sellreq from "@/assets/logo_sellreq.svg";
import sellhis from "@/assets/logo_sellhis.svg";
import logout from "@/assets/logo_logout.svg";

interface ActiveMenuProps {
  activeMenu: any;
  setActiveMenu: any;
}

export default function Seller({ activeMenu, setActiveMenu }: ActiveMenuProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(userNicknameState);

  useFetchSellerNickname();

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
        <Styled.Username>{username.nickname} 님</Styled.Username>
        <Styled.LogoutButton
          src={logout}
          alt="로그아웃 사진 실패"
          onClick={handleLogout}
        />
      </Styled.UserSection>
    </Styled.Sidebar>
  );
}
