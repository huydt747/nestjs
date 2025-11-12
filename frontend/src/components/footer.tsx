import React from "react";
import r from "../../assets/R.png";

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
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
        </footer>
    );
};
