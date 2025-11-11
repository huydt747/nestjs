import axiosClient from "@/api/axiosClient";

export const likeApi = {
  getByPost: (postId: number) => axiosClient.get(`/likes/post/${postId}`),
  create: (data: any) => axiosClient.post("/likes", data),
  remove: (id: number) => axiosClient.delete(`/likes/${id}`),
};
