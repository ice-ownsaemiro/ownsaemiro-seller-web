import { instance } from "./axios";

export const fetchSalesHistory = async (page: number, size: number) => {
  const response = await instance.get(
    `/api/seller/histories?page=${page}&size=${size}`
  );

  return response;
};

export const fetchSalesRequest = async (page: number, size: number) => {
  const response = await instance.get(
    `/api/seller/apply?page=${page}&size=${size}`
  );
  return response;
};

export const fetchSellerNickname = async () => {
  const response = await instance.get("/api/seller/nickname");
  return response;
};

export const updateSellerEventStatus = async (
  eventId: number,
  status: string
) => {
  const response = await instance.patch("/api/seller/events", {
    event_id: eventId,
    status: status,
  });
  return response;
};

export const searchSellerEvent = async (
  keyword: string,
  page: number,
  size: number
) => {
  const response = await instance.get(
    `/api/seller/histories/search?name=${keyword}&page=${page}&size=${size}`
  );
  return response;
};

export const postSellerEvent = async (image: any, data: any) => {
  const formData = new FormData();

  formData.append("image", image);
  formData.append("data", data);

  const response = await instance.post("/api/seller/events", formData);

  return response;
};

export const deleteSellerEvent = async (requestId: number) => {
  const response = await instance.delete(
    `/api/seller/apply?request_id=${requestId}`
  );

  return response;
};

export const searchSellerRequest = async (
  keyword: string,
  status: string,
  page: number,
  size: number
) => {
  const response = await instance.get(
    `/api/seller/apply/search?name=${keyword}&status=${status}&page=${page}&size=${size}`
  );

  return response;
};
