import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../../components/SidebarUser";
import Navbar from "../../../components/NavbarUser";
import Webcam from "react-webcam";
import axios from "axios";
import Swal from "sweetalert2";

function AbsenMasuk() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const webcamRef = useRef(null);
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Perbarui setiap detik

    return () => clearInterval(interval);
  }, []); // Tidak ada dependensi, sehingga efek ini hanya dipanggil sekali saat komponen dimuat

  // Fungsi untuk menambahkan nol di depan angka jika angka kurang dari 10
  const tambahkanNolDepan = (num) => {
    return num < 10 ? "0" + num : num;
  };

  // Tentukan ucapan berdasarkan waktu hari
  const jamSekarang = currentDateTime.getHours();
  let ucapan;
  if (jamSekarang < 10) {
    ucapan = "Selamat Pagi";
  } else if (jamSekarang < 15) {
    ucapan = "Selamat Siang";
  } else if (jamSekarang < 18) {
    ucapan = "Selamat Sore";
  } else {
    ucapan = "Selamat Malam";
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCaptureAndSubmit = async () => {
    // Ambil foto
    const imageSrc = webcamRef.current.getScreenshot();

    // Lakukan absen masuk
    handleSubmit(imageSrc);
  };

  const handleSubmit = async (capturedImage) => {
    // Pastikan keterangan tidak kosong
    const keteranganAbsen = keterangan || "-";
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    if (!userId) {
      // Jika userId tidak tersedia
      console.error("UserID tidak tersedia");
      return;
    }

    try {
      await axios.post(
        `http://localhost:2024/api/absensi/absensi-masuk/${userId}`,
        {
          jamMasuk: `${tambahkanNolDepan(
            currentDateTime.getHours()
          )}:${tambahkanNolDepan(currentDateTime.getMinutes())}`,
          jamPulang: `${tambahkanNolDepan(
            currentDateTime.getHours()
          )}:${tambahkanNolDepan(currentDateTime.getMinutes())}`,
          tanggalAbsen: currentDateTime.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          fotoMasuk: capturedImage,
          keterangan: keterangan,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href = "/user/history_absen";
      }, 1500);
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: "Mohon coba lagi",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex h-full">
        <div className={`${sidebarOpen ? "fixed" : "hidden"} lg:flex`}>
          <Sidebar isOpen={sidebarOpen} />
        </div>
        <div className="content-page max-h-screen container p-8 min-h-screen ml-0 lg:ml-64">
          <div className="add-izin mt-12 bg-white p-5 rounded-xl shadow-lg border border-gray-300">
            <h1 className="text-lg sm:text-2xl font-medium mb-4 sm:mb-7">
              Absen Masuk
            </h1>
            <div className="text-base text-center mt-2">
              {currentDateTime.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              -{" "}
              {tambahkanNolDepan(currentDateTime.getHours()) +
                ":" +
                tambahkanNolDepan(currentDateTime.getMinutes()) +
                ":" +
                tambahkanNolDepan(currentDateTime.getSeconds())}
            </div>
            <div className="text-base text-center mt-2">{ucapan}</div>
            <form onSubmit={(e) => e.preventDefault()}>
              <p className="font-bold text-center mt-8">Foto:</p>
              <div className="flex justify-center">
                <Webcam audio={false} ref={webcamRef} />
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={handleCaptureAndSubmit}
                  className="block w-32 sm:w-40 bg-blue-500 text-white rounded-lg py-3 text-sm sm:text-xs font-medium"
                >
                  Ambil Foto dan Absen Masuk
                </button>
              </div>
              <div className="relative mb-3 mt-5">
                <input
                  type="text"
                  id="keterangan"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5"
                  placeholder="Keterangan"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbsenMasuk;
