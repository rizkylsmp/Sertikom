import ArsipPage from "./pages/ArsipPage"
import ArsipUploadPage from "./pages/ArsipUploudPage"
import ArsipViewPage from "./pages/ArsipViewPage"
import KategoriPage from "./pages/KategoriPage"
import KategoriEditPage from "./pages/KategoriEditPage"
import KategoriUploadPage from "./pages/KategoriUploudPage"
import AboutPage from "./pages/AboutPage"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ArsipPage />}/>
          <Route path="/arsip/upload" element={<ArsipUploadPage />}/>
          <Route path="/arsip/view/:dataId" element={<ArsipViewPage />}/>
          <Route path="/kategori" element={<KategoriPage />}/>
          <Route path="/kategori/edit/:dataId" element={<KategoriEditPage />}/>
          <Route path="/kategori/upload" element={<KategoriUploadPage />}/>
          <Route path="/about" element={<AboutPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
