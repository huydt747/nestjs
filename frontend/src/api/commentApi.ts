import axiosClient from "@/api/axiosClient";

export const commentApi = {
  getByPost: (postId: number) => axiosClient.get(`/comments/post/${postId}`),
  create: (data: any) => axiosClient.post("/comments", data),
  remove: (id: number) => axiosClient.delete(`/comments/${id}`),
};
