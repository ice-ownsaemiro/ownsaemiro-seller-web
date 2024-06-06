// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo_login.svg";
// import {
//   LoginContainer,
//   LogoContainer,
//   FormContainer,
//   ButtonContainer,
// } from "./LoginStyle";
// import { instance } from "../../apis/axios"; // axios 인스턴스를 가져옴
// import Cookies from "js-cookie";

// function LogIn() {
//   const [ID, setID] = useState("");
//   const [PW, setPW] = useState("");

//   const navigate = useNavigate();
//   const serverUrl = import.meta.env.VITE_APP_SERVER_URL;
//   const sellerToken = import.meta.env.VITE_APP_SELLER_TOKEN;

//   const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("serial_id", ID);
//       formData.append("password", PW);

//       console.log("Server URL:", serverUrl);
//       console.log("Seller Token:", sellerToken);

//       const response = await instance.post(`/api/auth/sign-in`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "Seller-Token": sellerToken,
//         },
//       });

//       if (response.data.success) {
//         const accessToken = response.data.accessToken;
//         Cookies.set("accessToken", accessToken, {
//           path: "/",
//           domain: "cafevery.site",
//         });
//         Cookies.set("ID", ID, {
//           path: "/",
//           domain: "cafevery.site",
//         });
//         alert("로그인 성공");
//         navigate("/mainpage");
//       } else {
//         alert("아이디 또는 비밀번호가 올바르지 않습니다.");
//       }
//     } catch (error) {
//       console.error("로그인 요청 실패:", error);

//       // if (error.response && error.response.status === 401) {
//       //   alert("아이디 또는 비밀번호가 올바르지 않습니다.");
//       // } else {
//       //   console.error("로그인 요청 실패:", error);
//       //   alert("로그인 요청에 실패하였습니다.");
//       // }
//     }
//   };

//   return (
//     <LoginContainer>
//       <LogoContainer>
//         <img src={logo} alt="로고 출력 실패" />
//         <div className="seller-page">판매자로 로그인</div>
//       </LogoContainer>

//       <FormContainer onSubmit={handleLogin}>
//         <div>
//           <div style={{ color: "#999" }}>아이디</div>
//           <input
//             type="text"
//             name="ID"
//             className="login-text"
//             value={ID}
//             onChange={(e) => setID(e.target.value)}
//           />
//         </div>
//         <div style={{ marginTop: "25px" }}>
//           <div style={{ color: "#999" }}>비밀번호</div>
//           <input
//             type="password"
//             name="PW"
//             className="login-text"
//             value={PW}
//             onChange={(e) => setPW(e.target.value)}
//           />
//         </div>
//         <p>
//           <input type="submit" value="로그인" className="login-button" />
//         </p>
//       </FormContainer>

//       <ButtonContainer>
//         <button
//           className="signup-button right-align"
//           onClick={() => navigate("/seller_signup")}
//         >
//           회원가입
//         </button>
//         |
//         <button
//           className="signup-button left-align"
//           onClick={() => navigate("/seller_findPW")}
//         >
//           비밀번호 찾기
//         </button>
//       </ButtonContainer>
//     </LoginContainer>
//   );
// }

// export default LogIn;
