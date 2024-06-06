import SalesHistoryState from "../interfaces/SalesHistoryState";
import SalesRequestState from "../interfaces/SalesRequestState";
import { atom } from "recoil";

export const salesHistoryState = atom<SalesHistoryState[]>({
  key: "salesHistoryState",
  default: [],
});

export const salesRequestState = atom<SalesRequestState[]>({
  key: "salesRequestState",
  default: [],
});
