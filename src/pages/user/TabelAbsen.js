import React, { useState } from "react";
import Navbar from "../../components/NavbarUser";
import Sidebar from "../../components/SidebarUser";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faInfo, faUserPlus } from "@fortawesome/free-solid-svg-icons";

function TabelAbsen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
          <div className="tabel-absen mt-12 bg-white p-5 rounded-xl shadow-xl border border-gray-300">
            <h2 className="text-xl font-bold">History Absensi</h2>
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
                      Tanggal
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Jam Masuk
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Jam Pulang
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Keterangan
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Kehadiran
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
                    {/* {guruData.nama} */}22 April 2024
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {/* {guruData.nama} */}07.30
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {/* {guruData.nama} */}00.00
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {/* {guruData.nama} */}-
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {/* {guruData.jabatan} */}Terlambat
                  </td>
                  <td className="whitespace-nowrap text-center py-3">
                    <div className="flex items-center -space-x-4 ml-12">
                      <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                        <span className="relative inline-block">
                          <FontAwesomeIcon icon={faInfo} className="h-4 w-4" />
                        </span>
                      </button>

                      <button className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 active:bg-red-50">
                        <span className="relative inline-block">
                          <FontAwesomeIcon
                            className="h-4 w-4"
                            icon={faUserPlus}
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

export default TabelAbsen;
