import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/SidebarUser";
import Navbar from "../../../components/NavbarUser";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function TabelCuti() {
  const [cuti, setCuti] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getAllCuti = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `http://localhost:2024/api/cuti/getByUser/${userId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setCuti(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const BatalCuti = async (id) => {
    const token = localStorage.getItem("token");

    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin membatalkan cuti ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:2024/api/cuti/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setCuti((prevCuti) => prevCuti.filter((item) => item.id !== id)); // Menghapus item dari state tanpa reload halaman
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Berhasil Menghapus!!",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      }
    });
  };

  useEffect(() => {
    getAllCuti();
  }, []);

  // Search function
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter function for search
  const filterCuti = (cutiData) => {
    return (
      cutiData.awalCuti.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cutiData.akhirCuti.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cutiData.masukKerja.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cutiData.keperluan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cuti.slice(indexOfFirstItem, indexOfLastItem);

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
          <div className="tabel-cuti bg-white p-5 rounded-xl shadow-xl border border-gray-300">
            <h2 className="text-xl font-bold">History Cuti</h2>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="mr-2 text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Cari cuti..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border border-gray-300 mt-4">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    NO
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    CUTI DARI
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    SAMPAI
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    MASUK KERJA
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    KEPERLUAN
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    STATUS
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.filter(filterCuti).map((cutiData, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {formatDate(cutiData.awalCuti)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {formatDate(cutiData.akhirCuti)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {formatDate(cutiData.masukKerja)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {cutiData.keperluan}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {cutiData.status}
                    </td>
                    <td className="whitespace-nowrap text-center py-3">
                      <div className="flex items-center -space-x-4 ml-12">
                        <button
                          className="z-20 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 active:bg-blue-50"
                          onClick={() => BatalCuti(cutiData.id)} // Pemanggilan fungsi saat tombol ditekan dengan meneruskan ID cuti
                        >
                          <span className="relative inline-block">
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              className="h-4 w-4"
                            />
                          </span>
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
              {Array(Math.ceil(cuti.length / itemsPerPage))
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => setCurrentPage(index + 1)}
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
  );
}

export default TabelCuti;
