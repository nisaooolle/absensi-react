import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faInfo,
  faMagnifyingGlass,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Absensi() {
  const [absensi, setAbsensi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const getAllAbsensi = async () => {
    const token = localStorage.getItem("token");
    const adminId = localStorage.getItem("adminId");

    try {
      const response = await axios.get(
        `http://localhost:2024/api/absensi/admin/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAbsensi(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllAbsensi();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter function for search
  const filterAbsen = (absenData) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (absenData.jamMasuk &&
        absenData.jamMasuk.toLowerCase().includes(searchLower)) ||
      (absenData.jamPulang &&
        absenData.jamPulang.toLowerCase().includes(searchLower)) ||
      (absenData.status &&
        absenData.status.toLowerCase().includes(searchLower)) ||
      (absenData.keterangan &&
        absenData.keterangan.toLowerCase().includes(searchLower)) ||
      (absenData.user.username &&
        absenData.user.username.toLowerCase().includes(searchLower))
    );
  };
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = absensi.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to format date in Indonesian
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
        <div className="sm:ml-64 content-page container ml-0 md:ml-64 mt-6">
          <div className="p-5 mt-10">
            <main id="content" className="flex-1 p-4 sm:p-6">
              <div className="bg-white rounded-lg shadow-xl p-4">
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Detail History Absensi
                  </h6>
                  {/* <!-- <a type="button" href="https://demo-absen.excellentsistem.com/admin/tambah_lokasi"
                  className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"><i
                      className="fa-solid fa-plus"></i></a> --> */}
                </div>
                <hr />
                <form
                  action=""
                  method="post"
                  className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5"
                >
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="bulan"
                    name="bulan"
                  >
                    <option>Pilih Bulan</option>
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
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="tanggal"
                    name="tanggal"
                    placeholder="Pilih Tanggal"
                    // value=""
                  />
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="tahun"
                    name="tahun"
                    placeholder="Pilih Tahun"
                    // value=""
                  />
                  <div className="flex sm:flex-row gap-4 mx-auto items-center">
                    <button
                      type="submit"
                      className="bg-indigo-500 hover:bg-indigo text-white font-bold py-2 px-4 rounded inline-block"
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <a
                      href="https://demo-absen.excellentsistem.com/Admin/export_simple"
                      className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto"
                    >
                      <FontAwesomeIcon icon={faFileExport} />
                    </a>
                  </div>
                </form>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="mr-2 text-gray-500"
                    />
                    <input
                      type="text"
                      placeholder="Cari absen..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="px-3 py-2 border-blue-700 rounded-md"
                    />
                  </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                  <table
                    id="rekapSimple"
                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                  >
                    <thead className="text-left text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          No
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Username
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Tanggal
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Kehadiran
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Jam Masuk
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Foto Masuk
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Jam Pulang
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Foto Pulang
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Jam Kerja
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-left">
                      {currentItems
                        .filter(filterAbsen)
                        .map((absenData, index) => (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {indexOfFirstItem + index + 1}
                            </th>
                            <td className="px-6 py-4">{absenData.user.username}</td>
                            <td className="px-6 py-4">
                              {formatDate(absenData.tanggalAbsen)}
                            </td>
                            <td className="px-6 py-4">{absenData.statusAbsen}</td>
                            <td className="px-6 py-4">{absenData.jamMasuk} </td>
                            <td className="px-6 py-4">
                              <img
                                src={
                                  absenData.fotoMasuk
                                    ? absenData.fotoMasuk
                                    : "-"
                                }
                                alt="Foto Masuk"
                                className="block py-2.5 px-0 w-25 max-h-32 h-25 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                id="foto_masuk"
                              />
                            </td>
                            <td className="px-6 py-4">{absenData.jamPulang}</td>
                            <td className="px-6 py-4">
                              <img
                                src={
                                  absenData.fotoPulang
                                    ? absenData.fotoPulang
                                    : "-"
                                }
                                alt="Foto Pulang"
                                className="block py-2.5 px-0 w-25 max-h-96 h-25 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                id="foto_masuk"
                              />
                            </td>
                            <td className="px-6 py-4">00 jam 00 menit </td>
                            <td className="px-6 py-4">
                              <a href={`/admin/detailA/${absenData.id}`}>
                                <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                                  <span className="relative inline-block">
                                    <FontAwesomeIcon
                                      icon={faInfo}
                                      className="h-4 w-4"
                                    />
                                  </span>
                                </button>
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-4">
                  <ul className="pagination">
                    {Array(Math.ceil(absensi.length / itemsPerPage))
                      .fill()
                      .map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            onClick={() => paginate(index + 1)}
                            className={`page-link ${
                              currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "text-gray-500"
                            }`}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Absensi;
