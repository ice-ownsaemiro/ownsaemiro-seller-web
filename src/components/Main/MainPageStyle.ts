// src/components/MainPageStyle.ts
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

`;

export const MainContent = styled.div`
    margin: 30px;
  flex-grow: 1;
  padding: 20px;
`;

export const Sidebar = styled.aside`
    width: 30vw;
  min-width:300px;
  max-width:330px;
  height: 95vh;
  background-color: #5C6ED0;
  color: white;
  padding: 20px;
  position: relative;
  transition: background-color 0.3s, color 0.3s;
`;

export const MenuSelect = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  width: 100%;
  background-color: transparent;
  border: 0px;
  border-radius: 10px;
  margin-bottom: 20px;

  &.active {
    background-color: #7D8BD9;
  }

  &:hover {
    background-color: #7D8BD9;
  }
`;

export const MenuImage = styled.img`
  padding: 15px;
`;

export const MenuItem = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #FFF;
  padding: 10px 20px;
`;

export const UserSection = styled.div`
  position: absolute;
  bottom: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px;
  padding: 15px;
`;

export const Username = styled.span`
  font-size: 18px;
`;

export const LogoutButton = styled.img`
  font-size: 16px;
  color: #FFF;
  background-color: transparent;
  border: none;
  border-radius: 10px;
  margin-left: auto;
  margin-right: 10px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #98A9F0;
  }
`;
