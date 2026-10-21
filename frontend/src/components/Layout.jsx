import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => (
  <div className="app-layout">
    <a className="skip-link" href="#main-content">Lewati ke konten</a>
    <Sidebar />
    <main id="main-content" className="main-content"><Outlet /></main>
  </div>
);

export default Layout;
