import React, { useState } from "react";
import AuthModal from '../auth/AuthModal';
import { useAuth } from "../auth/AuthContext";
import { User, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [startMode, setStartMode] = useState<'signin' | 'signup'>('signin');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    setDropdownOpen(false);
  };

  return (
    <>
      <header className="bg-[#222222] text-white py-3 px-6 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-extrabold tracking-tight text-white">
              MEO
            </span>
          </div>

          {/* Search Bar */}
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
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6 relative">
            {!isAuthenticated ? (
              <>
                <div
                  onClick={() => {
                    setStartMode("signin");
                    setOpen(true);
                  }}
                  className="text-sm font-medium text-white uppercase tracking-wide cursor-pointer hover:opacity-90 transition-opacity"
                >
                  Sign in
                </div>

                <div
                  onClick={() => {
                    setStartMode("signup");
                    setOpen(true);
                  }}
                  className="text-sm font-medium text-white uppercase tracking-wide cursor-pointer hover:opacity-90 transition-opacity"
                >
                  Sign up
                </div>
              </>
            ) : (
              <div className="relative">
                {/* Avatar Icon */}
                <button
                  className="p-2 rounded-full hover:bg-gray-700 transition"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <User className="w-5 h-5 text-white" />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg py-2 z-50">
                    <div
                      onClick={() => {
                        navigate('/post/new');
                        setDropdownOpen(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      <User className="w-4 h-4 mr-2" /> New Post
                    </div>

                    {/* <div
                      onClick={() => {
                        navigate('/settings');
                        setDropdownOpen(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </div>

                    <hr className="my-1" /> */}

                    <div
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal open={open} onClose={() => setOpen(false)} mode={startMode} />
    </>
  );
};

export default Header;
