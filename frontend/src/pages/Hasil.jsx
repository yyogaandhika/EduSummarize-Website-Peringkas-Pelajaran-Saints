import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCopy, FiDownload } from 'react-icons/fi';
import { downloadFile } from '../services/api';

const Hasil = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;
  const [copyMessage, setCopyMessage] = useState('');

  if (!result) {
    return (
      <div className="page-shell">
        <section className="empty-state">
          <p className="eyebrow">Belum ada hasil</p>
          <h1>Buat ringkasan pertamamu.</h1>
          <p>Masukkan materi dari halaman Ringkas. Setelah selesai, hasilnya akan tampil di sini bersama teks aslinya.</p>
          <button className="primary-button" onClick={() => navigate('/ringkasan')}>Masukkan materi</button>
        </section>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.summary);
      setCopyMessage('Ringkasan berhasil disalin ke clipboard.');
    } catch {
      setCopyMessage('Gagal menyalin. Pilih teks ringkasan, lalu salin secara manual.');
    }
  };

  return (
    <div className="page-shell">
      <header className="page-head">
        <p className="eyebrow">Hasil belajar</p>
        <h1 className="page-title">Ringkasan materi.</h1>
        <p className="lede">Baca kembali gagasan utama di sebelah kiri. Teks asli tetap tersedia untuk pembanding.</p>
      </header>

      <dl className="result-meta" aria-label="Informasi proses">
        <div className="metric">Materi awal<strong>{result.word_before} kata</strong></div>
        <div className="metric">Ringkasan<strong>{result.word_after} kata</strong></div>
        <div className="metric">Waktu proses<strong>{result.processing_time} detik</strong></div>
      </dl>

      <div className="result-layout">
        <section className="result-primary">
          <header>
            <h2>Ringkasan</h2>
            <span className="meta-tag">disusun oleh mT5</span>
          </header>
          <textarea readOnly aria-label="Teks hasil ringkasan" value={result.summary} />
        </section>
        <section className="result-secondary">
          <header><h2>Materi asli</h2></header>
          <textarea readOnly aria-label="Teks materi asli" value={result.original_text} />
        </section>
      </div>

      <div className="result-actions">
        <button className="secondary-button" onClick={() => navigate('/ringkasan')}>Ringkas lagi</button>
        <button className="secondary-button" onClick={handleCopy}><FiCopy aria-hidden="true" /> Salin ringkasan</button>
        <button className="secondary-button" onClick={() => downloadFile(result.summary, 'txt')}><FiDownload aria-hidden="true" /> Unduh TXT</button>
        <button className="primary-button" onClick={() => downloadFile(result.summary, 'docx')}><FiDownload aria-hidden="true" /> Unduh DOCX</button>
      </div>
      {copyMessage && <p role="status" className="result-status">{copyMessage}</p>}
    </div>
  );
};

export default Hasil;
