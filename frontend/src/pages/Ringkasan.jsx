import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiFileText, FiUploadCloud } from 'react-icons/fi';
import { useSummarize } from '../hooks/useSummarize';

const Ringkasan = () => {
  const [activeTab, setActiveTab] = useState('pdf');
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const { summarize, loading, error } = useSummarize();
  const onDrop = useCallback((acceptedFiles) => setFile(acceptedFiles[0] || null), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024,
  });
  const canSubmit = activeTab === 'pdf' ? Boolean(file) : Boolean(text.trim());
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleSummarize = () => {
    if (activeTab === 'pdf' && file) summarize(file, null);
    if (activeTab === 'text' && text.trim()) summarize(null, text.trim());
  };

  return (
    <div className="page-shell">
      <header className="page-head">
        <p className="eyebrow">Ruang kerja</p>
        <h1 className="page-title">Ringkas materi.</h1>
        <p className="lede">Pilih cara memasukkan materi. Ringkasan akan muncul di halaman hasil dan tersimpan di riwayat perangkat ini.</p>
      </header>

      <div className="workspace">
        <section className="source-card" aria-labelledby="source-title">
          <div className="source-head">
            <h2 id="source-title">Materi sumber</h2>
            <span className="source-count">
              {activeTab === 'pdf' ? (file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB dipilih` : 'Belum ada file') : `${wordCount} kata`}
            </span>
          </div>

          {error && <p className="error-message" role="alert">Ringkasan gagal dibuat: {error}. Coba lagi setelah memeriksa materi.</p>}

          <div className="source-tabs" role="tablist" aria-label="Cara memasukkan materi">
            <button type="button" role="tab" aria-selected={activeTab === 'pdf'} className="source-tab" onClick={() => setActiveTab('pdf')}>
              <FiUploadCloud aria-hidden="true" /> Unggah PDF
            </button>
            <button type="button" role="tab" aria-selected={activeTab === 'text'} className="source-tab" onClick={() => setActiveTab('text')}>
              <FiFileText aria-hidden="true" /> Tempel teks
            </button>
          </div>

          {activeTab === 'pdf' ? (
            <div {...getRootProps({ className: `drop-area${isDragActive ? ' dragging' : ''}` })}>
              <input {...getInputProps({ 'aria-label': 'Pilih dokumen PDF' })} />
              <FiUploadCloud aria-hidden="true" />
              {file ? (
                <>
                  <strong>{file.name}</strong>
                  <span>Klik atau jatuhkan PDF lain untuk mengganti</span>
                </>
              ) : (
                <>
                  <strong>{isDragActive ? 'Lepaskan PDF di sini' : 'Jatuhkan dokumen PDF di sini'}</strong>
                  <span>atau klik untuk memilih file, maksimal 20 MB</span>
                </>
              )}
            </div>
          ) : (
            <label className="text-area-wrap" htmlFor="source-text">
              <span>Teks materi</span>
              <textarea
                id="source-text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Tempel materi pelajaran di sini. Satu bab atau sub-bab akan menghasilkan ringkasan terbaik."
                className="field input-textarea"
              />
            </label>
          )}

          <div className="input-footer">
            <span className="input-hint">Pastikan materi relevan dengan topik Biologi atau Sains. Ringkasan akan mengikuti bahasa teks sumber.</span>
            <button type="button" onClick={handleSummarize} disabled={!canSubmit || loading} className="primary-button" aria-live="polite">
              {loading ? 'Sedang meringkas…' : 'Buat ringkasan'}
            </button>
          </div>
        </section>

        <aside className="source-aside" aria-label="Catatan penggunaan">
          <div className="aside-item">
            <h3>Materi PDF</h3>
            <p>Teks di dalam PDF akan diekstraksi dulu. Dokumen hasil pindaian gambar belum didukung.</p>
          </div>
          <div className="aside-item">
            <h3>Teks tempel</h3>
            <p>Cocok untuk kutipan modul, catatan, atau bagian singkat yang ingin cepat diringkas.</p>
          </div>
          <div className="aside-item">
            <h3>Penyimpanan</h3>
            <p>Semua riwayat tersimpan hanya di browser ini. Hapus kapan saja dari halaman Riwayat.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Ringkasan;
