import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Riwayat = () => {
  const [history, setHistory] = useState([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem('summary_history') || '[]'));
    } catch {
      setLoadError(true);
    }
  }, []);

  const hapusRiwayat = () => {
    localStorage.removeItem('summary_history');
    setHistory([]);
  };

  return (
    <div className="page-shell">
      <header className="page-head">
        <p className="eyebrow">Kumpulan catatan</p>
        <h1 className="page-title">Riwayat ringkasan.</h1>
        <p className="lede">Setiap ringkasan yang kamu buat tersimpan di penyimpanan lokal browser ini, hanya di perangkat ini.</p>
      </header>

      {loadError ? (
        <section className="empty-state" role="alert">
          <h2>Riwayat tidak dapat dibaca.</h2>
          <p>Data penyimpanan mungkin rusak. Hapus data riwayat lalu buat ringkasan baru.</p>
          <button className="secondary-button" onClick={hapusRiwayat}>Hapus data riwayat</button>
        </section>
      ) : history.length === 0 ? (
        <section className="empty-state">
          <p className="eyebrow">Belum ada catatan</p>
          <h2>Ringkasanmu akan tersimpan di sini.</h2>
          <p>Mulai dari halaman Ringkas, lalu riwayat akan terisi otomatis setelah ringkasan pertama selesai.</p>
          <Link className="primary-button" to="/ringkasan">Buat ringkasan pertama</Link>
        </section>
      ) : (
        <>
          <div className="history-bar">
            <span>{history.length} ringkasan tersimpan di perangkat ini</span>
            <button className="secondary-button" onClick={hapusRiwayat}>Hapus semua riwayat</button>
          </div>
          <ol className="history-list">
            {history.map((item, idx) => (
              <li className="history-item" key={item.id}>
                <div className="history-side">
                  <span className="history-date">{String(history.length - idx).padStart(2, '0')}</span>
                  <span>{item.date}</span>
                  <span className="history-stat">{item.word_before} → {item.word_after} kata</span>
                  <span className="history-stat">{item.processing_time} detik</span>
                </div>
                <article className="history-main">
                  <h2>Ringkasan</h2>
                  <p className="history-summary">{item.summary}</p>
                  <details className="history-source">
                    <summary>Lihat materi asli</summary>
                    {item.original_text}
                  </details>
                </article>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default Riwayat;
