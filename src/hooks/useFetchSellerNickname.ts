import { userNicknameState } from "../atoms/atoms";
import { fetchSellerNickname } from "../apis/seller";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const useFetchSellerNickname = () => {
  const setUsername = useSetRecoilState(userNicknameState);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchSellerNickname();
      setUsername({ nickname: result.data.data.nickname });
    };

    fetchData();
  }, []);
};
