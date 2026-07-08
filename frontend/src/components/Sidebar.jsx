import { NavLink } from 'react-router-dom';
import { FiHome, FiFileText, FiInfo, FiClock, FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#F0F7FF] flex flex-col border-r border-blue-100 p-6 fixed">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-white p-2 rounded-full text-green-500 shadow-sm border border-gray-100">
           {/* Placeholder for Logo */}
           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
           </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-primary">EduSum</h1>
          <p className="text-xs text-gray-500">Peringkas Materi<br/>Biologi SMA</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink to="/" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-primary font-medium' : 'text-gray-600 hover:bg-white'}`}>
          <FiHome className="text-lg" />
          Beranda
        </NavLink>
        <NavLink to="/ringkasan" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-primary font-medium' : 'text-gray-600 hover:bg-white'}`}>
          <FiFileText className="text-lg" />
          Ringkasan
        </NavLink>
        <NavLink to="/riwayat" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-primary font-medium' : 'text-gray-600 hover:bg-white'}`}>
          <FiClock className="text-lg" />
          Riwayat
        </NavLink>
        <NavLink to="/tentang" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-primary font-medium' : 'text-gray-600 hover:bg-white'}`}>
          <FiInfo className="text-lg" />
          Tentang
        </NavLink>
      </nav>

      <div className="mt-auto">
        <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-red-500 transition-colors w-full text-left">
          <FiLogOut className="text-lg" />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
