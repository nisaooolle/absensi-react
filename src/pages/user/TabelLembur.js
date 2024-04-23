import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Navbar from "../../components/NavbarUser";
import Sidebar from "../../components/SidebarUser";
import Swal from "sweetalert2";

function TabelLembur() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const BatalLembur = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Batalkan lembur!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Tambahkan logika untuk aksi setelah dikonfirmasi
        console.log("Lembur dibatalkan!");
      }
    });
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar isOpen={sidebarOpen} />
        </div>
        <div className="content-page container p-8 min-h-screen ml-0 md:ml-64 mt-5">
          <div className="tabel-lembur mt-12 bg-white p-5 rounded-xl shadow-xl border border-gray-300">
            <h2 className="text-xl font-bold">History Lembur</h2>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                {/* <FontAwesomeIcon
          icon={faSearch}
          className="mr-2 text-gray-500"
        /> */}
                <input
                  // type="text"
                  // placeholder="Cari guru..."
                  // value={searchTerm1}
                  // onChange={handleSearch1}
                  className="px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border border-gray-300">
                <thead className="text-left">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      No
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Keterangan Lembur
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Jam Mulai
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Jam Selesai
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Tanggal Lembur
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {/* {currentItems.map((guruData, index) => ( */}
                  {/* <tr key={index}> */}
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    {/* {indexOfFirstItem + index + 1} */}1
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {/* {guruData.nama} */}Tugas baru
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {/* {guruData.nama} */}17.00
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {/* {guruData.nama} */}20.00
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {/* {guruData.nama} */}23 Februari 2024
                  </td>
                  <td className="whitespace-nowrap text-center py-3">
                    <div className="flex items-center -space-x-4 ml-12">
                      <button
                        className="z-20 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 active:bg-blue-50"
                        onClick={BatalLembur} // Pemanggilan fungsi saat tombol ditekan
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
                  {/* </tr> */}
                  {/* ))} */}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              <ul className="pagination">
                {/* {Array(Math.ceil(guru.length / itemsPerPage))
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
          ))} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabelLembur;
