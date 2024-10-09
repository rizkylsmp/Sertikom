import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ArsipUploud = () => {
  const navigate = useNavigate();
  const [kategori, setKategori] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState("");
  const [formData, setFormData] = useState({
    noSurat: "",
    judul: "",
    file: null,
  });

  useEffect(() => {
    getKategori();
  }, []);

  const getKategori = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/kategori`
      );
      setKategori(response.data);
    } catch (error) {
      console.error("Error saat mengambil data kategori");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.noSurat ||
      !selectedKategori ||
      !formData.judul ||
      !formData.file
    ) {
      window.alert("Semua field harus diisi.");
      return;
    }

    const data = new FormData();
    data.append("noSurat", formData.noSurat);
    data.append("kategoriId", selectedKategori);
    data.append("judul", formData.judul);
    data.append("file", formData.file);

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/arsip`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        window.alert(error.response.data.msg);
      } else {
        window.alert("Terjadi kesalahan saat menambahkan data.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="font-bold text-3xl">
        <Link to="/" className="hover:underline">
          Arsip Surat
        </Link>{" "}
        &gt;&gt; Unggah
      </div>
      <div className="text-lg">
        <div>
          Unggah surat yang telah terbit pada form ini untuk diarsipkan.
        </div>
        <div>Catatan :</div>
        <div className="pl-5">
          <li>Gunakan file berformat PDF</li>
        </div>
      </div>
      <div className="w-full overflow-y-auto mt-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1 flex items-center">
              <label className="text-nowrap">Nomor Surat</label>
            </div>
            <div className="col-span-3">
              <input
                type="text"
                id="noSurat"
                name="noSurat"
                value={formData.noSurat}
                onChange={(e) =>
                  setFormData({ ...formData, noSurat: e.target.value })
                }
                className="w-full px-2 py-1 border border-color-2 rounded"
              />
            </div>
            <div className="col-span-1 flex items-center">
              <label className="text-nowrap">Kategori</label>
            </div>
            <div className="col-span-3">
              <select
                id="kategori"
                name="kategori"
                value={selectedKategori}
                onChange={(e) => setSelectedKategori(e.target.value)}
                className="w-full px-2 py-1 border border-color-2 rounded"
              >
                <option disabled value="">
                  Pilih Kategori
                </option>
                {kategori.map((item) => (
                  <option key={item.uuid} value={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1 flex items-center">
              <label className="text-nowrap">Judul</label>
            </div>
            <div className="col-span-3">
              <input
                type="text"
                id="judul"
                name="judul"
                value={formData.judul}
                onChange={(e) =>
                  setFormData({ ...formData, judul: e.target.value })
                }
                className="w-full px-2 py-1 border border-color-2 rounded"
              />
            </div>
            <div className="col-span-1 flex items-center">
              <label className="text-nowrap">File Surat (PDF)</label>
            </div>
            <div className="col-span-3 flex gap-3">
              <input
                type="text"
                id="fileName"
                name="fileName"
                value={formData.file ? formData.file.name : ""}
                readOnly
                className="w-full px-2 py-1 border border-color-2 rounded"
              />
              <input
                type="file"
                id="file"
                name="file"
                accept=".pdf"
                onChange={(e) =>
                  setFormData({ ...formData, file: e.target.files[0] })
                }
                className="hidden"
              />
              <button
                type="button"
                onClick={() => document.getElementById("file").click()}
                className="text-nowrap bg-color-4 text-color-6 rounded px-2 py-1"
              >
                Browse File...
              </button>
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            <Link to="/" className="bg-color-4 text-color-6 py-2 px-4 rounded">
              &lt;&lt; Kembali
            </Link>
            <button
              type="submit"
              className="bg-color-4 text-color-6 py-2 px-4 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArsipUploud;
