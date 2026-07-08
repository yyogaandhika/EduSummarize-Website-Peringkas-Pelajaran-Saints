import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Riwayat = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("summary_history")) || [];

    setHistory(data);
  }, []);

  const hapusRiwayat = () => {
    localStorage.removeItem("summary_history");
    setHistory([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto px-8 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Riwayat Ringkasan
        </h1>

        {history.length > 0 && (
          <button
            onClick={hapusRiwayat}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Hapus Semua
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow">
          <p className="text-gray-500">
            Belum ada riwayat ringkasan.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow border border-gray-100"
            >
              <div className="p-6 border-b">
                <p className="text-xs text-gray-500 mb-2">
                  {item.date}
                </p>

                <h2 className="font-semibold text-lg mb-3">
                  Materi Asli
                </h2>

                <p className="text-gray-600 line-clamp-4">
                  {item.original_text}
                </p>
              </div>

              <div className="p-6 bg-blue-50">
                <h2 className="font-semibold text-blue-600 mb-3">
                  Hasil Ringkasan
                </h2>

                <p>{item.summary}</p>

                <div className="flex justify-between mt-5 text-sm text-gray-500">
                  <span>
                    {item.word_before} → {item.word_after} kata
                  </span>

                  <span>
                    {item.processing_time} detik
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Riwayat;