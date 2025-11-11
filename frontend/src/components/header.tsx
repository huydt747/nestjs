import React from "react";

const Header: React.FC = () => {
    return (
        <header className="bg-[#222222] text-white py-3 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <span className="text-2xl font-extrabold tracking-tight text-white">
                        MEO
                    </span>
                </div>

                {/* Search Bar (centered small purple rounded) */}
                <div className="flex-1 flex justify-end px-4">
                    <div className="relative w-72">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c00091]">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        <input
                            type="text"
                            placeholder=""
                            className="w-full h-8 pl-10 pr-3 rounded-full bg-transparent border-2 border-[#c00091] text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c00091]"
                        />

                        {/* small purple rounded box to emulate screenshot background */}
                        <div className="pointer-events-none absolute inset-0 rounded-full border-0"></div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center space-x-6">
                    <div className="text-sm font-medium text-white uppercase tracking-wide cursor-pointer hover:opacity-90 transition-opacity">
                        Sign in
                    </div>
                    <div className="text-sm font-medium text-white uppercase tracking-wide cursor-pointer hover:opacity-90 transition-opacity">
                        Sign up
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
