// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo_main.svg";
// import sellhis from "../../assets/logo_sellhis.svg";
// import sellreq from "../../assets/logo_sellreq.svg";
// import logout from "../../assets/logo_logout.svg";
// import SelledHistory from "../Seller/SelledHistory";
// import SellRequest from "../Seller/SellRequest";
// import Cookies from "js-cookie";
// import axios from "axios";
// import {
//   Container,
//   MainContent,
//   Sidebar,
//   MenuSelect,
//   MenuImage,
//   MenuItem,
//   UserSection,
//   Username,
//   LogoutButton,
// } from "./MainPageStyle";

// function Main() {
//   const [activeMenu, setActiveMenu] = useState("History");
//   const navigate = useNavigate();
//   const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

//   useEffect(() => {
//     const accessToken = Cookies.get("accessToken");
//     if (!accessToken) {
//       navigate("/"); // 토큰이 없으면 로그인 페이지로 리다이렉트
//     } else {
//       axios
//         .get(`${serverUrl}/api/auth/validate-token`, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         })
//         .then((response) => {
//           if (!response.data.valid) {
//             navigate("/"); // 토큰이 유효하지 않으면 로그인 페이지로 리다이렉트
//           }
//         })
//         .catch((error) => {
//           console.error("토큰 검증 실패:", error);
//           navigate("/"); // 오류 발생 시 로그인 페이지로 리다이렉트
//         });
//     }
//   }, [navigate, serverUrl]);

//   const renderContent = () => {
//     switch (activeMenu) {
//       case "History":
//         return <SelledHistory />;
//       case "Request":
//         return <SellRequest />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Container>
//       <Seller activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
//       <MainContent>{renderContent()}</MainContent>
//     </Container>
//   );
// }

// export default Main;

// interface ActiveMenuProps {
//   activeMenu: any;
//   setActiveMenu: any;
// }

// function Seller({ activeMenu, setActiveMenu }: ActiveMenuProps) {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("판매자");

//   useEffect(() => {
//     const id = Cookies.get("ID");
//     if (id) {
//       setUsername(id);
//     }
//   }, []);

//   const handleLogout = () => {
//     if (window.confirm("로그아웃 하시겠습니까?")) {
//       Cookies.remove("ID");
//       Cookies.remove("accessToken");
//       navigate("/");
//     }
//   };

//   return (
//     <Sidebar>
//       <img
//         src={logo}
//         alt="로고 출력 실패"
//         style={{
//           width: "60px",
//           height: "60px",
//           margin: "10px 10px 80px 10px",
//         }}
//       />
//       <div>
//         <MenuSelect
//           className={activeMenu === "History" ? "active" : ""}
//           onClick={() => setActiveMenu("History")}
//         >
//           <MenuImage src={sellhis} alt="판매 이력 사진 실패" />
//           <MenuItem>판매 이력</MenuItem>
//         </MenuSelect>
//         <MenuSelect
//           className={activeMenu === "Request" ? "active" : ""}
//           onClick={() => setActiveMenu("Request")}
//         >
//           <MenuImage src={sellreq} alt="판매 요청 사진 실패" />
//           <MenuItem>판매 요청</MenuItem>
//         </MenuSelect>
//       </div>
//       <UserSection>
//         <Username>{username} 님</Username>
//         <LogoutButton
//           src={logout}
//           alt="로그아웃 사진 실패"
//           onClick={handleLogout}
//         />
//       </UserSection>
//     </Sidebar>
//   );
// }
