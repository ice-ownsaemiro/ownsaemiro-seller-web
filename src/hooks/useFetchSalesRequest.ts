import { useEffect } from "react";
import { salesRequestState, totalPageState } from "@/atoms/atoms";
import { useSetRecoilState } from "recoil";
import { fetchSalesRequest } from "@/apis/seller";

export const useFetchSalesRequest = (page: number, size: number) => {
  const setSalesRequest = useSetRecoilState(salesRequestState);
  const setTotalPages = useSetRecoilState(totalPageState);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchSalesRequest(page, size);
      setSalesRequest(result.data.data.event_applies);
      setTotalPages(result.data.data.page_info.total_page);
    };

    fetchData();
  }, [page, size, setSalesRequest]);
};
