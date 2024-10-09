import { ArrowFatLinesLeft, FileArrowDown, Swap } from "@phosphor-icons/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ArsipView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const { dataId } = useParams();

  // GET DATA
  useEffect(() => {
    setIsLoading(true);
    const getDatabyId = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/arsip/${dataId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getDatabyId();
  }, [dataId]);

  // DOWNLOAD
  const handleDownload = async (file) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/uploads/${file}`
      );
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
    } catch (error) {
      console.error("There was an error downloading the file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // UPLOAD
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/arsip/${dataId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Re-fetch the updated data
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/arsip/${dataId}`
      );
      setData(response.data);
    } catch (error) {
      console.error("There was an error uploading the file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* LOADING */}
      {isLoading && (
        <div className="fixed inset-0 bg-color-1 bg-opacity-50 flex justify-center items-center z-50 text-color-1">
          <div className="p-4 rounded-md">
            <span className="loading loading-dots loading-lg text-color-3"></span>
          </div>
        </div>
      )}

      {/* TITLE */}
      <div className="font-bold text-3xl">
        <Link to="/" className="hover:underline">
          Arsip Surat
        </Link>{" "}
        &gt;&gt; Lihat
      </div>

      {/* DATA */}
      <div className="grid lg:grid-cols-12 grid-cols-10">
        <div className="lg:col-span-2 col-span-3">Nomor</div>
        <div className="col-span-1">: </div>
        <div className="lg:col-span-9 col-span-6">{data.noSurat}</div>

        <div className="lg:col-span-2 col-span-3">Kategori</div>
        <div className="col-span-1">: </div>
        <div className="lg:col-span-9 col-span-5">{data.kategori?.nama}</div>

        <div className="lg:col-span-2 col-span-3">Judul</div>
        <div className="col-span-1">: </div>
        <div className="lg:col-span-9 col-span-5">{data.judul}</div>

        <div className="lg:col-span-2 col-span-3">Waktu Unggah</div>
        <div className="col-span-1">: </div>
        <div className="lg:col-span-9 col-span-4">{data.createdAt}</div>

        <div className="lg:col-span-2 col-span-3">File Surat (PDF)</div>
        <div className="col-span-1">: </div>
        <div className="lg:col-span-9 col-span-4">{data.file}</div>
      </div>

      {/* PDF */}
      <div className="relative">
        <div>
          {data.file ? (
            <iframe
              src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${data.file}`}
              className="w-full h-[100vh]"
              type="application/pdf"
              title="PDF VIEWER"
            />
          ) : (
            <p className="text-red-500">File tidak tersedia</p>
          )}
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex gap-3">
        <Link
          to="/"
          className="flex gap-1 py-1 px-2 border rounded text-color-6 bg-color-4 "
        >
          <ArrowFatLinesLeft size={24} /> Kembali
        </Link>
        <button
          onClick={() => handleDownload(data.file)}
          className="flex gap-1 items-center bg-color-4 py-1 px-2 rounded text-color-6"
        >
          <FileArrowDown size={24} />
          Unduh File
        </button>
        <input
          type="file"
          id="file"
          name="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => document.getElementById("file").click()}
          className="flex gap-1 items-center bg-color-4 py-1 px-2 rounded text-color-6"
        >
          <Swap size={24} />
          Edit/Ganti File
        </button>
      </div>
    </div>
  );
};

export default ArsipView;
