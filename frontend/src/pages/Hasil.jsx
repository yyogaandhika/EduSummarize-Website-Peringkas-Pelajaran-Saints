import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCopy, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { downloadFile } from '../services/api';

const Hasil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-20">
        <p className="text-gray-500 mb-4">Belum ada hasil ringkasan.</p>
        <button onClick={() => navigate('/ringkasan')} className="text-primary font-medium hover:underline">
          Kembali ke halaman input
        </button>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result.summary);
    // You could add a toast notification here
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl pt-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hasil Ringkasan</h1>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Original Text Column */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
            <h3 className="font-semibold text-gray-700">Materi Asli</h3>
          </div>
          <textarea
            readOnly
            className="flex-1 w-full h-80 p-6 text-gray-600 bg-transparent resize-none outline-none leading-relaxed text-sm"
            value={result.original_text}
          ></textarea>
          <div className="p-4 border-t border-gray-100 text-xs text-gray-400 bg-gray-50 rounded-b-2xl">
            Jumlah Kata: {result.word_before} kata
          </div>
        </div>

        <div className="flex items-center justify-center lg:px-2">
          <FiArrowRight className="text-3xl text-primary transform rotate-90 lg:rotate-0" />
        </div>

        {/* Summary Column */}
        <div className="flex-1 bg-blue-50/50 rounded-2xl border border-blue-100 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <div className="p-4 border-b border-blue-100 bg-blue-50/80 rounded-t-2xl pl-6">
            <h3 className="font-semibold text-primary">Hasil Ringkasan</h3>
          </div>
          <textarea
            readOnly
            className="flex-1 w-full h-80 p-6 pl-6 text-gray-700 bg-transparent resize-none outline-none leading-relaxed text-sm"
            value={result.summary}
          ></textarea>
          <div className="p-4 border-t border-blue-100 text-xs text-primary bg-blue-50/80 rounded-b-2xl pl-6 flex justify-between">
            <span>Jumlah Kata: {result.word_after} kata</span>
            <span>Waktu: {result.processing_time} detik</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-end">
        <button 
          onClick={() => navigate('/ringkasan')}
          className="px-6 py-2 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Ringkas Lagi
        </button>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 px-6 py-2 border border-primary text-primary font-medium rounded-lg hover:bg-blue-50 transition-colors"
        >
          <FiCopy /> Copy Summary
        </button>
        <button 
          onClick={() => downloadFile(result.summary, 'txt')}
          className="flex items-center gap-2 px-6 py-2 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FiDownload /> Download TXT
        </button>
        <button 
          onClick={() => downloadFile(result.summary, 'docx')}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiDownload /> Download DOCX
        </button>
      </div>
    </motion.div>
  );
};

export default Hasil;
