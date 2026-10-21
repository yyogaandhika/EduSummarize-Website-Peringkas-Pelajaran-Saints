import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/ringkasan', label: 'Ringkas materi' },
  { to: '/riwayat', label: 'Riwayat' },
  { to: '/tentang', label: 'Tentang' },
];

const Sidebar = () => (
  <header className="site-header">
    <div className="site-header-inner">
      <NavLink to="/" className="brand" aria-label="EduSummarize, Beranda">
        <span className="brand-name">EduSummarize</span>
        <span className="brand-dot" aria-hidden="true">.</span>
        <span className="brand-tag">peringkas pelajaran sains</span>
      </NavLink>
      <nav className="site-nav" aria-label="Navigasi utama">
        {links.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
);

export default Sidebar;
