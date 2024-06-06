import React from "react";
import * as Background_styled from "../background_style";
import FindPW from "../../components/find_pw_comp/FindPW";
import * as Styled from "./FindPW_page_style";

function SellerLoginPage() {
  return (
    <Styled.Container>
      <Styled.input>
        <FindPW />
        <Background_styled.Rectangle13 />
        <Background_styled.Rectangle24 />
      </Styled.input>
    </Styled.Container>
  );
}

export default SellerLoginPage;


