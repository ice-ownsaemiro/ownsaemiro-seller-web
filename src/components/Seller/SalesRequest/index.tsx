import { useState, useEffect } from "react";
import * as Styled from "./style";
import { useRecoilState } from "recoil";
import { salesRequestState, totalPageState } from "@/atoms/atoms";
import search_logo from "@/assets/logo_search.svg";
import { useFetchSalesRequest } from "@/hooks/useFetchSalesRequest";
import { SellRequestWrite } from "@/components/Common/Modal";
import { deleteSellerEvent } from "@/apis/seller";
import { instance } from "@/apis/axios";

export default function SellRequest() {
  const [data, setData] = useRecoilState(salesRequestState);
  const [totalPage, setTotalPage] = useRecoilState(totalPageState);
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [open, setOpen] = useState(false);
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

  useFetchSalesRequest(currentPage, itemsPerPage);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setSelectAll(false);
  };

  useEffect(() => {
    if (selectAll) {
      const newSelectedItems = [
        ...new Set([...selectedItems, ...data.map((item) => item.id)]),
      ];
      setSelectedItems(newSelectedItems);
    } else {
      const newSelectedItems = selectedItems.filter(
        (id) => !data.some((item) => item.id === id)
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

  const handleSave = () => {
    setCurrentPage(1);
  };

  const handleCancle = async () => {
    try {
      selectedItems.forEach(async (id) => {
        const response = await deleteSellerEvent(id);

        if (response.status === 200) {
          alert("요청이 취소되었습니다.");
          window.location.reload();
        } else {
          alert("요청 취소에 실패했습니다.");
        }
      });
    } catch (error) {
      console.error("요청 취소 실패", error);
      alert("요청 취소 중 오류가 발생했습니다.");
    }

    setSelectedItems([]);
    setSelectAll(false);
  };

  const fetchData = async () => {
    let url = `/api/seller/apply?page=${currentPage}&size=${itemsPerPage}`;

    if (selectedStatus !== "전체") {
      url += `&status=${selectedStatus}`;
    }

    if (searchKeyword) {
      url += `&name=${searchKeyword}`;
    }

    const response = await instance.get(url);

    setData(response.data.data.event_applies);
    setTotalPage(response.data.data.page_info.total_page);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedStatus, searchKeyword]);

  return (
    <Styled.Content>
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
                }}
              >
                승인 상태
              </div>
              <Styled.Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="전체">전체</option>
                <option value="WAITING">승인 대기</option>
                <option value="COMPLETE">승인 허가</option>
                <option value="REJECT">승인 거절</option>
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
            <Styled.ApprovedBtn onClick={handleOpen}>
              작성하기
            </Styled.ApprovedBtn>
            <Styled.Button onClick={handleCancle}>요청취소</Styled.Button>
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
              <Styled.Th>승인 상태</Styled.Th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <Styled.Td colSpan={7} style={{ textAlign: "center" }}>
                  등록된 판매 요청이 없습니다.
                </Styled.Td>
              </tr>
            ) : (
              data.map((item) => (
                <Styled.Tr>
                  <Styled.Td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </Styled.Td>
                  <Styled.Td>{item.name}</Styled.Td>
                  <Styled.Td>{item.host_name}</Styled.Td>
                  <Styled.Td>{item.apply_date}</Styled.Td>
                  <Styled.Td>{item.duration}</Styled.Td>
                  <Styled.Td state={item.state}>
                    {item.state === "WAITING"
                      ? "승인 대기"
                      : item.state === "COMPLETE"
                        ? "승인 허가"
                        : "승인 거절"}
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
        {open && (
          <SellRequestWrite
            open={open}
            handleClose={handleClose}
            handleSave={handleSave}
          />
        )}
      </Styled.MainContent>
    </Styled.Content>
  );
}
