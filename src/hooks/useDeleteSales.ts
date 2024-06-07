import { deleteSellerEvent } from "@/apis/seller";
import { useRecoilState } from "recoil";
import { salesRequestState } from "@/atoms/atoms";

export const useDeleteSales = () => {
  const [salesRequests, setSalesRequest] = useRecoilState(salesRequestState);

  const deleteSales = async (ids: number[]) => {
    const failedDeletes = [];
    const successfullyDeletedIds = [];

    for (const id of ids) {
      try {
        const response = await deleteSellerEvent(id);

        if (response.status === 200) {
          successfullyDeletedIds.push(id);
        } else {
          failedDeletes.push(id);
        }
      } catch (error) {
        console.error(`삭제 요청 실패 (id: ${id})`, error);
        failedDeletes.push(id);
      }
    }

    if (failedDeletes.length > 0) {
      alert(
        `다음 항목을 삭제하는 데 실패했습니다: ${failedDeletes.join(", ")}`
      );
    }

    if (successfullyDeletedIds.length > 0) {
      alert("정상적으로 취소되었습니다.");
      const newSalesRequests = salesRequests.filter(
        (request) => !successfullyDeletedIds.includes(request.id)
      );
      setSalesRequest(newSalesRequests);
    }
  };

  return deleteSales;
};
