import { useState, useEffect } from "react";
import search_logo from "../../../assets/logo_search.svg";

import * as Styled from "./style";
import { useFetchSalesHistories } from "../../../hooks/useFetchSalesHistories";
import { useRecoilValue } from "recoil";
import { salesHistoryState } from "../../../atoms/atoms";

export default function SelledHistory() {
  const data = useRecoilValue(salesHistoryState);
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useFetchSalesHistories(currentPage, itemsPerPage);

  const filteredData =
    selectedStatus === "전체"
      ? data
      : data.filter((item) => item.status === selectedStatus);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setSelectAll(false); // 페이지 변경 시 selectAll 상태 초기화
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(filteredData)
    ? filteredData.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = Array.isArray(filteredData)
    ? Math.ceil(filteredData.length / itemsPerPage)
    : 0;

  useEffect(() => {
    if (selectAll) {
      const newSelectedItems = [
        ...new Set([
          ...selectedItems,
          ...currentItems.map((item) => item.eventId),
        ]),
      ];
      setSelectedItems(newSelectedItems);
    } else {
      const newSelectedItems = selectedItems.filter(
        (id) => !currentItems.some((item) => item.eventId === id)
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

  const handleMarkAsSold = () => {
    const newData = data.map((item) =>
      selectedItems.includes(item.eventId)
        ? { ...item, status: "판매 완료" }
        : item
    );
    // setData(newData);
    setSelectedItems([]);
    setSelectAll(false);
  };

  const handleMarkAsStopped = () => {
    const newData = data.map((item) =>
      selectedItems.includes(item.eventId)
        ? { ...item, status: "판매 중지" }
        : item
    );
    setSelectedItems([]);
    setSelectAll(false);
  };

  return (
    <Styled.MainContent key={`${selectedStatus}-${currentPage}`}>
      <h1 style={{ color: "#555" }}>판매 이력</h1>
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
              <Styled.SearchIcon
                className="fa-search"
                src={search_logo}
              ></Styled.SearchIcon>
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
              <option value="판매 완료">판매 완료</option>
              <option value="판매 중">판매 중</option>
              <option value="판매 전">판매 전</option>
              <option value="판매 중지">판매 중지</option>
            </select>
          </Styled.FilterItem>
        </Styled.Filter>
        <Styled.TableHeader>
          <Styled.Button className="btn approve" onClick={handleMarkAsSold}>
            판매 완료
          </Styled.Button>
          <Styled.Button className="btn reject" onClick={handleMarkAsStopped}>
            판매 중지
          </Styled.Button>
        </Styled.TableHeader>
      </Styled.FilterTableHeader>
      <Styled.Table style={{ borderRadius: "5px", width: "70vw" }}>
        <thead>
          <tr>
            <Styled.Th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </Styled.Th>
            <Styled.Th>공연명</Styled.Th>
            <Styled.Th>신청자명</Styled.Th>
            <Styled.Th>신청일</Styled.Th>
            <Styled.Th>공연일</Styled.Th>
            <Styled.Th>상태</Styled.Th>
            <Styled.Th> </Styled.Th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <Styled.Td colSpan={7} style={{ textAlign: "center" }}>
                데이터가 없습니다
              </Styled.Td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.eventId}>
                <Styled.Td onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.eventId)}
                    onChange={() => handleSelectItem(item.eventId)}
                  />
                </Styled.Td>
                <Styled.Td>{item.eventName}</Styled.Td>
                <Styled.Td>{item.hostName}</Styled.Td>
                <Styled.Td>{item.applyDate}</Styled.Td>
                <Styled.Td>{item.duration}</Styled.Td>
                <Styled.Td>{item.status}</Styled.Td>
                <Styled.Td
                  className={
                    item.status === "판매 완료"
                      ? "selled"
                      : item.status === "판매 중"
                        ? "selling"
                        : item.status === "판매 전"
                          ? "beforesell"
                          : item.status === "판매 중지"
                            ? "selldeny"
                            : ""
                  }
                >
                  {item.status}
                </Styled.Td>
              </tr>
            ))
          )}
        </tbody>
      </Styled.Table>
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
    </Styled.MainContent>
  );
}
