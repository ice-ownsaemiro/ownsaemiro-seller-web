import { instance } from "./axios";

export const fetchSalesHistory = async (page: number, size: number) => {
  const response = await instance.get(
    `/api/seller/histories?page=${page}&size=${size}`
  );
  return response.data;
};

export const fetchSalesRequest = async (page: number, size: number) => {
  const response = await instance.get(
    `/api/seller/apply?page=${page}&size=${size}`
  );
  return response.data;
};
