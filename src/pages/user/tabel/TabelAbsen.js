import React, { useState } from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function TabelAbsen() {
  const [absensi, setAbsensi] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            Authorization: `${token}`,
          },
        }
      );

      setAbsensi(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
          {" "}
          {/* Tambahkan margin ke atas di sini */}
          <div className="tabel-absen bg-white p-5 rounded-xl shadow-xl border border-gray-300">
            <h2 className="text-xl font-bold">History Absensi</h2>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <input className="px-3 py-2 border rounded-md" />
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border border-gray-300">
                <thead className="text-left">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      NO
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      TANGGAL
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      JAM MASUK
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      JAM PULANG
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      KETERANGAN
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      KEHADIRAN
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      AKSI
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    1
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    22 April 2024
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    07.30
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    00.00
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    -
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    Terlambat
                  </td>
                  <td className="whitespace-nowrap text-center py-3">
                    <div className="flex items-center -space-x-4 ml-12">
                      <Link to="/user/detail_absen">
                        <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                          <span className="relative inline-block">
                            <FontAwesomeIcon
                              icon={faInfo}
                              className="h-4 w-4"
                            />
                          </span>
                        </button>
                      </Link>
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
                    </div>
                  </td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabelAbsen;
