import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowRight, FiCopy, FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";
import { downloadFile } from "../services/api";

const Hasil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <p className="text-gray-500 mb-4 text-lg">
          Belum ada hasil ringkasan.
        </p>

        <button
          onClick={() => navigate("/ringkasan")}
          className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-blue-700 transition"
        >
          Kembali ke Halaman Ringkasan
        </button>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result.summary);
    alert("Ringkasan berhasil disalin.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-7xl mx-auto px-6 py-8"
    >
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-3">
        Hasil Ringkasan
      </h1>

      <p className="text-gray-500 mb-8">
        Berikut perbandingan materi asli dengan hasil ringkasan.
      </p>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow border p-5">
          <p className="text-sm text-gray-500">Jumlah Kata Awal</p>
          <h2 className="text-2xl font-bold text-gray-800">
            {result.word_before}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow border p-5">
          <p className="text-sm text-gray-500">Jumlah Kata Ringkasan</p>
          <h2 className="text-2xl font-bold text-primary">
            {result.word_after}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow border p-5">
          <p className="text-sm text-gray-500">Waktu Proses</p>
          <h2 className="text-2xl font-bold text-green-600">
            {result.processing_time} detik
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">

        {/* Materi Asli */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

          <div className="bg-gray-50 border-b px-6 py-5">
            <h3 className="text-lg font-semibold text-gray-800">
              📄 Materi Asli
            </h3>
          </div>

          <textarea
            readOnly
            value={result.original_text}
            className="
              w-full
              h-[430px]
              resize-none
              bg-white
              p-6
              outline-none
              leading-7
              text-gray-700
              text-sm
              overflow-y-auto
            "
          />

          <div className="bg-gray-50 border-t px-6 py-4 flex justify-between text-sm text-gray-500">
            <span>Jumlah Kata</span>
            <span>{result.word_before} kata</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-white shadow-lg border flex items-center justify-center">
            <FiArrowRight className="text-3xl text-primary rotate-90 lg:rotate-0" />
          </div>
        </div>

        {/* Ringkasan */}
        <div className="bg-white rounded-3xl shadow-lg border border-blue-100 overflow-hidden relative">

          <div className="absolute left-0 top-0 h-full w-1 bg-primary"></div>

          <div className="bg-blue-50 border-b border-blue-100 px-6 py-5 pl-8">
            <h3 className="text-lg font-semibold text-primary">
              ✨ Hasil Ringkasan
            </h3>
          </div>

          <textarea
            readOnly
            value={result.summary}
            className="
              w-full
              h-[430px]
              resize-none
              bg-white
              p-6
              pl-8
              outline-none
              leading-7
              text-gray-700
              text-sm
              overflow-y-auto
            "
          />

          <div className="bg-blue-50 border-t border-blue-100 px-6 py-4 pl-8 flex justify-between text-sm text-primary">
            <span>{result.word_after} kata</span>
            <span>{result.processing_time} detik</span>
          </div>
        </div>
      </div>

      {/* Tombol */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">

        <button
          onClick={() => navigate("/ringkasan")}
          className="
            h-12
            px-7
            rounded-xl
            border
            border-gray-300
            bg-white
            hover:bg-gray-50
            transition
            font-medium
          "
        >
          Ringkas Lagi
        </button>

        <button
          onClick={handleCopy}
          className="
            h-12
            px-7
            rounded-xl
            border
            border-primary
            text-primary
            hover:bg-blue-50
            transition
            flex
            items-center
            gap-2
            font-medium
          "
        >
          <FiCopy />
          Copy Summary
        </button>

        <button
          onClick={() => downloadFile(result.summary, "txt")}
          className="
            h-12
            px-7
            rounded-xl
            border
            border-gray-300
            bg-white
            hover:bg-gray-50
            transition
            flex
            items-center
            gap-2
            font-medium
          "
        >
          <FiDownload />
          Download TXT
        </button>

        <button
          onClick={() => downloadFile(result.summary, "docx")}
          className="
            h-12
            px-7
            rounded-xl
            bg-primary
            text-white
            hover:bg-blue-700
            transition
            flex
            items-center
            gap-2
            font-medium
            shadow-md
          "
        >
          <FiDownload />
          Download DOCX
        </button>

      </div>
    </motion.div>
  );
};

export default Hasil;