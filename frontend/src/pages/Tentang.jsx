import { motion } from 'framer-motion';

const Tentang = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto px-8 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tentang Sistem</h1>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Deskripsi</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            EduSum adalah sistem peringkas materi Biologi SMA berbasis NLP yang dirancang untuk membantu siswa memahami materi pembelajaran secara lebih efisien. Sistem memanfaatkan model mT5 (Multilingual Text-to-Text Transfer Transformer) untuk menghasilkan ringkasan otomatis dari teks materi secara abstraktif.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Teknologi yang Digunakan</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Python & FastAPI</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> mT5 (Transformer)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> React JS & Vite</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> TailwindCSS</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> PyMuPDF (PDF Extraction)</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Sumber Dataset</h3>
            <p className="text-sm text-gray-600 mb-3">Dataset diperoleh dari materi Sains berbahasa Indonesia, meliputi:</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Buku Sekolah Elektronik (BSE)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Modul pembelajaran</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Artikel edukasi relevan</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Evaluasi Model</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Model mT5 dievaluasi menggunakan metrik ROUGE (Recall-Oriented Understudy for Gisting Evaluation). Hasil fine-tuning menunjukkan performa yang stabil dengan kemampuan mengonstruksi kalimat baru yang representatif namun lebih ringkas dari teks aslinya.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Tentang;
