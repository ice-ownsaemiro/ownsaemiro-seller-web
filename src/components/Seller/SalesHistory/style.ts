// src/components/seller/SelledHistoryStyle.ts
import styled from "styled-components";

export const MainContent = styled.main`
  margin: 30px;
  flex-grow: 1;
  padding: 20px;
`;

export const FilterTableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15vh;
`;

export const Filter = styled.div`
  display: flex;
  height: 15wh;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  align-items: center;
  background-color: #f8fcff;
  justify-content: flex-start;
  margin-bottom: 25px;
  padding: 20px 40px 30px 40px;
  gap: 30px;
`;

export const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchBar = styled.div`
  width: 30vw;
  height: 27px;
  border-radius: 5px;
  border: 2px solid #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: 1;
`;

export const SearchBarInput = styled.input`
  width: 30vw;
  border: none;
  -webkit-appearance: none;
  text-align: left;
  margin-left: 10px;
  overflow: auto;
  z-index: -1;
  font-size: 15px;

  &:focus {
    outline: none;
    text-align: left;
  }
`;

export const SearchIcon = styled.img`
  font-size: 15px;
  margin-left: 5px;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  gap: 10px;
`;

export const Button = styled.button`
  width: 112px;
  height: 36px;
  margin-top: 114px;
  margin-left: 10px;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.approve {
    background-color: #576fd7;
    color: white;
  }

  &.reject {
    background-color: white;
    color: #7e7e7e;
    border: 1px solid #576fd7;
    opacity: 1;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #e5e5e5;
  border-radius: 5px;
  text-align: center;
`;

export const Th = styled.th`
  color: #999;
  padding: 15px;
  border-bottom: 2px solid #e5e5e5;
  background-color: #f8fcff;
`;

export const Td = styled.td`
  color: #555;
  padding: 15px;
  border-bottom: 2px solid #e5e5e5;

  &.selled {
    color: #999999;
  }

  &.selling {
    color: #67a238;
  }

  &.beforesell {
    color: #576fd7;
  }

  &.selldeny {
    color: #eb5a5a;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;

  button {
    font-size: 20px;
    color: #555;
    border: 0px;
    background-color: transparent;
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;

    &:hover {
      color: #576fd7;
    }
  }
`;
