import { useEffect } from "react";
import { salesRequestState } from "../atoms/atoms";
import { useSetRecoilState } from "recoil";
import { fetchSalesRequest } from "../apis/seller";

export const useFetchSalesHistories = (page: number, size: number) => {
  const setSalesRequest = useSetRecoilState(salesRequestState);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSalesRequest(page, size);
      setSalesRequest(data.event_applies);
    };

    fetchData();
  }, [page, size, setSalesRequest]);
};
