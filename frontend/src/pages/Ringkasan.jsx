import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSummarize } from '../hooks/useSummarize';

const Ringkasan = () => {
  const [activeTab, setActiveTab] = useState('pdf');
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const { summarize, loading, error } = useSummarize();

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  });

  const handleSummarize = () => {
    if (activeTab === 'pdf' && file) {
      summarize(file, null);
    } else if (activeTab === 'text' && text.trim()) {
      summarize(null, text);
    }
  };

  const isSubmitDisabled = (activeTab === 'pdf' && !file) || (activeTab === 'text' && !text.trim());

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto px-8 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Input Materi</h1>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Pilih Sumber Materi</h3>
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setActiveTab('pdf')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors border ${activeTab === 'pdf' ? 'border-primary text-primary bg-blue-50' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
          >
            Upload File PDF
          </button>
          <button 
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors border ${activeTab === 'text' ? 'border-primary text-primary bg-blue-50' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
          >
            Tempelkan Teks
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {activeTab === 'pdf' ? (
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-blue-50' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}`}
          >
            <input {...getInputProps()} />
            <FiUploadCloud className="mx-auto text-4xl text-gray-400 mb-4" />
            {file ? (
              <p className="text-primary font-medium">{file.name}</p>
            ) : (
              <div>
                <p className="text-gray-600 font-medium mb-1">Seret dan lepas file PDF di sini</p>
                <p className="text-gray-500 text-sm">atau klik untuk memilih file</p>
              </div>
            )}
          </div>
        ) : (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Masukkan materi..."
            className="w-full h-64 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          ></textarea>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <p className="text-xs text-gray-400">
          {activeTab === 'pdf' ? 'Format yang didukung: PDF (Max. 20MB)' : ''}
        </p>
        <button 
          onClick={handleSummarize}
          disabled={isSubmitDisabled || loading}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-colors ${isSubmitDisabled || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-blue-700'}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sedang Meringkas...
            </>
          ) : (
            <>
              Ringkas Materi <FiArrowRight />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Ringkasan;
