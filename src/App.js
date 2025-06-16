import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { Home, Banknote, Bookmark, LayoutDashboard } from "lucide-react";
import Dashboard from "./components/ui/Dashboard.js";
import Finances from "./components/ui/Finances.js";
import Bookings from "./components/ui/Bookings.js";
import Announcements from "./components/ui/Announcements";

export default function App() {
  return (
    <Router>
      <div className="p-4 pb-16 space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Roomify</h1>
          <div>
            <span className="text-sm text-gray-600">Обліковий запис: Петро Леопард</span>
            <button className="ml-4 text-red-500">Вихід ↩</button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/announcements" element={<Announcements />} />
        </Routes>

        <footer className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t flex justify-around py-2">
          <NavLink to="/" end className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-500"}><Home /></NavLink>
          <NavLink to="/finances" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-500"}><Banknote /></NavLink>
          <NavLink to="/bookings" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-500"}><Bookmark /></NavLink>
          <NavLink to="/announcements" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-500"}><LayoutDashboard /></NavLink>
        </footer>
      </div>
    </Router>
  );
}
