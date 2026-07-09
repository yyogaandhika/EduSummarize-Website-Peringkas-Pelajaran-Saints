import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-between px-6">
      
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-1/2 -mt-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          Peringkas Materi
        </h1>

        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Biologi SMA dan SMP
        </h2>

        <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
          Sistem peringkasan otomatis berbasis Natural Language Processing (NLP)
          untuk membantu siswa memahami materi Biologi dengan lebih cepat dan mudah.
        </p>


        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-md">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Mulai Ringkas Materi
          </h3>

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


      {/* Right Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:w-1/2 mt-12 md:mt-0 flex justify-center items-center"
      >
        <div className="relative w-96 h-96 flex items-center justify-center">
          <img
            src="/Logo.png"
            alt="Logo EduSum"
            className="w-full h-full object-contain scale-110"
          />
        </div>
      </motion.div>

    </div>
  );
};

export default Home;