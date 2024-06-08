import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelledHistory from "../Seller/SalesHistory";
import SellRequest from "../Seller/SalesRequest";

import * as Styled from "./style";
import Seller from "../Seller";

export default function Main() {
  const [activeMenu, setActiveMenu] = useState("History");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeMenu) {
      case "History":
        return <SelledHistory />;
      case "Request":
        return <SellRequest />;
      default:
        return null;
    }
  };

  return (
    <Styled.Container>
      <Seller activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <Styled.MainContent>{renderContent()}</Styled.MainContent>
    </Styled.Container>
  );
}
