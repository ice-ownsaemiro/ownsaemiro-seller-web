import UserNicknameState from "@/interfaces/UserNicknameState";
import SalesHistoryState from "@/interfaces/SalesHistoryState";
import SalesRequestState from "@/interfaces/SalesRequestState";
import { atom } from "recoil";

export const salesHistoryState = atom<SalesHistoryState[]>({
  key: "salesHistoryState",
  default: [],
});

export const salesRequestState = atom<SalesRequestState[]>({
  key: "salesRequestState",
  default: [],
});

export const userNicknameState = atom<UserNicknameState>({
  key: "userNicknameState",
  default: { nickname: "" },
});

export const totalPageState = atom<number>({
  key: "totalPageState",
  default: 0,
});
