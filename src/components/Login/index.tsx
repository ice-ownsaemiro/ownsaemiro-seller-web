import * as Styled from "./style";
import logo from "../../assets/logo_login.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginContainer() {
  const navigagte = useNavigate();
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");

  const handleLogin = () => {
    navigagte("/main");
  };

  return (
    <Styled.LoginContainer>
      <Styled.LogoContainer>
        <img src={logo} alt="로고 출력 실패" />
      </Styled.LogoContainer>
      <Styled.FormContainer onSubmit={handleLogin}>
        <div>
          <div style={{ color: "#999" }}>아이디</div>
          <input
            type="text"
            name="ID"
            className="login-text"
            value={ID}
            onChange={(e) => setID(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "25px" }}>
          <div style={{ color: "#999" }}>비밀번호</div>
          <input
            type="password"
            name="PW"
            className="login-text"
            value={PW}
            onChange={(e) => setPW(e.target.value)}
          />
        </div>
        <p>
          <input type="submit" value="로그인" className="login-button" />
        </p>
      </Styled.FormContainer>

      <Styled.ButtonContainer>
        <button
          className="signup-button right-align"
          onClick={() => navigagte("/register")}
        >
          회원가입
        </button>
        |
        <button
          className="signup-button left-align"
          onClick={() => navigagte("/find")}
        >
          비밀번호 찾기
        </button>
      </Styled.ButtonContainer>
    </Styled.LoginContainer>
  );
}
