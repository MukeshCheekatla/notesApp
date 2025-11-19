import React from 'react';
import { LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <BookOpen size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
              <p className="text-gray-600 text-sm">
                Hello, <span className="font-medium">{user?.username || "User"}</span>
              </p>
            </div>
          </div>

          {/* Right: Logout Button */}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-5 py-3 bg-gray-100 hover:bg-gray-200 
                     text-gray-700 font-medium rounded-lg transition"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}