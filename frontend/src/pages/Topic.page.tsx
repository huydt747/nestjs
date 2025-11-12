import React, { useEffect, useState } from "react";
import Pagination from "@/components/pagination";
import { PostBlock } from "@/components/postblock";
import axiosClient from '@/api/axiosClient';
import { Post } from '@/types/types';

export const TopicPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
    
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
                
                // Lọc theo topic nếu có
                if (selectedTopic !== 'all') {
                    filteredPosts = filteredPosts.filter(
                        (post: Post) => post.topic.topic_name === selectedTopic
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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTopicChange = (topic: string) => {
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
                        <button 
                            className="bg-[#C00091] p-4 mt-2 mx-4 rounded-xl hover:bg-[#a0007a] transition"
                            onClick={() => handleTopicChange('all')}
                        >
                            Chủ đề: {selectedTopic === 'all' ? 'Tất cả' : selectedTopic}
                        </button>
                        <button 
                            className="bg-[#C00091] p-4 mt-2 mx-4 rounded-xl hover:bg-[#a0007a] transition"
                            onClick={handleSortChange}
                        >
                            Bộ lọc: {sortBy === 'newest' ? 'Mới nhất' : 'Cũ nhất'}
                        </button>
                    </div>

                    <button className="bg-[#ab00c8] p-4 mt-2 mx-4 rounded-xl hover:bg-[#8b00a8] transition">
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