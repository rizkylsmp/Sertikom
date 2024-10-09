import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const KategoriEdit = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nama: "",
    keterangan: "",
  });
  const { dataId } = useParams();

  useEffect(() => {
    const getKategoriById = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/kategori/${dataId}`
        );
        setFormData({
          id: response.data.id,
          nama: response.data.nama,
          keterangan: response.data.keterangan,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        window.alert("Error fetching data");
      }
    };

    getKategoriById();
  }, [dataId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      setIsLoading(true);
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/kategori/${dataId}`,
        {
          nama: formData.nama,
          keterangan: formData.keterangan,
        }
      );
      navigate("/kategori");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        console.log(error.response.data);
        window.alert(error.response.data.msg);
      } else {
        window.alert("Terjadi kesalahan saat menambahkan data.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {isLoading && (
        <div className="fixed inset-0 bg-color-1 bg-opacity-50 flex justify-center items-center z-50 text-color-1">
          <div className="p-4 rounded-md">
            <span className="loading loading-dots loading-lg text-color-1"></span>
          </div>
        </div>
      )}
      <div className="font-bold text-3xl">
        <Link to="/kategori" className="hover:underline">
          Kategori Surat
        </Link>{" "}
        &gt;&gt; Edit
      </div>
      <div className="text-lg">
        Tambahkan atau edit data kategori. Jika sudah selesai, jangan lupa untuk
        mengklik tombol "Simpan".
      </div>
      <div className="w-full overflow-y-auto mt-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1 items-center">
              <label className="text-nowrap">ID (Auto Increment)</label>
            </div>
            <div className="col-span-3">
              <input
                disabled
                type="text"
                value={formData.id}
                className="w-40 px-2 py-1 border border-color-2 rounded"
              />
            </div>
            <div className="col-span-1 items-center">
              <label className="text-nowrap">Nama Kategori</label>
            </div>
            <div className="col-span-3">
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                className="w-80 px-2 py-1 border border-color-2 rounded"
              />
            </div>
            <div className="col-span-1 items-center">
              <label className="text-nowrap">Keterangan</label>
            </div>
            <div className="col-span-3">
              <textarea
                id="keterangan"
                name="keterangan"
                value={formData.keterangan}
                onChange={(e) =>
                  setFormData({ ...formData, keterangan: e.target.value })
                }
                className="w-full px-2 py-1 border border-color-2 rounded"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            <Link
              to="/kategori"
              className="bg-color-4 text-color-6 py-2 px-4 rounded"
            >
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

export default KategoriEdit;
