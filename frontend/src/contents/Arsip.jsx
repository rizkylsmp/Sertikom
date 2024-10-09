import React, { useState, useEffect } from "react";
import {
  CaretUp,
  MagnifyingGlass,
  CaretDown,
  PaperPlaneRight,
  FileArrowDown,
  ArrowFatLinesRight,
  Trash,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import axios from "axios";

const Arsip = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // GET DATA
  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/arsip`
      );
      console.log("Data fetched:", response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // SEARCH
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = data.filter((data) =>
    data.noSurat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...filteredItems];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredItems, sortConfig]);

  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // PAGINATION
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // DELETE DATA
  const deleteData = async () => {
    setIsLoading(true);
    await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/arsip/${deleteId}`
    );
    getData();
    setIsLoading(false);
    setConfirmDelete(false);
  };

  const showConfirmation = (dataId) => {
    setDeleteId(dataId);
    setConfirmDelete(true);
  };

  const hideConfirmation = () => {
    setConfirmDelete(false);
  };

  // SORT
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        return <CaretUp />;
      } else {
        return <CaretDown />;
      }
    }
    return null;
  };

  // DOWNLOAD
  const handleDownload = async (file) => {
    setIsLoading(true);
    try {
      const response = await fetch();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.split("/").pop() || "file");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("There was an error downloading the file:", error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* LOADING */}
      {isLoading && (
        <div className="fixed inset-0 bg-color-1 bg-opacity-50 flex justify-center items-center z-50 text-color-1">
          <div className="p-4 rounded-md">
            <span className="loading loading-dots loading-lg text-color-1"></span>
          </div>
        </div>
      )}

      {/* TITLE */}
      <div className="font-bold text-3xl">Arsip Surat</div>

      {/* DESCRIPTION */}
      <div className="text-lg">
        <div>
          Berikut ini adalah surat-surat yang telah terbit dan diarsipkan.
        </div>
        <div>Klik "Lihat" pada kolom aksi untuk menampilkan surat.</div>
      </div>

      {/* SEARCH BAR */}
      <div className="flex gap-3 items-center my-2">
        <div className="text-nowrap">Cari surat :</div>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <MagnifyingGlass size={24} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-9 px-2 py-1 border border-gray-300 rounded-md text-color-1 w-full"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-color-4 text-color-6 rounded-md px-2 py-1 "
        >
          Search
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white text-nowrap text-color-1">
          <thead>
            <tr className="border-color-3 text-left">
              <th
                className="border px-6 py-3"
                onClick={() => requestSort("noSurat")}
              >
                <div className="flex gap-2 items-center cursor-pointer">
                  Nomor Surat {getIcon("noSurat")}
                </div>
              </th>
              <th
                className="border px-6 py-3"
                onClick={() => requestSort("kategori")}
              >
                <div className="flex gap-2 items-center cursor-pointer">
                  Kategori {getIcon("kategori")}
                </div>
              </th>
              <th
                className="border px-6 py-3"
                onClick={() => requestSort("judul")}
              >
                <div className="flex gap-2 items-center cursor-pointer">
                  Judul {getIcon("judul")}
                </div>
              </th>
              <th
                className="border px-6 py-3"
                onClick={() => requestSort("waktu")}
              >
                <div className="flex gap-2 items-center cursor-pointer">
                  Waktu Pengarsipan {getIcon("waktu")}
                </div>
              </th>
              <th className="border px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data) => (
              <tr key={data.uuid} className="border-color-5">
                <td className="border px-6 py-4">{data.noSurat}</td>
                <td className="border px-6 py-4">{data.kategori.nama}</td>
                <td className="border px-6 py-4">{data.judul}</td>
                <td className="border px-6 py-4">{data.createdAt}</td>
                <td className="border px-6 py-4">
                  <div className="flex gap-1 justify-center text-center">
                    <button
                      onClick={() => showConfirmation(data.uuid)}
                      className="flex gap-1 items-center bg-color-3 py-1 px-2 rounded text-color-6"
                    >
                      <Trash size={24} />
                      Hapus
                    </button>
                    <button
                      onClick={() => handleDownload(data.file)}
                      className="flex gap-1 bg-color-4 py-1 px-2 rounded text-color-6"
                    >
                      <FileArrowDown size={24} />
                      Unduh File
                    </button>
                    <Link
                      to={`/arsip/view/${data.uuid}`}
                      className="flex gap-1 bg-color-4 py-1 px-2 rounded text-color-6"
                    >
                      Lihat <ArrowFatLinesRight size={24} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CONFIRMATION OVERLAY */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-color-1 bg-opacity-50 flex justify-center items-center z-50 text-color-1">
          <div className="bg-white py-5 px-10 rounded-md text-center">
            <div className="text-xl font-bold">Perhatian!</div>
            <div className="text-lg mb-2">
              Apakah Anda yakin ingin menghapus arsip surat ini?
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={hideConfirmation}
                className="bg-color-2 text-color-6 px-4 py-2 rounded-md"
              >
                Batal
              </button>
              <button
                onClick={deleteData}
                className="bg-color-4 text-color-6 px-4 py-2 rounded-md"
              >
                Ya!
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-2">
        <Link
          to="/arsip/upload"
          className="flex gap-2 items-center font-semibold py-2 px-4 rounded-lg bg-color-4 text-color-6"
        >
          <PaperPlaneRight size={28} />
          Arsipkan Surat
        </Link>
        <div className="join">
          <button className="join-item btn" onClick={goToPreviousPage}>
            «
          </button>
          <button className="join-item btn">Page {currentPage}</button>
          <button className="join-item btn" onClick={goToNextPage}>
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default Arsip;
