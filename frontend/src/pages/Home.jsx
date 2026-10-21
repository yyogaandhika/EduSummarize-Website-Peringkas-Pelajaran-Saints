import { Link } from 'react-router-dom';

const steps = [
  {
    n: '01',
    title: 'Masukkan materi',
    body: 'Unggah PDF buku pelajaran, modul, atau tempel kutipan teks. Tidak ada login, tidak ada akun.',
  },
  {
    n: '02',
    title: 'Baca inti materi',
    body: 'Model mT5 menghasilkan ringkasan dalam Bahasa Indonesia. Teks asli tetap tersedia untuk dibandingkan.',
  },
];

const Home = () => (
  <div className="page-shell">
    <section className="home-hero" aria-labelledby="home-title">
      <p className="eyebrow">Panduan belajar Biologi &amp; Sains</p>
      <h1 id="home-title" className="display-title">
        Materi panjang,<br />ringkas jadi <em>inti</em> yang<br />siap kamu baca.
      </h1>
      <p className="lede">
        EduSummarize membantu siswa SMP dan SMA menemukan gagasan utama dari materi Biologi dan Sains, dari PDF buku pelajaran sampai teks modul.
      </p>
      <div className="home-hero-actions">
        <Link className="primary-button" to="/ringkasan">Mulai ringkas materi</Link>
        <Link className="ghost-button" to="/tentang">Pelajari cara kerjanya</Link>
      </div>
      <div className="home-hero-meta">
        <span><strong>Bahasa Indonesia</strong> &middot; keluaran abstraktif</span>
        <span><strong>Tanpa akun</strong> &middot; riwayat tersimpan di perangkat</span>
      </div>
    </section>

    <section className="home-steps" aria-labelledby="steps-title">
      <div className="home-steps-head">
        <h2 id="steps-title" className="section-title">Dua langkah, satu halaman.</h2>
        <p>Alur yang dirancang supaya kamu tetap fokus pada materi. Tidak ada antrean, tidak ada menu bertingkat.</p>
      </div>
      <ol className="steps-list">
        {steps.map(({ n, title, body }) => (
          <li className="step-item" key={n}>
            <span className="step-num" aria-hidden="true">{n}</span>
            <div className="step-body">
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>

    <section className="home-cta" aria-labelledby="cta-title">
      <div>
        <p className="eyebrow">Siap mulai</p>
        <h2 id="cta-title">Pilih materi, lalu biarkan kami yang membacanya dulu.</h2>
        <p>Hasil ringkasan muncul di halaman yang sama, lengkap dengan teks asli untuk pembanding.</p>
      </div>
      <Link className="primary-button" to="/ringkasan">Masuk ruang kerja</Link>
    </section>
  </div>
);

export default Home;
