import { useAuth } from "@/auth/AuthContext";
import AuthModal from "@/auth/AuthModal";
import NewPost from "@/components/NewPost";
import React, { useEffect, useState } from "react";
import bg from "../../assets/background.png";
import { PostBlock } from "@/components";
import axiosClient from "@/api/axiosClient";
import { Post } from "@/types/types";

export const MainPage: React.FC = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [posts, setPosts] = useState<Post[]>([]); // Danh sách bài viết
  const auth = useAuth();

  // Lấy danh sách bài viết mới nhất
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosClient.get("/posts");
        // Sắp xếp bài mới nhất ở đầu
        const sorted = res.data.sort(
          (a: Post, b: Post) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setPosts(sorted.slice(0, 5)); // Lấy 5 bài mới nhất
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {/* Banner section */}
      <section className="relative w-full h-[300px] sm:h-[340px] md:h-[420px] lg:h-[480px] flex flex-col items-center justify-start">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg})` }}
        />

        <h2 className="relative z-30 text-[#8927f4] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-center mt-8">
          HOT TOPIC
        </h2>

        <div className="relative z-30 w-full max-w-6xl mx-auto mt-20">
          <div className="grid grid-cols-4 gap-12 px-12">
            <div className="flex justify-center">
              <button className="px-14 py-6 border-2 border-[#8927f4] rounded-full bg-black/30 text-white text-xl md:text-2xl shadow-2xl transform -translate-y-4 hover:scale-105 hover:bg-black/50 hover:border-[#ff00ff] transition-all duration-300">
                SHITTALK
              </button>
            </div>

            <div className="flex justify-center">
              <button className="px-14 py-6 border-2 border-[#8927f4] rounded-full bg-black/30 text-white text-2xl md:text-3xl shadow-2xl transform translate-y-4 hover:scale-105 hover:bg-black/50 hover:border-[#ff00ff] transition-all duration-300">
                ECONOMY
              </button>
            </div>

            <div className="flex justify-center">
              <button className="px-14 py-6 border-2 border-[#8927f4] rounded-full bg-black/30 text-white text-2xl md:text-2xl shadow-2xl transform -translate-y-4 hover:scale-105 hover:bg-black/50 hover:border-[#ff00ff] transition-all duration-300 whitespace-nowrap">
                VIDEO GAMES
              </button>
            </div>

            <div className="flex justify-center">
              <button className="px-14 py-6 border-2 border-[#8927f4] rounded-full bg-black/30 text-white text-2xl md:text-3xl shadow-2xl transform translate-y-4 hover:scale-105 hover:bg-black/50 hover:border-[#ff00ff] transition-all duration-300">
                JAPAN
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Danh sách bài viết */}
      <section className="max-w-5xl mx-auto mt-10 px-4">
        <h3 className="text-2xl font-bold text-[#ff00c8] mb-4">
          🔥 Bài viết mới nhất
        </h3>

        {posts.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            Chưa có bài viết nào.
          </div>
        ) : (
          posts.map((post) => <PostBlock key={post.post_id} post={post} />)
        )}
      </section>

      {/* Nút tạo bài mới */}
      <div className="bg-gray-900 w-screen px-10 py-6 flex justify-center">
        <button
          onClick={() => {
            if (auth.isAuthenticated) setShowNewPost(true);
            else {
              setAuthMode("signin");
              setAuthOpen(true);
              alert("Vui lòng đăng nhập hoặc đăng ký để tạo bài viết");
            }
          }}
          className="px-6 py-3 bg-[#9600ff] text-white border border-[#9600ff] rounded-lg hover:bg-[#7a00cc] transition"
        >
          ✏️ Create New Post
        </button>
      </div>

      {/* Modal đăng nhập / tạo bài */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        mode={authMode}
      />
      <NewPost isOpen={showNewPost} onClose={() => setShowNewPost(false)} />
    </div>
  );
};
