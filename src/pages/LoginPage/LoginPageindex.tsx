import React from "react";
import * as Background_styled from "../background_style";
import Login from "../../components/login_comp/Login";
import * as Styled from "./login_page_style";

function SellerLoginPage() {
  return (
    <Styled.Container>
      <Styled.input>
        <Login />
        <Background_styled.Rectangle13 />
        <Background_styled.Rectangle24 />
      </Styled.input>
    </Styled.Container>
  );
}

export default SellerLoginPage;
