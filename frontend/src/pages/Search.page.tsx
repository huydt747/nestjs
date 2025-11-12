import axiosClient from "@/api/axiosClient";
import Pagination from "@/components/pagination";
import { PostBlock } from "@/components/postblock";
import { Post, Topic } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const SearchPage: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const keyword = params.get("keyword") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState<boolean>(true);
  const [selectedTopic, setSelectedTopic] = useState<number | 'all'>('all');
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      if (!keyword) return;
      try {
        setLoading(true);
        setError(null);
        const res = await axiosClient.get(`/posts/search/${keyword}`);
        let data = res.data || [];

        // apply topic filter if selected
        if (selectedTopic !== 'all') {
          data = data.filter((post: Post) => post.topic?.topic_id === selectedTopic);
        }

        // Sắp xếp theo ngày
        data.sort((a: Post, b: Post) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return sortBy === "newest" ? dateB - dateA : dateA - dateB;
        });

        setPosts(data);
      } catch (err: any) {
        console.error("Error fetching posts:", err);
        setError(err.message || "Không thể tải bài viết");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [keyword, sortBy, selectedTopic]);

  // load topics for filter list
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoadingTopics(true);
        const res = await axiosClient.get('/topics');
        setTopics(res.data || []);
      } catch (err) {
        console.error('Error loading topics for search filter', err);
      } finally {
        setLoadingTopics(false);
      }
    };
    fetchTopics();
  }, []);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="">
      <div className="w-full bg-[#9600ff]">
        <button
          className="mx-32 py-4 text-lg hover:text-gray-200"
          onClick={() => window.history.back()}
        >
          {"<<"} Trở về
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <button
            className="bg-[#C00091] p-4 mt-2 mx-4 rounded-xl hover:bg-[#a0007a] transition"
            onClick={() =>
              setSortBy((prev) => (prev === "newest" ? "oldest" : "newest"))
            }
          >
            Bộ lọc: {sortBy === "newest" ? "Mới nhất" : "Cũ nhất"}
          </button>
        </div>

        {/* Topic filter list (search results) */}
        <div className="mx-4 mt-4">
          <div className="text-sm text-white mb-2">Lọc theo chủ đề</div>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 border rounded-none ${selectedTopic === 'all' ? 'bg-[#C00091] text-white border-[#C00091]' : 'bg-white text-gray-700 border-gray-200'}`}
              onClick={() => { setSelectedTopic('all'); setCurrentPage(1); }}
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
                  onClick={() => { setSelectedTopic(t.topic_id); setCurrentPage(1); }}
                >
                  {t.topic_name}
                </button>
              ))
            )}
          </div>
        </div>

        {loading && (
          <div className="text-center py-8 text-white">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#C00091]"></div>
            <p className="mt-2">Đang tải bài viết...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500 text-white p-4 m-4 rounded">
            Lỗi: {error}
          </div>
        )}

        {!loading && !error && currentPosts.length === 0 && (
          <div className="text-center py-8 text-white">
            Không có bài viết nào cho từ khóa "{keyword}"
          </div>
        )}

        {!loading && !error && currentPosts.length > 0 && (
          <>
            {currentPosts.map((post) => (
              <PostBlock key={post.post_id} post={post} />
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
