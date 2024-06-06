import { useState, useEffect } from "react";
import plus from "../../../assets/logo_plus.svg";
import search_logo from "../../../assets/logo_search.svg";
import { Table, Th, Td } from "./style";

import * as Styled from "./style";
import { salesRequestState } from "../../../atoms/atoms";
import { useRecoilValue } from "recoil";
import { SellRequestWrite } from "../../Common/Modal";

function SellRequest() {
  const data = useRecoilValue(salesRequestState);
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedItems([]);
    setSelectAll(false);
  }, [selectedStatus]);

  const filteredData =
    selectedStatus === "전체"
      ? data
      : data.filter((item) => item.state === selectedStatus);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setSelectAll(false); // 페이지 변경 시 selectAll 상태 초기화
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    if (selectAll) {
      const newSelectedItems = [
        ...new Set([...selectedItems, ...currentItems.map((item) => item.id)]),
      ];
      setSelectedItems(newSelectedItems);
    } else {
      const newSelectedItems = selectedItems.filter(
        (id) => !currentItems.some((item) => item.id === id)
      );
      setSelectedItems(newSelectedItems);
    }
  }, [selectAll, currentPage, filteredData]);

  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(10 / 2), totalPages - 9)
  );
  const endPage = Math.min(totalPages, startPage + 9);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDelete = () => {
    const newData = data.filter((item) => !selectedItems.includes(item.id));
    // setData(newData);
    setSelectedItems([]);
    setSelectAll(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (newItem: any) => {
    // setData([...data, newItem]);
  };

  return (
    <Styled.MainContent key={`${selectedStatus}-${currentPage}`}>
      <h1 style={{ color: "#555" }}>판매 요청</h1>
      <Styled.FilterTableHeader>
        <Styled.Filter>
          <Styled.FilterItem>
            <div
              style={{
                color: "#999",
                fontWeight: "bold",
                marginBottom: "5px",
                width: "30vw",
              }}
            >
              검색
            </div>
            <Styled.SearchBar>
              <Styled.SearchIcon src={search_logo}></Styled.SearchIcon>
              <Styled.SearchBarInput type="search" placeholder="검색" />
            </Styled.SearchBar>
          </Styled.FilterItem>
          <Styled.FilterItem>
            <div
              style={{ color: "#999", fontWeight: "bold", marginBottom: "5px" }}
            >
              상태
            </div>
            <select
              value={selectedStatus}
              style={{
                border: "2px solid #E5E5E5",
                borderRadius: "5px",
                height: "31px",
              }}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="전체">전체</option>
              <option value="승인 대기">승인 대기</option>
              <option value="승인 완료">승인 완료</option>
              <option value="승인 거절">승인 거절</option>
            </select>
          </Styled.FilterItem>
        </Styled.Filter>
        <Styled.TableHeader>
          <Styled.Button className="btn approve" onClick={handleOpen}>
            <img
              src={plus}
              alt="plus icon"
              style={{ width: "16px", height: "16px", marginRight: "8px" }}
            />
            작성 하기
          </Styled.Button>
          <Styled.Button className="btn reject" onClick={handleDelete}>
            요청 취소
          </Styled.Button>
        </Styled.TableHeader>
      </Styled.FilterTableHeader>
      <Table style={{ borderRadius: "5px", width: "70vw" }}>
        <thead>
          <tr>
            <Th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </Th>
            <Th>공연명</Th>
            <Th>신청자명</Th>
            <Th>신청일</Th>
            <Th>공연일</Th>
            <Th>좌석 수</Th>
            <Th>상태</Th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <Td onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
              </Td>
              <Td>{item.name}</Td>
              <Td>{item.hostName}</Td>
              <Td>{item.applyDate}</Td>
              <Td>{item.duration}</Td>
              <Td>{item.state}</Td>
              <Td
                className={
                  item.state === "승인 대기"
                    ? "stanby"
                    : item.state === "승인 완료"
                      ? "approved"
                      : item.state === "승인 거절"
                        ? "rejected"
                        : ""
                }
              >
                {item.state}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Styled.Pagination>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ color: "#555555" }}
        >
          &lt;
        </button>
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={currentPage === pageNumber}
            style={{
              color: currentPage === pageNumber ? "#576FD7" : "#555555",
              textDecoration: currentPage === pageNumber ? "underline" : " ",
            }}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ color: "#555555" }}
        >
          &gt;
        </button>
      </Styled.Pagination>
      {open && (
        <SellRequestWrite
          open={open}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      )}
    </Styled.MainContent>
  );
}

export default SellRequest;
