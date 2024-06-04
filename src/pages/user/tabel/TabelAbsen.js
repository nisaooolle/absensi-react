import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faSearch,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function TabelAbsen() {
  const [absensi, setAbsensi] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isButtonActive, setIsButtonActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getAbsensi = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `http://localhost:2024/api/absensi/getByUserId/${userId}`,
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
    getAbsensi();
    // checkButtonState();
  }, []);

  // const checkButtonState = () => {
  //   const hasCompletedJamMasuk = localStorage.getItem("hasCompletedJamMasuk");
  //   const hasCompletedJamPulang = localStorage.getItem("hasCompletedJamPulang");

  //   if (hasCompletedJamMasuk === "true" && hasCompletedJamPulang === "true") {
  //     setIsButtonActive(false); // Button disabled jika jam masuk dan jam pulang terpenuhi
  //   } else if (
  //     (hasCompletedJamMasuk === "true" && hasCompletedJamPulang === null) ||
  //     hasCompletedJamPulang === undefined
  //   ) {
  //     setIsButtonActive(true); // Button aktif jika hanya jam masuk yang terpenuhi
  //   } else {
  //     setIsButtonActive(true); // Button aktif jika tidak ada jam masuk atau jam pulang yang terpenuhi
  //   }
  // };

  // const handleAbsen = () => {
  //   const today = new Date().toISOString().split("T")[0];
  //   localStorage.setItem("absenDate", today);
  //   setIsButtonActive(false);
  // };

  // Search function
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter function for search
  const filterAbsen = (absenData) => {
    return (
      absenData.jamMasuk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      absenData.jamPulang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      absenData.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      absenData.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex flex-1">
        <div className="fixed">
          <Sidebar isOpen={sidebarOpen} />
        </div>
        <div className="content-page flex-1 p-8 md:ml-64 mt-16">
          <div className="tabel-absen bg-blue-100 p-5 rounded-xl shadow-xl border border-gray-300">
            <h2 className="text-xl font-bold">History Absensi</h2>
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
            <div className="overflow-x-auto rounded-xl border border-gray-200 mt-4">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border border-gray-300">
                <thead className="text-left text-white bg-blue-500">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-center">
                      NO
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-center">
                      TANGGAL
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-center">
                      JAM MASUK
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-center">
                      JAM PULANG
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-center">
                      KETERANGAN
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-center">
                      KEHADIRAN
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-center">
                      AKSI
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {currentItems.filter(filterAbsen).map((absenData, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {formatDate(absenData.tanggalAbsen)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {absenData.jamMasuk}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {absenData.jamPulang}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {absenData.keteranganIzin != null
                          ? absenData.keteranganIzin
                          : absenData.keteranganTerlambat == null
                          ? "-"
                          : absenData.keteranganTerlambat}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {absenData.statusAbsen}
                      </td>
                      <td className="whitespace-nowrap text-center py-3">
                        <div className="flex items-center -space-x-4 ml-12">
                          <Link to={"/user/detail_absen/" + absenData.id}>
                            <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                              <span className="relative inline-block">
                                <FontAwesomeIcon
                                  icon={faInfo}
                                  className="h-4 w-4"
                                />
                              </span>
                            </button>
                          </Link>
                          {absensi.statusAbsen === "Izin" ? (
                            <button
                              className="z-30 block rounded-full border-2 border-white bg-gray-100 p-4 text-gray-700 active:bg-red-50"
                              disabled
                            >
                              <span className="relative inline-block">
                                <FontAwesomeIcon
                                  className="h-4 w-4"
                                  icon={faUserPlus}
                                />
                              </span>
                            </button>
                          ) : (
                            <Link to="/user/izin_absen">
                              <button className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 active:bg-red-50">
                                <span className="relative inline-block">
                                  <FontAwesomeIcon
                                    className="h-4 w-4"
                                    icon={faUserPlus}
                                  />
                                </span>
                              </button>
                            </Link>
                          )}
                        </div>
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
                        className="page-link"
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabelAbsen;
