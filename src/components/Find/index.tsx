import { useState } from "react";

import logo from "../../assets/logo_login.svg";
import error from "../../assets/logo_error.svg";
import * as Styled from "./style";

export default function FindPW() {
  const [name, setName] = useState("");
  const [ID, setID] = useState("");

  const [isIDError, setIsIDError] = useState<boolean | null>(null);

  const handleSubmit = () => {
    setIsIDError(true);
    // axios.get(`https://api/auth/findPW`)
    // .then((res)=>{
    //   // res.data를 이용한 비밀번호 찾기 기능 추가
    // })
    // .catch((e)=>{
    //   alert(e);
    // })
  };

  return (
    <Styled.SignupContainer>
      <img
        src={logo}
        alt="로고 출력 실패"
        style={{ margin: "15px", color: "#576FD7" }}
      />

      <Styled.FormContainer>
        <Styled.LoginLabel>이름</Styled.LoginLabel>
        <div style={{ display: "flex" }}>
          <Styled.LoginInput
            type="text"
            placeholder="이름(실명)을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Styled.LoginLabel>아이디</Styled.LoginLabel>
        <Styled.LoginInput
          type="text"
          placeholder="사용할 아이디를 입력해주세요."
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
        {isIDError ? (
          <Styled.ErrorContainer>
            <img src={error} alt="체크 출력 실패" />
            <div>존재하지 않는 아이디입니다.</div>
          </Styled.ErrorContainer>
        ) : (
          <div />
        )}
      </Styled.FormContainer>
      <Styled.SignupEndButton
        type="button"
        onClick={handleSubmit}
        disabled={name === "" || ID === ""}
      >
        비밀번호 찾기
      </Styled.SignupEndButton>
    </Styled.SignupContainer>
  );
}
