import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarDays,
  faCircleXmark,
  faClockFour,
} from "@fortawesome/free-regular-svg-icons";
import Navbar from "../../components/NavbarUser";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Fungsi untuk memperbarui waktu saat ini setiap detik
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Bersihkan interval setelah komponen unmount
    return () => clearInterval(interval);
  }, []); // Kita hanya ingin menggunakan efek ini sekali saat komponen dimuat

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
        <div className="content-page container p-8 min-h-screen ml-0 md:ml-64 mt-12">
          <h1 className="judul text-3xl font-semibold text-center">
            Selamat Datang
          </h1>
          <p className="text-lg text-center mt-2">
            <strong>
              {currentDateTime.toLocaleDateString("id-ID", { weekday: "long" })}
            </strong>{" "}
            <strong>
              {currentDateTime.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </strong>{" "}
            <strong>
              {currentDateTime.toLocaleTimeString("id-ID", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </strong>
            .
          </p>
          <div className="mt-12 bg-slate-200 p-5 rounded-xl shadow-xl">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-12">
              {/* Ubah class untuk lebar saat di mode desktop */}
              <div className="pl-2 h-32 bg-green-400 rounded-lg shadow-md md:w-auto">
                <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                  <div className="my-auto">
                    <p className="font-bold">Masuk</p>
                    <p className="text-lg">Absen masuk.</p>
                  </div>
                  <div className="my-auto">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" />
                  </div>
                </div>
              </div>
              <div className="pl-2 h-32 bg-red-400 rounded-lg shadow-md md:w-auto">
                <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                  <div className="my-auto">
                    <p className="font-bold">Pulang</p>
                    <p className="text-lg">Absen pulang.</p>
                  </div>
                  <div className="my-auto">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" />
                    {/* Menggunakan properti size untuk memperbesar ikon */}
                  </div>
                </div>
              </div>
              <Link to="/user/izin">
                <div className="pl-2 h-32 bg-red-800 rounded-lg shadow-md md:w-auto">
                  <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                    <div className="my-auto">
                      <p className="font-bold">Izin</p>
                      <p className="text-lg">Ajukan Izin.</p>
                    </div>
                    <div className="my-auto">
                      <FontAwesomeIcon icon={faCircleXmark} size="2x" />
                      {/* Menggunakan properti size untuk memperbesar ikon */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex justify-center mt-3 gap-4 flex-col md:flex-row">
              <Link to="/user/cuti">
                <div className="pl-2 h-32 w-full md:w-80 bg-blue-400 rounded-lg shadow-md md:mr-20 cursor-pointer">
                  <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                    <div className="my-auto">
                      <p className="font-bold">Cuti</p>
                      <p className="text-lg">Ajukan cuti.</p>
                    </div>
                    <div className="my-auto">
                      <FontAwesomeIcon icon={faCalendarDays} size="2x" />{" "}
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/user/lembur">
                <div className="pl-2 h-32 w-full md:w-80 bg-yellow-400 rounded-lg shadow-md md:ml-0 mt-4 md:mt-0 cursor-pointer">
                  <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                    <div className="my-auto">
                      <p className="font-bold">Lembur</p>
                      <p className="text-lg">Ajukan lembur.</p>
                    </div>
                    <div className="my-auto">
                      <FontAwesomeIcon icon={faClockFour} size="2x" />{" "}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-12">
            <div className="bg-green-400 rounded-lg shadow-md p-4 md:w-full lg:w-auto">
              {" "}
              {/* Ubah lebar saat di mode ponsel */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-lg">Total Absen</p>
                  <p className="text-white text-md">
                    Jumlah absen yang tercatat
                  </p>
                </div>
                <div className="text-white text-2xl font-semibold">100</div>
              </div>
            </div>
            <div className="bg-red-800 rounded-lg shadow-md p-4 md:w-full lg:w-auto">
              {" "}
              {/* Ubah lebar saat di mode ponsel */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-lg">Total Izin</p>
                  <p className="text-white text-md">
                    Jumlah izin yang diajukan
                  </p>
                </div>
                <div className="text-white text-2xl font-semibold">2</div>
              </div>
            </div>
          </div>

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
                      Kehadiran
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
                    {/* {guruData.jabatan} */}Terlambat
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
          <div className="tabel-cuti mt-12 bg-white p-5 rounded-xl shadow-xl border border-gray-300">
            <h2 className="text-xl font-bold">Permohonan Cuti</h2>
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
                      Keperluan Cuti
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
                    {/* {guruData.nama} */}Menikah
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

export default Dashboard;
