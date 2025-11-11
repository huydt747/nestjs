import axiosClient from '@/api/axiosClient';
import { useAuth } from '@/auth/AuthContext';
import { Post } from '@/types/types';
import React, { useState } from 'react';

interface PostBlockProps {
    post: Post;
}

export const PostBlock: React.FC<PostBlockProps> = ({ post }) => {
    // Format ngày tháng
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const auth = useAuth();

    const [likes, setLikes] = useState(post.likes || []);
    const [comments] = useState(post.comments || []);

    const commentCount = comments.length || 0;
    const likeCount = likes.length || 0;

    const currentUserId = auth?.user?.user_id;

    const existingLike = likes.find((l: any) => l.user?.user_id === currentUserId);
    const isLiked = !!existingLike;

    const [likeLoading, setLikeLoading] = useState(false);

    const toggleLike = async () => {
        if (!auth || !auth.isAuthenticated) {
            alert('Vui lòng đăng nhập để thích bài viết');
            return;
        }

        if (likeLoading) return;
        setLikeLoading(true);

        try {
            if (isLiked && existingLike) {
                await axiosClient.delete(`/likes/${existingLike.like_id}`);
                setLikes((prev: any[]) => prev.filter((l) => l.like_id !== existingLike.like_id));
            } else {
                const res = await axiosClient.post('/likes', { user: { user_id: currentUserId }, post: { post_id: post.post_id } });
                const created = res.data;
                setLikes((prev: any[]) => [...prev, created]);
            }
        } catch (err: any) {
            console.error('Like toggle error', err);
            alert(err?.response?.data?.message || 'Lỗi khi thực hiện thao tác');
        } finally {
            setLikeLoading(false);
        }
    };

    return (
        <div className="border-[#c00091] border-2 rounded p-4 m-4 text-white hover:border-[#ff00c8] transition-colors">
            <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-4">
                    <div className="name font-semibold">
                        {'>>'}{post.user.username}
                    </div>
                    <div className="date text-gray-400 text-sm">
                        {formatDate(post.created_at)}
                    </div>
                </div>
                <div className="topic px-2 py-1 bg-[#c00091] rounded text-sm">
                    {post.topic.topic_name}
                </div>
            </div>

            <div className="content mb-3 whitespace-pre-wrap break-words">
                {post.content}
            </div>

            <div className="interact flex space-x-6 text-sm text-gray-300">
                <div className="comment-count flex items-center gap-1 hover:text-white cursor-pointer transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{commentCount} Bình luận</span>
                </div>
                <div onClick={toggleLike} className={`like-count flex items-center gap-1 cursor-pointer transition ${isLiked ? 'text-pink-400' : 'hover:text-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{likeCount} Thích</span>
                </div>
            </div>

            {/* Hiển thị thời gian cập nhật nếu khác thời gian tạo */}
            {post.updated_at !== post.created_at && (
                <div className="text-xs text-gray-500 mt-2 italic">
                    Đã chỉnh sửa: {formatDate(post.updated_at)}
                </div>
            )}
        </div>
    );
};