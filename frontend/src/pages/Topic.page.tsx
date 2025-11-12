import axiosClient from '@/api/axiosClient';
import Pagination from "@/components/pagination";
import { PostBlock } from "@/components/postblock";
import { Post, Topic } from '@/types/types';
import React, { useEffect, useState } from "react";

export const TopicPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<number | 'all'>('all');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loadingTopics, setLoadingTopics] = useState<boolean>(true);
    
    const totalPages = 10;
    const postsPerPage = 10;

    // Fetch posts từ API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await axiosClient.get("/posts");
                
                let filteredPosts = res.data || [];
                
                // Lọc theo topic nếu có (filter by topic_id)
                if (selectedTopic !== 'all') {
                    filteredPosts = filteredPosts.filter(
                        (post: Post) => post.topic?.topic_id === selectedTopic
                    );
                }
                
                // Sắp xếp theo ngày
                filteredPosts.sort((a: Post, b: Post) => {
                    const dateA = new Date(a.created_at).getTime();
                    const dateB = new Date(b.created_at).getTime();
                    return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
                });
                
                setPosts(filteredPosts);
            } catch (err: any) {
                setError(err.message || 'Không thể tải bài viết');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [selectedTopic, sortBy]);

    // Load topic list for filter
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setLoadingTopics(true);
                const res = await axiosClient.get('/topics');
                setTopics(res.data || []);
            } catch (err) {
                console.error('Error fetching topics for filter', err);
            } finally {
                setLoadingTopics(false);
            }
        };
        fetchTopics();
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTopicChange = (topic: number | 'all') => {
        setSelectedTopic(topic);
        setCurrentPage(1);
    };

    const handleSortChange = () => {
        setSortBy(prev => prev === 'newest' ? 'oldest' : 'newest');
        setCurrentPage(1);
    };

    // Phân trang
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const actualTotalPages = Math.ceil(posts.length / postsPerPage);

    return (
        <div className=''>
            <div className="w-full bg-[#9600ff]">
                <button 
                    className="mx-32 py-4 text-lg hover:text-gray-200"
                    onClick={() => window.history.back()}
                >
                    {'<<'}Trở về
                </button>
            </div>

            <div className="max-w-7xl mx-auto min-h-screen">
                <div className="flex justify-between items-center">
                    <div className="flex">
                            <div className="mx-4 mt-2">
                                <div className="text-sm text-white mb-2">Chọn chủ đề</div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        className={`px-3 py-1 border rounded-none ${selectedTopic === 'all' ? 'bg-[#C00091] text-white border-[#C00091]' : 'bg-white text-gray-700 border-gray-200'} `}
                                        onClick={() => handleTopicChange('all')}
                                    >
                                        Tất cả
                                    </button>
                                    {loadingTopics ? (
                                        <div className="text-white px-3 py-2">Đang tải...</div>
                                    ) : (
                                        topics.map((t) => (
                                            <button
                                                key={t.topic_id}
                                                className={`px-3 py-1 border rounded-none ${selectedTopic === t.topic_id ? 'bg-[#C00091] text-white border-[#C00091]' : 'bg-white text-gray-700 border-gray-200'}`}
                                                onClick={() => handleTopicChange(t.topic_id)}
                                            >
                                                {t.topic_name}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        <button 
                            className="bg-[#C00091] px-4 py-2 mt-2 mx-4 rounded-none hover:bg-[#a0007a] transition text-white border border-[#C00091]"
                            onClick={handleSortChange}
                        >
                            Bộ lọc: {sortBy === 'newest' ? 'Mới nhất' : 'Cũ nhất'}
                        </button>
                    </div>

                    <button className="bg-[#ab00c8] px-4 py-2 mt-2 mx-4 rounded-none hover:bg-[#8b00a8] transition text-white border border-[#ab00c8]">
                        Bài viết mới
                    </button>
                </div>

                {/* Hiển thị trạng thái loading */}
                {loading && (
                    <div className="text-center py-8 text-white">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#C00091]"></div>
                        <p className="mt-2">Đang tải bài viết...</p>
                    </div>
                )}

                {/* Hiển thị lỗi */}
                {error && (
                    <div className="bg-red-500 text-white p-4 m-4 rounded">
                        Lỗi: {error}
                    </div>
                )}

                {/* Hiển thị danh sách posts */}
                {!loading && !error && currentPosts.length === 0 && (
                    <div className="text-center py-8 text-white">
                        Không có bài viết nào
                    </div>
                )}

                {!loading && !error && currentPosts.length > 0 && (
                    <>
                        {currentPosts.map((post) => (
                            <PostBlock key={post.post_id} post={post} />
                        ))}

                        <Pagination
                            currentPage={currentPage}
                            totalPages={actualTotalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
};