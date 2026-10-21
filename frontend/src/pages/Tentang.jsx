const Tentang = () => (
  <div className="page-shell">
    <header className="page-head">
      <p className="eyebrow">Tentang alat belajar</p>
      <h1 className="page-title">Membantu materi terasa lebih dekat.</h1>
    </header>

    <section className="about-lead">
      <p>
        EduSummarize adalah peringkas materi berbasis <em>Natural Language Processing</em>. Sistem menggunakan model mT5 untuk menghasilkan ringkasan abstraktif dari teks berbahasa Indonesia, dirancang khusus untuk materi Biologi dan Sains tingkat SMP dan SMA.
      </p>
    </section>

    <dl className="about-grid">
      <div className="about-row">
        <dt>Model</dt>
        <dd><strong>mT5</strong> (Multilingual Text-to-Text Transfer Transformer), model abstraktif yang menyusun ulang kalimat alih-alih sekadar memilih kutipan.</dd>
      </div>
      <div className="about-row">
        <dt>Teknologi</dt>
        <dd>
          <ul>
            <li>Python dan FastAPI untuk layanan ringkasan</li>
            <li>React dan Vite untuk antarmuka</li>
            <li>PyMuPDF untuk ekstraksi teks dari PDF</li>
            <li>Tailwind CSS sebagai dasar styling</li>
          </ul>
        </dd>
      </div>
      <div className="about-row">
        <dt>Sumber materi</dt>
        <dd>Dataset mencakup materi Sains berbahasa Indonesia dari Buku Sekolah Elektronik, modul pembelajaran, dan artikel edukasi yang relevan dengan kurikulum sekolah.</dd>
      </div>
      <div className="about-row">
        <dt>Evaluasi</dt>
        <dd>Model dievaluasi dengan metrik <strong>ROUGE</strong> (Recall-Oriented Understudy for Gisting Evaluation) untuk menilai kesesuaian ringkasan terhadap materi sumber.</dd>
      </div>
      <div className="about-row">
        <dt>Catatan</dt>
        <dd>Ringkasan membantu meninjau ulang materi, tetapi tidak menggantikan sumber asli. Periksa kembali istilah dan konteks penting saat belajar untuk ujian.</dd>
      </div>
    </dl>
  </div>
);

export default Tentang;
