import React from 'react';
import { LogOut, BookOpen, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header({ searchQuery, setSearchQuery }) {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-blue-600 rounded-xl shadow-blue-200 shadow-lg">
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 leading-none">My Notes</h1>
              <p className="text-gray-500 text-xs mt-1">
                Hello, <span className="font-semibold text-blue-600">{user?.username || "User"}</span>
              </p>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search your notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm"
            />
          </div>

          {/* Right: Logout Button */}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 
                     text-gray-700 font-medium rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}