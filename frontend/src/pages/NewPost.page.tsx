import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from '@/api/axiosClient';
import { Topic } from '@/types/types';

export const NewPostPage: React.FC = () => {
    const navigate = useNavigate();
    
    const [topics, setTopics] = useState<Topic[]>([]);
    const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingTopics, setLoadingTopics] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Giả sử bạn lưu user_id trong localStorage hoặc context
    // Thay đổi theo cách quản lý authentication của bạn
    const currentUserId = 1; // Thay bằng user ID thực tế

    // Fetch danh sách topics
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setLoadingTopics(true);
                const res = await axiosClient.get("/topics");
                setTopics(res.data || []);
            } catch (err: any) {
                console.error('Error fetching topics:', err);
                setError('Không thể tải danh sách chủ đề');
            } finally {
                setLoadingTopics(false);
            }
        };

        fetchTopics();
    }, []);

    // Xử lý submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!selectedTopicId) {
            setError('Vui lòng chọn chủ đề');
            return;
        }
        
        if (!content.trim()) {
            setError('Vui lòng nhập nội dung bài viết');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const postData = {
                user: { user_id: currentUserId },
                topic: { topic_id: selectedTopicId },
                content: content.trim()
            };

            await axiosClient.post("/posts", postData);
            
            // Thông báo thành công và chuyển trang
            alert('Đăng bài viết thành công!');
            navigate('/topic'); // Hoặc trang nào đó
        } catch (err: any) {
            console.error('Error creating post:', err);
            setError(err.response?.data?.message || 'Không thể đăng bài viết');
        } finally {
            setLoading(false);
        }
    };

    // Xử lý hủy
    const handleCancel = () => {
        if (content.trim() && !confirm('Bạn có chắc muốn hủy? Nội dung sẽ không được lưu.')) {
            return;
        }
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a0033] to-[#0d001a] py-8">
            <div className="max-w-4xl mx-auto bg-white text-black rounded-lg shadow-xl p-6">
                <h1 className="text-2xl font-bold mb-6 text-[#9600ff]">
                    Đăng bài viết mới
                </h1>

                <form onSubmit={handleSubmit}>
                    {/* Thông tin user */}
                    <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
                        <div className="text-lg font-semibold text-gray-700">
                            {'>>'} Tên người dùng
                        </div>
                    </div>

                    {/* Chọn chủ đề */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-3 text-gray-800">
                            Chọn chủ đề: <span className="text-red-500">*</span>
                        </label>
                        
                        {loadingTopics ? (
                            <div className="text-gray-500">Đang tải chủ đề...</div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {topics.map((topic) => (
                                    <button
                                        key={topic.topic_id}
                                        type="button"
                                        onClick={() => setSelectedTopicId(topic.topic_id)}
                                        className={`
                                            p-4 rounded-lg border-2 transition-all duration-200
                                            ${selectedTopicId === topic.topic_id
                                                ? 'bg-[#9600ff] text-white border-[#9600ff] scale-105'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#9600ff] hover:text-[#9600ff]'
                                            }
                                        `}
                                    >
                                        <div className="font-semibold">{topic.topic_name}</div>
                                        {topic.description && (
                                            <div className="text-xs mt-1 opacity-75">
                                                {topic.description}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        {topics.length === 0 && !loadingTopics && (
                            <div className="text-gray-500 text-center py-4">
                                Không có chủ đề nào
                            </div>
                        )}
                    </div>

                    {/* Nội dung bài viết */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-3 text-gray-800">
                            Nội dung bài viết: <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="border-gray-400 border-2 rounded-lg p-4 w-full min-h-[200px] focus:border-[#9600ff] focus:outline-none transition-colors"
                            placeholder="Nhập nội dung bài viết của bạn..."
                            disabled={loading}
                        />
                        <div className="text-sm text-gray-500 mt-1">
                            {content.length} ký tự
                        </div>
                    </div>

                    {/* Hiển thị lỗi */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={loading || !selectedTopicId || !content.trim()}
                            className={`
                                flex-1 text-white py-4 px-8 rounded-lg font-semibold
                                transition-all duration-200 transform
                                ${loading || !selectedTopicId || !content.trim()
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#9600ff] hover:bg-[#7a00cc] hover:scale-105 active:scale-95'
                                }
                            `}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Đang đăng...
                                </span>
                            ) : (
                                'Đăng bài viết'
                            )}
                        </button>
                        
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            className="px-8 py-4 border-2 border-gray-400 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            Hủy
                        </button>
                    </div>
                </form>

                {/* Hướng dẫn */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">📝 Hướng dẫn:</h3>
                    <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                        <li>Chọn một chủ đề phù hợp với nội dung bài viết</li>
                        <li>Viết nội dung rõ ràng, dễ hiểu</li>
                        <li>Tôn trọng cộng đồng và tuân thủ quy định</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};