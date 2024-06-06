import React, { useState, useEffect } from "react";
import plus from "../../assets/logo_plus.svg";
import search_logo from "../../assets/logo_search.svg";
import { SellHistoryData } from "./Data/SellHistoryData";
import SellRequestWrite from "./Modal/SellRequestWrite";
import {
  MainContent,
  FilterTableHeader,
  Filter,
  FilterItem,
  SearchBar,
  SearchBarInput,
  SearchIcon,
  TableHeader,
  Button,
  Table,
  Th,
  Td,
  Pagination,
} from "./Style/SellerPageStyle";

function SellRequest() {
  const [data, setData] = useState(SellHistoryData);
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
      : data.filter((item) => item.status === selectedStatus);

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
    setData(newData);
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
    setData([...data, newItem]);
  };

  return (
    <MainContent key={`${selectedStatus}-${currentPage}`}>
      <h1 style={{ color: "#555" }}>판매 요청</h1>
      <FilterTableHeader>
        <Filter>
          <FilterItem>
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
            <SearchBar>
              <SearchIcon src={search_logo}></SearchIcon>
              <SearchBarInput
                type="search"
                placeholder="검색"
              />
            </SearchBar>
          </FilterItem>
          <FilterItem>
            <div
              style={{ color: "#999", fontWeight: "bold", marginBottom: "5px" }}
            >
              상태
            </div>
            <select
              value={selectedStatus}
              style={{ border: "2px solid #E5E5E5", borderRadius: "5px", height:"31px"  }}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="전체">전체</option>
              <option value="승인 대기">승인 대기</option>
              <option value="승인 완료">승인 완료</option>
              <option value="승인 거절">승인 거절</option>
            </select>
          </FilterItem>
        </Filter>
        <TableHeader>
          <Button className="btn approve" onClick={handleOpen}>
            <img
              src={plus}
              alt="plus icon"
              style={{ width: "16px", height: "16px", marginRight: "8px" }}
            />
            작성 하기
          </Button>
          <Button className="btn reject" onClick={handleDelete}>
            요청 취소
          </Button>
        </TableHeader>
      </FilterTableHeader>
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
              <Td>{item.eventName}</Td>
              <Td>{item.applicant}</Td>
              <Td>{item.requestDate}</Td>
              <Td>{item.eventDate}</Td>
              <Td>{item.seatstatus}</Td>
              <Td
                className={
                  item.status === "승인 대기"
                    ? "stanby"
                    : item.status === "승인 완료"
                    ? "approved"
                    : item.status === "승인 거절"
                    ? "rejected"
                    : ""
                }
              >
                {item.status}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
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
      </Pagination>
      {open && (
        <SellRequestWrite
          open={open}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      )}
    </MainContent>
  );
}

export default SellRequest;
