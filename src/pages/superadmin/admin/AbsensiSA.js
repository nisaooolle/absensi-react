import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Pagination } from "flowbite-react";
import NavbarSuper from "../../../components/NavbarSuper";

function Absensi() {
  const [absensi, setAbsensi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllAbsensi = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:2024/api/absensi/getAll`,
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

  useEffect(() => {
    const filteredData = absensi.filter(
      (absenData) =>
        absenData.user.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        absenData.user.admin.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        formatDate(absenData.tanggalAbsen)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredData.length / limit));
  }, [searchTerm, limit, absensi]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when limit changes
  };

  function onPageChange(page) {
    setCurrentPage(page);
  }

  // Function to format date in Indonesian
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const filteredAbsensi = absensi.filter(
    (absenData) =>
      absenData.user.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      absenData.user.admin.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      formatDate(absenData.tanggalAbsen)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const paginatedAbsensi = filteredAbsensi.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <NavbarSuper />
      </div>
      <div className="flex flex-1">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className="content-page flex-1 p-8 md:ml-64 mt-16 text-center">
          <div className="tabel-absen bg-white p-5 rounded-xl shadow-xl border border-gray-300">
            <div class="flex justify-between">
              <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Detail History Absensi
              </h6>
              <div className="flex items-center gap-2 mt-5">
                <div className="relative w-64">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
                    required
                  />
                </div>
                <select
                  value={limit}
                  onChange={handleLimitChange}
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>

            <hr className="mt-4" />
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
              <table
                id="rekapSimple"
                class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              >
                <thead class="text-left text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-4 py-3">
                      No
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Admin
                    </th>
                    <th scope="col" class="px-4 py-3">
                      User
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Tanggal
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Kehadiran
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Jam Masuk
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Foto Masuk
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Jam Pulang
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Foto Pulang
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Jam Kerja
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody class="text-left">
                  {paginatedAbsensi.map((absenData, index) => (
                    <tr
                      key={index}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {(currentPage - 1) * limit + index + 1}
                      </th>
                      <td class="px-6 py-4">{absenData.user.admin.username}</td>
                      <td class="px-6 py-4">{absenData.user.username}</td>
                      <td class="px-6 py-4">
                        {formatDate(absenData.tanggalAbsen)}
                      </td>
                      <td class="px-6 py-4">{absenData.statusAbsen}</td>
                      <td class="px-6 py-4">{absenData.jamMasuk} </td>
                      <td class="px-6 py-4">
                        <img
                          src={absenData.fotoMasuk ? absenData.fotoMasuk : "-"}
                          alt="Foto Masuk"
                          class="block py-2.5 px-0 w-25 max-h-32 h-25 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          id="foto_masuk"
                        />
                      </td>
                      <td class="px-6 py-4">{absenData.jamPulang}</td>
                      <td class="px-6 py-4">
                        <img
                          src={
                            absenData.fotoPulang ? absenData.fotoPulang : "-"
                          }
                          alt="Foto Pulang"
                          class="block py-2.5 px-0 w-25 max-h-96 h-25 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          id="foto_masuk"
                        />
                      </td>
                      <td class="px-6 py-4">00 jam 00 menit </td>
                      <td class="px-6 py-4">
                        <a href={`/superadmin/detailAbsensi/${absenData.id}`}>
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
            <Pagination
              className="mt-5"
              layout="table"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Absensi;