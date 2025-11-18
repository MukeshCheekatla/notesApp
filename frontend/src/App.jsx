import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Header from './components/Header';
import NotesList from './components/NotesList';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-gray-600 text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <NotesList />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}