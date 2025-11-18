import React from 'react';
import { LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-linear-to-r from-amber-500 to-orange-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen size={32} className="text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">My Notes</h1>
              <p className="text-amber-100 text-sm">Welcome, {user?.username}!</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}