import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Ringkasan from './pages/Ringkasan';
import Hasil from './pages/Hasil';
import Tentang from './pages/Tentang';
import Riwayat from "./pages/Riwayat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ringkasan" element={<Ringkasan />} />
          <Route path="hasil" element={<Hasil />} />
          <Route path="riwayat" element={<Riwayat />} />
          <Route path="tentang" element={<Tentang />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
