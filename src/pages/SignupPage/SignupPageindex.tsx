import React from "react";
import * as Background_styled from "../background_style";
import Signup from "../../components/signup_comp/Signup";
import * as Styled from "./signup_page_style";

function SellerLoginPage() {
  return (
    <Styled.Container>
      <Styled.input>
        <Signup />
        <Background_styled.Rectangle13 />
        <Background_styled.Rectangle24 />
      </Styled.input>
    </Styled.Container>
  );
}

export default SellerLoginPage;
