import { NavLink } from "react-router-dom";
import { FiHome, FiFileText, FiInfo, FiClock, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#F0F7FF] flex flex-col border-r border-blue-100 p-6 fixed">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden">
          <img src="/Logo.png" alt="Logo" className="w-9 h-9 object-contain" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-primary">EduSummarize</h1>
          <p className="text-xs text-gray-500">
            Peringkas Materi
            <br />
            Biologi SMA dan SMP
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-blue-100 text-primary font-medium" : "text-gray-600 hover:bg-white"}`
          }
        >
          <FiHome className="text-lg" />
          Beranda
        </NavLink>
        <NavLink
          to="/ringkasan"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-blue-100 text-primary font-medium" : "text-gray-600 hover:bg-white"}`
          }
        >
          <FiFileText className="text-lg" />
          Ringkasan
        </NavLink>
        <NavLink
          to="/riwayat"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-blue-100 text-primary font-medium" : "text-gray-600 hover:bg-white"}`
          }
        >
          <FiClock className="text-lg" />
          Riwayat
        </NavLink>
        <NavLink
          to="/tentang"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-blue-100 text-primary font-medium" : "text-gray-600 hover:bg-white"}`
          }
        >
          <FiInfo className="text-lg" />
          Tentang
        </NavLink>
      </nav>

    </div>
  );
};

export default Sidebar;
