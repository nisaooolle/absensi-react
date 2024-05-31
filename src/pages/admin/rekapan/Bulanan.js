import React from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

function Bulanan() {
  const [bulan, setBulan] = React.useState("");
  const [tahun, setTahun] = React.useState("");
  const [absensiData, setAbsensiData] = React.useState([]);

  const handleSearch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2024/api/absensi/get-absensi-bulan",
          {
            params: { tanggalAbsen: `${tahun}-${bulan}-01` },
          }
        );
        setAbsensiData(response.data);
      } catch (error) {
        console.error(error);
        Swal.fire("Gagal", "Gagal Mengambil data", "error");
      }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
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
        <div className="sm:ml-64 content-page container p-8 ml-0 md:ml-64 mt-12">
          <div className="p-4">
            <div className="p-5">
              <main id="content" className="flex-1 p-4 sm:p-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between">
                    <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      Rekap Bulanan Semua Karyawan
                    </h6>
                  </div>
                  <hr />
                  <form className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="bulan"
                      name="bulan"
                      value={bulan}
                      onChange={(e) => setBulan(e.target.value)}
                    >
                      <option value="">Pilih Bulan</option>
                      <option value="01">Januari</option>
                      <option value="02">Februari</option>
                      <option value="03">Maret</option>
                      <option value="04">April</option>
                      <option value="05">Mei</option>
                      <option value="06">Juni</option>
                      <option value="07">Juli</option>
                      <option value="08">Agustus</option>
                      <option value="09">September</option>
                      <option value="10">Oktober</option>
                      <option value="11">November</option>
                      <option value="12">Desember</option>
                    </select>
                    <input
                      type="number"
                      id="form_tahun"
                      name="tahun"
                      value={tahun}
                      onChange={(e) => setTahun(e.target.value)}
                      className="w-40 sm:w-64 sm:w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3"
                      placeholder="Pilih Tahun"
                      pattern="[0-9]{4}"
                    />
                    <div className="flex sm:flex-row gap-4 mx-auto items-center">
                      <button
                        type="button"
                        className="bg-indigo-500 hover:bg-indigo text-white font-bold py-2 px-4 rounded inline-block"
                        onClick={handleSearch}
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                      <a
                        href={`http://localhost:2024/api/absensi/export/bulanan?bulan=${bulan}&tahun=${tahun}`}
                        className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto"
                      >
                        <FontAwesomeIcon icon={faFileExport} />
                      </a>
                    </div>
                  </form>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 px-4 py-3">
                    {/* {absensiData.length === 0 ? (
                      <>
                        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mt-5 mb-3">
                          Anda Belum Menginputkan Bulan dan Tahun
                        </h1>
                        <p className="text-center">
                          Silahkan pilih bulan dan tahun terlebih dahulu
                        </p>
                      </>
                    ) : ( */}
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-5 py-3">
                              No
                            </th>
                            <th scope="col" className="px-5 py-3">
                              Nama
                            </th>
                            <th scope="col" className="px-5 py-3">
                              Tanggal
                            </th>
                            <th scope="col" className="px-5 py-3">
                              Jam Masuk
                            </th>
                            <th scope="col" className="px-5 py-3">
                              Foto Masuk
                            </th>
                            <th scope="col" className="px-5 py-3">
                              Lokasi Masuk
                            </th>
                            <th scope="col" className="px-5 py-3">
                              Jam Pulang
                            </th>
                            <th scope="col" className="px-5 py-3">
                              Foto Pulang
                            </th>
                            <th scope="col" className="px-5 py-3">
                              Jam Kerja
                            </th>
                            <th scope="col" className="px-5 py-3">
                              Keterangan
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {absensiData.length > 0 && absensiData != null ? (
                            absensiData.map((absensi, index) => (
                              <tr key={index}>
                                <td className="px-5 py-3">{index + 1}</td>
                                <td className="px-5 py-3">
                                  {absensi.user.username}
                                </td>
                                <td className="px-5 py-3">
                                  {formatDate(absensi.tanggalAbsen)}
                                </td>
                                <td className="px-5 py-3">
                                  {absensi.jamMasuk}
                                </td>
                                <td className="px-5 py-3">
                                  <img
                                    src={absensi.fotoMasuk}
                                    alt="foto masuk"
                                    className="w-16 h-8 rounded-sm"
                                  />
                                </td>
                                <td className="px-5 py-3">
                                  {absensi.lokasiMasuk}
                                </td>
                                <td className="px-5 py-3">
                                  {absensi.jamPulang}
                                </td>
                                <td className="px-5 py-3">
                                  <img
                                    src={absensi.fotoPulang}
                                    alt="foto pulang"
                                    className="w-16 h-8 rounded-sm"
                                  />
                                </td>{" "}
                                <td className="px-5 py-3">
                                  {absensi.user.shift.namaShift}
                                </td>
                                <td className="px-5 py-3">
                                  {absensi.statusAbsen}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="9" className="text-center py-3">
                                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mt-5 mb-3">
                                  Tidak Ada Absensi di Bulan Ini!!!
                                </h1>
                                <p className="text-center">
                                  Silahkan pilih bulan dan tahun lain
                                </p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    {/* )} */}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bulanan;
