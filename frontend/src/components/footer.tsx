import React from "react";
import r from "../../assets/R.png";

export const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-neutral-900 text-neutral-400 text-sm border-t border-neutral-800 py-5">
            {/* Nội dung chính */}
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
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                {/* Left column — Giới thiệu */}
                <div className="md:col-span-2 md:pr-4">
                    <h3 className="text-white font-semibold mb-4">MEO FORUM</h3>
                    <p className="text-neutral-500 leading-relaxed">
                        Nơi chia sẻ, đọc báo, nhắn tin và bàn luận về mọi chủ đề trong cộng
                        đồng.
                    </p>
                </div>

                {/* Middle column — spacer (trống) */}
                <div className="hidden md:block md:col-span-1"></div>

                {/* Right column — Liên kết nhanh */}
                <div className="md:col-span-1 flex flex-col md:items-end items-center mb-4">
                    <div className="w-full max-w-xs text-left">
                        <h4 className="text-white font-semibold mb-3 uppercase tracking-wide">
                            Liên kết nhanh
                        </h4>
                        <ul className="flex flex-col gap-2 list-none pl-0 ml-0 text-left">
                            <li>
                                <a
                                    href="/Video_Games"
                                    className="hover:text-white transition-colors duration-200"
                                >
                                    Video Games
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/Japanese_Culture"
                                    className="hover:text-white transition-colors duration-200"
                                >
                                    Japanese Culture
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/Creative"
                                    className="hover:text-white transition-colors duration-200"
                                >
                                    Creative
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/Interests"
                                    className="hover:text-white transition-colors duration-200"
                                >
                                    Interests
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/Other"
                                    className="hover:text-white transition-colors duration-200"
                                >
                                    Other
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Dòng bản quyền */}
            <div className="border-t border-neutral-800 text-center pt-4 text-xs text-neutral-600">
                © 2025 MEO FORUM — Một dự án cộng đồng, không liên quan đến voz.vn.
            </div>
        </footer>
    );
};
