// src/components/FindPW/FindPW.tsx
import { useState } from "react";
import axios from 'axios';

import logo from '../../assets/logo_login.svg'
import error from '../../assets/logo_error.svg';
import {
  SignupContainer,
  TabContainer,
  TabLink,
  FormContainer,
  LoginLabel,
  LoginInput,
  SignupEndButton,
  ErrorContainer,
} from "./FindPWStyle";

function FindPW() {
  /* 판매자 비밀번호 찾기 위한 useState */
  const [isSellerSignup, setIsSellerSignup] = useState(true);
  /* 관리자 비밀번호 찾기 위한 useState */
  const [isManagerSignup, setIsManagerSignup] = useState(false);

  const [name, setName] = useState('');
  const [ID, setID] = useState('');

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
    <SignupContainer>
      <img src={logo} alt="로고 출력 실패" style={{ margin: "15px", color: "#576FD7" }} />
      <TabContainer>
        <TabLink
          className={isSellerSignup ? 'tab-active' : ''}
          onClick={() => {
            setIsSellerSignup(true);
            setIsManagerSignup(false);

            setName("");
            setID("");
          }}
        >
          판매자
        </TabLink>
        <TabLink
          className={isManagerSignup ? 'tab-active' : ''}
          onClick={() => {
            setIsManagerSignup(true);
            setIsSellerSignup(false);

            setName("");
            setID("");
          }}
        >
          관리자
        </TabLink>
      </TabContainer>

      <FormContainer>
        <LoginLabel>이름</LoginLabel>
        <div style={{ display: "flex" }}>
          <LoginInput
            type="text"
            placeholder="이름(실명)을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <LoginLabel>아이디</LoginLabel>
        <LoginInput
          type="text"
          placeholder="사용할 아이디를 입력해주세요."
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
        {isIDError ? (
          <ErrorContainer>
            <img src={error} alt="체크 출력 실패" />
            <div>존재하지 않는 아이디입니다.</div>
          </ErrorContainer>
        ) : (
          <div />
        )}
      </FormContainer>
      <SignupEndButton type="button" onClick={handleSubmit} disabled={name === '' || ID === ''}>
        비밀번호 찾기
      </SignupEndButton>
    </SignupContainer>
  );
}

export default FindPW;
