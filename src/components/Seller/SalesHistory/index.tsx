import { useState, useEffect } from "react";
import search_logo from "@/assets/logo_search.svg";
import * as Styled from "./style";
import { useFetchSalesHistories } from "@/hooks/useFetchSalesHistories";
import { useRecoilState, useRecoilValue } from "recoil";
import { salesHistoryState, totalPageState } from "@/atoms/atoms";
import { updateSellerEventStatus } from "@/apis/seller";
import { instance } from "@/apis/axios";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

export default function SelledHistory() {
  const [data, setData] = useRecoilState(salesHistoryState);
  const [totalPage, setTotalPage] = useRecoilState(totalPageState);
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(10 / 2), totalPage - 9)
  );
  const endPage = Math.min(totalPage, startPage + 9);

  useFetchSalesHistories(currentPage, itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setSelectAll(false);
  };

  useEffect(() => {
    if (selectAll) {
      const newSelectedItems = [
        ...new Set([...selectedItems, ...data.map((item) => item.event_id)]),
      ];
      setSelectedItems(newSelectedItems);
    } else {
      const newSelectedItems = selectedItems.filter(
        (id) => !data.some((item) => item.event_id === id)
      );
      setSelectedItems(newSelectedItems);
    }
  }, [selectAll, currentPage, data]);

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

  const handleComplete = async () => {
    try {
      selectedItems.forEach(async (id) => {
        const response = await updateSellerEventStatus(id, "COMPLETE");

        if (response.status === 200) {
          alert("판매완료 처리되었습니다.");
          window.location.reload();
        } else {
          alert("판매완료 처리에 실패했습니다.");
        }
      });
    } catch (error) {
      console.error("판매완료 처리 실패", error);
      alert("판매완료 처리 중 오류가 발생했습니다.");
    }

    setSelectedItems([]);
    setSelectAll(false);
  };

  const handlePause = async () => {
    try {
      selectedItems.forEach(async (id) => {
        const response = await updateSellerEventStatus(id, "PAUSE");

        if (response.status === 200) {
          alert("판매중지 처리되었습니다.");
          window.location.reload();
        } else {
          alert("판매중지 처리에 실패했습니다.");
        }
      });
    } catch (error) {
      console.error("판매중지 처리 실패", error);
      alert("판매중지 처리 중 오류가 발생했습니다.");
    }

    setSelectedItems([]);
    setSelectAll(false);
  };

  const fetchData = async () => {
    let url = `/api/seller/histories?page=${currentPage}&size=${itemsPerPage}`;

    if (selectedStatus !== "전체") {
      url += `&status=${selectedStatus}`;
    }

    if (searchKeyword !== "") {
      url += `&name=${searchKeyword}`;
    }

    const result = await instance.get(url);

    setData(result.data.data.my_event_histories);
    setTotalPage(result.data.data.page_info.total_page);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedStatus, searchKeyword]);

  return (
    <Styled.Content>
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
                }}
              >
                판매 상태
              </div>
              <Styled.Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="전체">전체</option>
                <option value="BEFORE">판매 전</option>
                <option value="SELLING">판매 중</option>
                <option value="SOLDOUT">매진</option>
                <option value="COMPLETE">판매 완료</option>
                <option value="PAUSE">판매 중지</option>
              </Styled.Select>
            </Styled.FilterItem>
            <Styled.FilterItem>
              <div
                style={{
                  color: "#999",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                검색
              </div>
              <Styled.SearchBar>
                <Styled.SearchIcon src={search_logo}></Styled.SearchIcon>
                <Styled.SearchBarInput
                  type="search"
                  placeholder="검색"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </Styled.SearchBar>
            </Styled.FilterItem>
          </Styled.Filter>
          <Styled.TableHeader>
            <Styled.ApprovedBtn onClick={handleComplete}>
              판매 완료
            </Styled.ApprovedBtn>
            <Styled.Button onClick={handlePause}>판매 중지</Styled.Button>
          </Styled.TableHeader>
        </Styled.FilterTableHeader>
        <Styled.Table>
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
              <Styled.Th>판매 상태</Styled.Th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <Styled.Td colSpan={7} style={{ textAlign: "center" }}>
                  등록된 판매 이력이 없습니다.
                </Styled.Td>
              </tr>
            ) : (
              data.map((item) => (
                <Styled.Tr>
                  <Styled.Td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.event_id)}
                      onChange={() => handleSelectItem(item.event_id)}
                    />
                  </Styled.Td>
                  <Styled.Td>{item.event_name}</Styled.Td>
                  <Styled.Td>{item.host_name}</Styled.Td>
                  <Styled.Td>{item.apply_date}</Styled.Td>
                  <Styled.Td>{item.duration}</Styled.Td>
                  <Styled.Td status={item.status}>
                    {item.status === "BEFORE"
                      ? "판매 전"
                      : item.status === "SELLING"
                        ? "판매 중"
                        : item.status === "SOLDOUT"
                          ? "매진"
                          : item.status === "COMPLETE"
                            ? "판매 완료"
                            : "판매 중지"}
                  </Styled.Td>
                </Styled.Tr>
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
            disabled={currentPage === totalPage}
            style={{ color: "#555555" }}
          >
            &gt;
          </button>
        </Styled.Pagination>
      </Styled.MainContent>
    </Styled.Content>
  );
}
