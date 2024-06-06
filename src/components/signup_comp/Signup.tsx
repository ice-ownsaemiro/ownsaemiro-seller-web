// src/components/Signup/Signup.tsx
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_login.svg'
import check from '../../assets/logo_check.svg';
import error from '../../assets/logo_error.svg';
import {
  SignupContainer,
  TabContainer,
  TabLink,
  FormContainer,
  LoginLabel,
  LoginInput,
  SignupCheckButton,
  SignupEndButton,
  CheckContainer,
  ErrorContainer,
} from "./SignupStyle";

function Signup() {
  /* 판매자 회원가입을 위한 useState */
  const [isSellerSignup, setIsSellerSignup] = useState(true);
  /* 관리자 회원가입을 위한 useState */
  const [isManagerSignup, setIsManagerSignup] = useState(false); 

  const [name, setName] = useState(''); // 이름 저장
  const [email, setEmail] = useState(''); // 이메일 저장
  const [saveID, setSaveID] = useState(''); // saveID 저장
  const [savePW, setSavePW] = useState(''); // savePW 저장
  const [confirmPW, setConfirmPW] = useState(''); // savePW 일치 저장
  
  /* 이메일 인증을 위한 useState */
  const [isEmailCheck, setIsEmailVerified] = useState<boolean | null>(null); // 처음에는 인증 상태가 없기 때문에 null로 설정
  /* saveID 중복 체크를 위한 useState */
  const [isIDCheck, setIsIdUnique] = useState<boolean | null>(null); // 처음에는 인증 상태가 없기 때문에 null로 설정
  /* savePW 일치 체크를 위한 useState */
  const [isPWCheck, setIsPWCheck] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const handleEmailVerification = () => {
    setIsEmailVerified(true);
  };

  const handleIDCheck = () => {
    setIsIdUnique(true);
  };

  const handleSubmit = () => {
    if (isEmailCheck && isIDCheck && savePW === confirmPW) {
      alert("회원가입 완료되었습니다.\n\n로그인 해주세요.");
      navigate('/');
    } else {
      alert("Form validation failed");
    }
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
            setEmail("");
            setSaveID("");
            setSavePW("");
            setConfirmPW("");
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
            setEmail("");
            setSaveID("");
            setSavePW("");
            setConfirmPW("");
          }}
        >
          관리자
        </TabLink>
      </TabContainer>
      <FormContainer>
        {/* 이름 */}
        <LoginLabel>이름</LoginLabel>
        <LoginInput
          style={{ width: "240px" }}
          type="text"
          placeholder="이름(실명)을 입력해주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* 이메일 */}
        <LoginLabel>이메일</LoginLabel>
        <div style={{ display: "flex" }}>
          <LoginInput
            style={{ width: "320px" }}
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SignupCheckButton type="button" onClick={handleEmailVerification}>인증하기</SignupCheckButton>
        </div>
        { // 이메일 인증 완료 시 출력
          isEmailCheck ? 
          <CheckContainer>
            <img src={check} alt="체크 출력 실패" />
            <div>인증이 완료되었습니다.</div>
          </CheckContainer> : <div />
        }

        {/* 아이디 */}
        <LoginLabel>아이디</LoginLabel>
        <div style={{ display: "flex" }}>
          <LoginInput
            style={{ width: "240px" }}
            type="text"
            placeholder="사용할 아이디를 입력해주세요."
            value={saveID}
            onChange={(e) => setSaveID(e.target.value)}
          />
          <SignupCheckButton type="button" onClick={handleIDCheck}>중복확인</SignupCheckButton>
        </div>
        { // 아이디 체크 완료 상태 출력
          isIDCheck === true ? 
          <CheckContainer>
            <img src={check} alt="체크 출력 실패" />
            <div>사용 가능한 아이디입니다.</div>
          </CheckContainer> : 
          isIDCheck === false ? (
            <ErrorContainer>
              <img src={error} alt="체크 출력 실패" />
              <div>이미 사용 중인 아이디입니다.</div>
            </ErrorContainer>
          ) : <div />
        }

        {/* 비밀번호 */}
        <LoginLabel>비밀번호</LoginLabel>
        <LoginInput
          style={{ width: "320px", marginBottom: "10px" }}
          type="password"
          placeholder="영문+숫자 조합 8자리 이상 입력해주세요."
          value={savePW}
          onChange={(e) => setSavePW(e.target.value)}
        />
        <LoginInput
          style={{ width: "320px" }}
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPW}
          onChange={
            (e) => {
              setConfirmPW(e.target.value);
              setIsPWCheck(true);
            }
          }
        />
        {
          (savePW !== confirmPW) && isPWCheck !== null ?
          <ErrorContainer>
            <img src={error} alt="체크 출력 실패" />
            <div>비밀번호를 다시 입력해주세요.</div>
          </ErrorContainer> : 
          (savePW === confirmPW) && isPWCheck !== null ?
          <CheckContainer>
            <img src={check} alt="체크 출력 실패" />
            <div>비밀번호가 일치합니다.</div>
          </CheckContainer> : <div />
        }
      </FormContainer>
      <SignupEndButton type="button" onClick={handleSubmit} disabled={!isEmailCheck || !isIDCheck || savePW !== confirmPW}>시작하기</SignupEndButton>
    </SignupContainer>
  );
}

export default Signup;
