import React from 'react';
import { Post } from '@/types/types';
import { useNavigate } from 'react-router-dom';

interface PostBlockProps {
    post: Post;
}

export const PostBlock: React.FC<PostBlockProps> = ({ post }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${post.post_id}`);
    };

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

    const commentCount = post.comments?.length || 0;
    const likeCount = post.likes?.length || 0;

    return (
        <div
            onClick={handleClick}
            className="border-[#c00091] border-2 rounded p-4 m-4 text-white hover:border-[#ff00c8] transition-colors cursor-pointer"
        >
            <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-4">
                    <div className="name font-semibold">
                        {'>>'}{post.user?.username || 'Người dùng ẩn danh'}
                    </div>
                    <div className="date text-gray-400 text-sm">
                        {formatDate(post.created_at)}
                    </div>
                </div>
                <div className="topic px-2 py-1 bg-[#c00091] rounded text-sm">
                    {post.topic?.topic_name || 'Chủ đề ẩn'}
                </div>
            </div>

            <div className="content mb-3 whitespace-pre-wrap break-words">
                {post.content}
            </div>

            <div className="interact flex space-x-6 text-sm text-gray-300">
                <div className="comment-count flex items-center gap-1">
                    💬 {commentCount} Bình luận
                </div>
                <div className="like-count flex items-center gap-1">
                    ❤️ {likeCount} Thích
                </div>
            </div>

            {post.updated_at !== post.created_at && (
                <div className="text-xs text-gray-500 mt-2 italic">
                    Đã chỉnh sửa: {formatDate(post.updated_at)}
                </div>
            )}
        </div>
    );
};