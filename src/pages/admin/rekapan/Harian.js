import React, { useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";

function Harian() {
  const [tanggal, setTanggal] = useState("");
  const [absensiData, setAbsensiData] = useState([]);

  const handleTanggalChange = (event) => {
    setTanggal(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/by-tanggal`,
        {
          params: { tanggalAbsen: tanggal },
        }
      );

      if (response.data.length === 0) {
        Swal.fire("Tidak ada", "Tidak ada yang absen hari ini", "info");
      } else {
        setAbsensiData(response.data);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Gagal", "Gagal Mengambil data", "error");
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/absensi/export/harian?tanggal=${tanggal}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Absensi-Harian.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      Swal.fire("Berhasil", "Berhasil mengunduh data", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Gagal", "Gagal Mengunduh data", "error");
    }
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const formatLamaKerja = (startKerja) => {
    const startDate = new Date(startKerja);
    const currentDate = new Date();

    const diffYears = currentDate.getFullYear() - startDate.getFullYear();

    let diffMonths = currentDate.getMonth() - startDate.getMonth();
    if (diffMonths < 0) {
      diffMonths += 12;
    }

    let diffDays = Math.floor(
      (currentDate - startDate) / (1000 * 60 * 60 * 24)
    );

    const lastDayOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    if (currentDate.getDate() < startDate.getDate()) {
      diffMonths -= 1;
      diffDays -= lastDayOfLastMonth;
    }

    let durationString = "";
    if (diffYears > 0) {
      durationString += `${diffYears} tahun `;
    }
    if (diffMonths > 0) {
      durationString += `${diffMonths} bulan `;
    }
    if (diffDays > 0) {
      durationString += `${diffDays} hari`;
    }

    return durationString.trim();
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className="sm:ml-64 content-page container p-5 ml-0 md:ml-56 mt-12">
          <div className="p-4">
            <div className="p-5">
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-none shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Rekap Harian
                  </h6>
                </div>
                <hr />
                <form
                  method="get"
                  id="filterForm"
                  className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5"
                >
                  <input
                    type="date"
                    className="appearance-none block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                    id="tanggal"
                    name="tanggal"
                    value={tanggal}
                    onChange={handleTanggalChange}
                  />
                  <div className="flex sm:flex-row gap-4 mx-auto items-center">
                    <button
                      type="button"
                      className="bg-indigo-500 hover:bg-indigo text-white font-bold py-2 px-4 rounded inline-block"
                      onClick={handleSearch}
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <button
                      type="button"
                      className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto"
                      onClick={handleExport}
                    >
                      <FontAwesomeIcon icon={faFileExport} />
                    </button>
                  </div>
                </form>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 py-3">
                  {absensiData.length === 0 ? (
                    <>
                      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mt-5 mb-3">
                        Tidak Ada Absen Hari Ini !!
                      </h1>
                      <p className="text-center">Silahkan pilih tanggal lain</p>
                    </>
                  ) : (
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            No
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Nama
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Tanggal
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Jam Masuk
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Foto Masuk
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Lokasi Masuk
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Jam Pulang
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Foto Pulang
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Jam Kerja
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {absensiData.map((absensi, index) => (
                          <tr key={index}>
                            <td className="px-5 py-3">{index + 1}</td>
                            <td className="px-5 py-3 capitalize">
                              {absensi.user.username}
                            </td>
                            <td className="px-5 py-3 capitalize">
                              {formatDate(absensi.tanggalAbsen)}
                            </td>
                            <td className="px-5 py-3">{absensi.jamMasuk}</td>
                            <td className="px-5 py-3">
                              <img
                                src={
                                  absensi.fotoMasuk ? absensi.fotoMasuk : "-"
                                }
                                alt="foto masuk"
                                className="w-16 h-8 rounded-sm"
                              />
                            </td>
                            <td className="px-5 py-3 capitalize">
                              {absensi.lokasiMasuk}
                            </td>
                            <td className="px-5 py-3">{absensi.jamPulang}</td>
                            <td className="px-5 py-3">
                              <img
                                src={
                                  absensi.fotoPulang ? absensi.fotoPulang : "-"
                                }
                                alt="foto pulang"
                                className="w-16 h-8 rounded-sm"
                              />
                            </td>
                            <td className="px-5 py-3">
                              {formatLamaKerja(absensi.user.startKerja)}
                            </td>
                            <td className="px-5 py-3 capitalize">
                              {absensi.statusAbsen}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Harian;
