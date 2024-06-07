import { useEffect } from "react";
import { salesHistoryState, totalPageState } from "@/atoms/atoms";
import { useSetRecoilState } from "recoil";
import { fetchSalesHistory } from "@/apis/seller";

export const useFetchSalesHistories = (page: number, size: number) => {
  const setSalesHistories = useSetRecoilState(salesHistoryState);
  const setTotalPages = useSetRecoilState(totalPageState);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchSalesHistory(page, size);
      setSalesHistories(result.data.data.my_event_histories);
      setTotalPages(result.data.data.page_info.total_page);
    };

    fetchData();
  }, [page, size, setSalesHistories]);
};
