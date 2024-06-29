import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPrint, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

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
    if (!lemburData) return false; 
    
    const { tanggalLebur, jamMulai, jamSelesai, user, keteranganLembur } = lemburData;
    
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    return (
      (tanggalLebur && tanggalLebur.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (jamMulai && jamMulai.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (jamSelesai && jamSelesai.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (user && user.username.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (keteranganLembur && keteranganLembur.toLowerCase().includes(lowerCaseSearchTerm))
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

  const generatePdf = async (id) => {
    const token = localStorage.getItem("token");
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda ingin mengunduh file PDF?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Unduh!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios({
            url: `http://localhost:2024/api/lembur/download-pdf/${id}`,
            method: 'GET',
            responseType: 'blob', 
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Surat Lembur.pdf');
          document.body.appendChild(link);
          link.click();
  
          Swal.fire("Berhasil", "Berhasil Mengunduh Pdf", "success");
        } catch (error) {
          console.log(error);
          Swal.fire("Gagal", "Gagal Mengunduh Pdf", "error");
        }
      } else {
        Swal.fire("Dibatalkan", "Pengunduhan dibatalkan", "info");
      }
    });
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
        <div className=" sm:ml-64 content-page container p-8  ml-0 md:ml-64 mt-12">
          <div className="p-4">
            <div className="p-5">
              {/* <!-- Card --> */}
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
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
                <div className="relative overflow-x-auto mt-5">
                  <table
                    id="dataKehadiran"
                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                  >
                    {/* <!-- Tabel Head --> */}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Nama
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Keterangan Lembur
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tanggal Lembur
                        </th>
                        <th scope="col" className="px-6 py-3 text-center ">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    {/* <!-- Tabel Body --> */}
                    <tbody className="text-left">
                      {currentItems
                        .filter(filterLembur)
                        .map((lemburData, index) => (
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
                            <td className="px-6 py-4">
                              {lemburData.user.username}
                            </td>

                            <td className="px-6 py-4">
                              {lemburData.keteranganLembur}
                            </td>
                            <td className="px-6 py-4">
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
                                <button
                                  type="button"
                                  onClick={(e) => generatePdf(lemburData.id)}
                                >
                                  <button className="z-30 block rounded-full border-2 border-white bg-yellow-100 p-4 text-yellow-700 active:bg-red-50">
                                    <span className="relative inline-block">
                                      <FontAwesomeIcon
                                        icon={faPrint}
                                        className="h-4 w-4"
                                      />
                                    </span>
                                  </button>
                                </button>
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
