import React from "react";
import logo from "../../assets/logo_main.svg";
import * as Styled from "./intro_page_style";
import * as Background_styled from "../background_style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export default function StartPage() {
  const navigate = useNavigate();
  // // -- 테스트

  // // 모킹 어댑터 설정
  // const mock = new MockAdapter(axios);

  // mock.onPost("/api/auth/sign-in").reply(200, {
  //   success: true,
  //   data: null,
  //   error: null,
  // });

  // const handleStartButton = async () => {
  //   try {
  //     // FormData 생성 및 값 추가
  //     const formData = new FormData();
  //     formData.append("serial_id", "seller1234");
  //     formData.append("password", "seller1234");

  //     // Axios를 사용하여 POST 요청 보내기
  //     const response = await axios.post("/api/auth/sign-in", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       withCredentials: true,
  //     });

  //     // 서버로부터 응답 받기
  //     const { success, error } = response.data;

  //     // 응답에 따른 처리
  //     if (success) {
  //       alert("로그인 성공!");
  //     } else {
  //       alert("로그인 실패: " + error);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     alert("An error occurred while fetching data.");
  //   }
  // };

  //테스트--
  const handleStartButton = () => {
    navigate("/seller_loginpage");
  };

  return (
    <Styled.Container>
      <Styled.Title>
        <Styled.TitleContainerWrapper>
          <Styled.TitleTextMedium>안심 거래 플랫폼</Styled.TitleTextMedium>
          <Styled.TitleFlexContainer>
            <Styled.TitleTextLarge>온새미로</Styled.TitleTextLarge>
            <Styled.TitleTextSmall>OWNSAEMIRO</Styled.TitleTextSmall>
          </Styled.TitleFlexContainer>
        </Styled.TitleContainerWrapper>
        <div>
          <Background_styled.Rectangle13 />
          <Background_styled.Rectangle24 />
        </div>
        <Styled.Image src={logo} alt="로고 출력 실패" />
        <Styled.Button onClick={handleStartButton}>시작하기</Styled.Button>
      </Styled.Title>
    </Styled.Container>
  );
}
