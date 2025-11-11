import { useAuth } from '@/auth/AuthContext';
import AuthModal from '@/auth/AuthModal';
import NewPost from '@/components/NewPost';
import React, { useState } from "react";
import bg from "../../assets/background.png";
import r from "../../assets/R.png";

export const MainPage: React.FC = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin'|'signup'>('signin');
  const auth = useAuth();
  return (
    <div className="">
      {/* Background section with floating topic buttons */}
      <section className="relative w-full h-[300px] sm:h-[340px] md:h-[420px] lg:h-[480px] flex flex-col items-center justify-start">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg})` }}
        />

        <h2 className="relative z-30 text-[#8927f4] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-center mt-8">
          HOT TOPIC
        </h2>

        <div className="relative z-30 w-full max-w-6xl mx-auto mt-20">
          {/* Create New Post button */}
          
          <div className="grid grid-cols-4 gap-12 px-12">
            {/* Column 1 - SHITTALK (nút lẻ - cao hơn) */}
            <div className="flex justify-center">
              <button className="px-14 py-6 border-2 border-[#8927f4] rounded-full bg-black/30 text-white text-xl md:text-2xl shadow-2xl transform -translate-y-4 hover:scale-105 hover:bg-black/50 hover:border-[#ff00ff] transition-all duration-300">
                SHITTALK
              </button>
            </div>

            {/* Column 2 - ECONOMY (nút chẵn - thấp hơn và to hơn) */}
            <div className="flex justify-center">
              <button className="px-14 py-6 border-2 border-[#8927f4] rounded-full bg-black/30 text-white text-2xl md:text-3xl shadow-2xl transform translate-y-4 hover:scale-105 hover:bg-black/50 hover:border-[#ff00ff] transition-all duration-300">
                ECONOMY
              </button>
            </div>

            {/* Column 3 - VIDEO GAMES (nút lẻ - cao hơn) */}
            <div className="flex justify-center">
              <button className="px-14 py-6 border-2 border-[#8927f4] rounded-full bg-black/30 text-white text-2xl md:text-2xl shadow-2xl transform -translate-y-4 hover:scale-105 hover:bg-black/50 hover:border-[#ff00ff] transition-all duration-300 whitespace-nowrap">
                VIDEO GAMES
              </button>
            </div>

            {/* Column 4 - JAPAN (nút chẵn - thấp hơn và to hơn) */}
            <div className="flex justify-center">
              <button className="px-14 py-6 border-2 border-[#8927f4] rounded-full bg-black/30 text-white text-2xl md:text-3xl shadow-2xl transform translate-y-4 hover:scale-105 hover:bg-black/50 hover:border-[#ff00ff] transition-all duration-300">
                JAPAN
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Example content area */}

      {/* Tags section with right-side image (5-column layout) */}
      <section className="pt-4 bg-gray-900 w-screen px-10">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start">
            {/* Japanese Culture Column */}
            <div className="lg:col-span-1">
              <h3 className="text-[#8927f4] font-bold text-lg mb-2 border-b border-[#8927f4] pb-2">
                Japanese Culture
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Anime & Manga
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Anime/Cute
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Anime/Wallpapers
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">• Mecha</li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Cosplay & EGL
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Cute/Male
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">• Flash</li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Transportation
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Otaku Culture
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Virtual YouTubers
                </li>
              </ul>
            </div>

            {/* Video Games Column */}
            <div className="lg:col-span-1">
              <h3 className="text-[#8927f4] font-bold text-lg mb-2 border-b border-[#8927f4] pb-2">
                Video Games
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Video Games
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Video Game Generals
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Video Games/Multiplayer
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Video Games/Mobile
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Pokémon
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Retro Games
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Video Games/RPG
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Video Games/Strategy
                </li>
              </ul>
            </div>

            {/* Creative Column */}
            <div className="lg:col-span-1">
              <h3 className="text-[#8927f4] font-bold text-lg mb-2 border-b border-[#8927f4] pb-2">
                Creative
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Oekaki
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Papercraft & Origami
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Photography
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Food & Cooking
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Artwork/Critique
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Wallpapers/General
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Literature
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">• Music</li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Fashion
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">• 3DCG</li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Graphic Design
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Do-It-Yourself
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Worksafe GIF
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Quests
                </li>
              </ul>
            </div>

            {/* Interests Column */}
            <div className="lg:col-span-1">
              <h3 className="text-[#8927f4] font-bold text-lg mb-2 border-b border-[#8927f4] pb-2">
                Interests
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Comics & Cartoons
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Technology
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Television & Film
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Weapons
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">• Auto</li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Animals & Nature
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Traditional Games
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Sports
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Extreme Sports
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Professional Wrestling
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Science & Math
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • History & Humanities
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • International
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Outdoors
                </li>
              </ul>
            </div>

            {/* Other Column */}
            <div className="lg:col-span-1">
              <h3 className="text-[#8927f4] font-bold text-lg mb-2 border-b border-[#8927f4] pb-2">
                Other
              </h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Business & Finance
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Travel
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Fitness
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Paranormal
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Advice
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">• LGBT</li>
                <li className="hover:text-[#8927f4] cursor-pointer">• Pony</li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Current News
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Worksafe Requests
                </li>
                <li className="hover:text-[#8927f4] cursor-pointer">
                  • Very Important Posts
                </li>
              </ul>
            </div>

            {/* Right: decorative image / space for artwork (larger, shifted left, not cropped) */}
            <div className="lg:col-span-1 relative overflow-visible">
              <div className="w-full lg:h-[460px] relative">
                <img
                  src={r}
                  alt="art"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-5 lg:translate-x-1 w-[100%] md:w-[130%] lg:w-[130%] h-full object-contain max-w-none pointer-events-none select-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

	  <div className="bg-gray-900 w-screen px-10">
            <button
              onClick={() => {
                if (auth.isAuthenticated) setShowNewPost(true);
                else {
                  setAuthMode('signin');
                  setAuthOpen(true);
                  alert('Vui lòng đăng nhập hoặc đăng ký để tạo bài viết');
                }
              }}
              className="px-4 py-2 bg-[#9600ff] text-white border border-[#9600ff]"
            >Create New Post</button>
          </div>
  <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} mode={authMode} />
      <NewPost isOpen={showNewPost} onClose={() => setShowNewPost(false)} />
    </div>
  );
};
