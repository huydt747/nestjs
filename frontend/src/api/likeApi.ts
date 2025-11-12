import axiosClient from "@/api/axiosClient";

export const likeApi = {
  getByPost: (postId: number) => axiosClient.get(`/likes/post/${postId}`),

  // Tạo like
  create: (data: { userId: number; postId: number }) =>
    axiosClient.post("/likes", data),

  // Bỏ like dùng query param
  remove: (userId: number, postId: number) =>
    axiosClient.delete("/likes", { params: { userId, postId } }),
};
