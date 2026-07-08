import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between pt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-1/2"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Peringkas Materi</h1>
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Biologi SMA</h2>
        
        <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
          Sistem peringkasan otomatis berbasis Natural Language Processing (NLP) untuk membantu siswa memahami materi Biologi dengan lebih cepat dan mudah.
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-md">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Mulai Ringkas Materi</h3>
          <p className="text-sm text-gray-500 mb-6">
            Unggah dokumen atau masukkan teks materi Biologi yang ingin diringkas.
          </p>
          <div className="flex justify-end">
            <button 
              onClick={() => navigate('/ringkasan')}
              className="px-6 py-2 border border-primary text-primary font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              Mulai Meringkas
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
      >
        {/* Decorative graphic matching wireframe */}
        <div className="relative w-64 h-64">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
             <circle cx="100" cy="100" r="90" fill="none" stroke="#E0F2FE" strokeWidth="8"/>
             <path d="M60 140 Q100 100 140 140" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round"/>
             <path d="M60 60 Q100 100 140 60" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round"/>
             <path d="M40 100 Q100 80 160 100" fill="none" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round"/>
             <path d="M40 100 Q100 120 160 100" fill="none" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round"/>
             <circle cx="100" cy="100" r="10" fill="#22C55E"/>
             <path d="M80 50 Q100 30 120 50" fill="none" stroke="#22C55E" strokeWidth="6" strokeLinecap="round"/>
             <path d="M80 150 Q100 170 120 150" fill="none" stroke="#22C55E" strokeWidth="6" strokeLinecap="round"/>
           </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
