import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPrint, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Lembur() {
  const [lembur, setLembur] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const getAllLembur = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:2024/api/lembur/getall`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLembur(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllLembur();
  }, []);

  // Search function
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter function for search
  const filterLembur = (lemburData) => {
    return (
      lemburData.tanggalLebur
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      lemburData.jamMulai.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lemburData.jamSelesai.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lemburData.user.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      lemburData.keteranganLembur
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = lembur.slice(indexOfFirstItem, indexOfLastItem);

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
        <div class=" sm:ml-64 content-page container p-8  ml-0 md:ml-64 mt-12">
          <div class="p-4">
            <div class="p-5">
              {/* <!-- Card --> */}
              <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-between">
                  <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Lembur
                  </h6>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="px-3 py-2 border-blue-700 rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Cari lembur..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <hr />
                </div>
                {/* <!-- Tabel --> */}
                <div class="relative overflow-x-auto mt-5">
                  <table
                    id="dataKehadiran"
                    class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                  >
                    {/* <!-- Tabel Head --> */}
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          No
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Nama
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Keterangan Lembur
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Tanggal Lembur
                        </th>
                        <th scope="col" class="px-6 py-3 text-center ">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    {/* <!-- Tabel Body --> */}
                    <tbody class="text-left">
                      {currentItems
                        .filter(filterLembur)
                        .map((lemburData, index) => (
                          <tr
                            key={index}
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {indexOfFirstItem + index + 1}
                            </th>
                            <td class="px-6 py-4">
                              {lemburData.user.username}
                            </td>

                            <td class="px-6 py-4">
                              {lemburData.keteranganLembur}
                            </td>
                            <td class="px-6 py-4">
                              {formatDate(lemburData.tanggalLebur)}
                            </td>
                            <td className="py-3">
                              <div className="flex items-center -space-x-4 ml-12">
                                <a
                                  href={`/admin/detailLembur/${lemburData.id}`}
                                >
                                  <button className="z-30 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-red-50">
                                    <span className="relative inline-block">
                                      <FontAwesomeIcon
                                        icon={faInfo}
                                        className="h-4 w-4"
                                      />
                                    </span>
                                  </button>
                                </a>
                                <a href="" onclick="hapusUser(4)">
                                  <button className="z-30 block rounded-full border-2 border-white bg-yellow-100 p-4 text-yellow-700 active:bg-red-50">
                                    <span className="relative inline-block">
                                      <FontAwesomeIcon
                                        icon={faPrint}
                                        className="h-4 w-4"
                                      />
                                    </span>
                                  </button>
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-4">
                  <ul className="pagination">
                    {Array(Math.ceil(lembur.length / itemsPerPage))
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
      </div>
    </div>
  );
}

export default Lembur;
