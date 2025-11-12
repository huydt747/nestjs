import axiosClient from "@/api/axiosClient";

export const postApi = {
  getAll: () => axiosClient.get("/posts"),
  getOne: (id: number) => axiosClient.get(`/posts/${id}`),
  create: (data: FormData) =>
    axiosClient.post("/posts", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id: number, data: any) => axiosClient.put(`/posts/${id}`, data),
  remove: (id: number) => axiosClient.delete(`/posts/${id}`),
};
