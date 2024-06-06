import { useEffect } from "react";
import { salesHistoryState } from "../atoms/atoms";
import { useSetRecoilState } from "recoil";
import { fetchSalesHistory } from "../apis/seller";

export const useFetchSalesHistories = (page: number, size: number) => {
  const setSalesHistories = useSetRecoilState(salesHistoryState);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSalesHistory(page, size);
      setSalesHistories(data.my_event_histories);
    };

    fetchData();
  }, [page, size, setSalesHistories]);
};
