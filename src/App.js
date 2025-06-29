import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Dashboard from './components/ui/Dashboard';
import Finances from './components/ui/Finances';
import Bookings from './components/ui/Bookings';
import Announcements from './components/ui/Announcements';
import Login from './components/ui/Login';
import Register from './components/ui/Register';
import { AuthProvider, AuthContext } from './AuthContext';
import { Home, Banknote, Bookmark, LayoutDashboard } from 'lucide-react';

function Protected({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <div className="p-4 pb-16">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Roomify</h1>
          <div>
            {user ? (
              <>
                <span className="text-sm text-gray-600">{user.email}</span>
                <button onClick={logout} className="ml-4 text-red-500">Вихід</button>
              </>
            ) : (
              <>  
                <NavLink to="/login" className="text-blue-600 mr-4">Вхід</NavLink>
                <NavLink to="/register" className="text-blue-600">Реєстрація</NavLink>
              </>
            )}
          </div>
        </header>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Protected><Dashboard /></Protected>} />
          <Route path="/finances" element={<Protected><Finances /></Protected>} />
          <Route path="/bookings" element={<Protected><Bookings /></Protected>} />
          <Route path="/announcements" element={<Protected><Announcements /></Protected>} />
        </Routes>

        {user && (
          <footer className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t flex justify-around py-2">
            <NavLink to="/" end className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-500"}><Home /></NavLink>
            <NavLink to="/finances" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-500"}><Banknote/></NavLink>
            <NavLink to="/bookings" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-500"}><Bookmark/></NavLink>
            <NavLink to="/announcements" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-500"}><LayoutDashboard/></NavLink>
          </footer>
        )}
      </div>
    </Router>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
