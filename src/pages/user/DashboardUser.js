import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowRightFromBracket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarDays,
  faCircleXmark,
  faClockFour,
} from "@fortawesome/free-regular-svg-icons";
import Navbar from "../../components/NavbarUser";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";
import SidebarNavbar from "../../components/SidebarNavbar";
import { Pagination } from "flowbite-react";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [username, setUsername] = useState({});
  const [absensi, setAbsensi] = useState([]);
  const [cuti, setCuti] = useState([]);
  const [izin, setIzin] = useState([]);
  const [totalIzin, setTotalIzin] = useState(0);
  const [isAbsenMasuk, setIsAbsenMasuk] = useState(false);
  const [isPulangDisabled, setIsPulangDisabled] = useState(false);
  const [isIzinDisabled, setIsIzinDisabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [limit1, setLimit1] = useState(5);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [totalPages1, setTotalPages1] = useState(1);

  const getUsername = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/user/getUserBy/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsername(response.data);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const cekAbsensi = async () => {
    const userId = localStorage.getItem("userId");

    try {
      // Cek apakah pengguna sudah melakukan absensi hari ini
      const absensiCheckResponse = await axios.get(
        `${API_DUMMY}/api/absensi/checkAbsensi/${userId}`
      );
      const isUserAlreadyAbsenToday =
        absensiCheckResponse.data ===
        "Pengguna sudah melakukan absensi hari ini.";
      console.log("Is User Already Absen Today:", isUserAlreadyAbsenToday);

      // Cek apakah pengguna sudah mengambil izin hari ini
      const izinCheckResponse = await axios.get(
        `${API_DUMMY}/api/absensi/cheskIzin/${userId}`
      );
      const hasTakenLeave =
        izinCheckResponse.data === "Pengguna sudah melakukan izin.";
      console.log("Has taken leave:", hasTakenLeave);

      // Mengambil status absen dari API untuk memeriksa "Izin Tengah Hari"
      const statusAbsenResponse = await axios.get(
        `${API_DUMMY}/api/absensi/getByUserId/${userId}`
      );
      const absensiData = statusAbsenResponse.data;

      // Asumsi respons adalah array, cek apakah ada data absensi
      if (absensiData.length > 0) {
        const statusAbsen = absensiData[0].statusAbsen;
        console.log("Status Absen:", statusAbsen);

        // Cek apakah status absen adalah "Izin Tengah Hari"
        const hasIzinTengahHari = statusAbsen === "Izin Tengah Hari";

        // Disable tombol Pulang jika terdapat Izin Tengah Hari atau sudah melakukan izin
        setIsPulangDisabled(hasIzinTengahHari || hasTakenLeave);

        // Disable tombol Izin jika terdapat Izin Tengah Hari atau pengguna sudah melakukan absensi dan izin pada hari yang sama
        setIsIzinDisabled(
          hasIzinTengahHari || (isUserAlreadyAbsenToday && hasTakenLeave)
        );
      } else {
        console.log("Tidak ada data absensi yang ditemukan.");
      }

      // Set the 'Absen Masuk' status
      setIsAbsenMasuk(isUserAlreadyAbsenToday);
    } catch (error) {
      console.error("Error checking absensi or izin:", error);
    }
  };

  const getIzin = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/getizin/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIzin(response.data);
      setTotalIzin(response.data.length);
    } catch (error) {
      console.error("Error fetching izin:", error);
    }
  };

  const getAbsensi = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/absensi/getByUserId/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAbsensi(response.data);
    } catch (error) {
      console.error("Error fetching absensi:", error);
    }
  };

  const getCuti = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `${API_DUMMY}/api/cuti/getByUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCuti(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    getUsername();
    getAbsensi();
    getCuti();
    getIzin();
    cekAbsensi();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setUsername(username); // Setelah mendapatkan respons, atur username
  }, [username]); // Tambahkan username sebagai dependensi

  // Fungsi untuk menambah nol di depan angka jika angka kurang dari 10
  const addLeadingZero = (num) => {
    return num < 10 ? "0" + num : num;
  };

  // Mendapatkan informasi hari, tanggal, dan waktu
  const day = currentDateTime.toLocaleDateString("id-ID", { weekday: "long" });
  const date = currentDateTime.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time =
    addLeadingZero(currentDateTime.getHours()) +
    ":" +
    addLeadingZero(currentDateTime.getMinutes()) +
    ":" +
    addLeadingZero(currentDateTime.getSeconds());

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to format date in Indonesian
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "true") {
      Swal.fire({
        icon: "success",
        title: "Berhasil masuk!",
      });
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  useEffect(() => {
    const filteredData = absensi.filter(
      (absenData) =>
        (absenData.statusAbsen
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false) ||
        (formatDate(absenData.tanggalAbsen)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false)
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

  const filteredAbsen = absensi.filter(
    (absenData) =>
      (absenData.statusAbsen
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ??
        false) ||
      (formatDate(absenData.tanggalAbsen)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ??
        false)
  );

  // Reverse the filtered array before slicing for pagination
  const paginatedAbsen = filteredAbsen
    .reverse()
    .slice((currentPage - 1) * limit, currentPage * limit);

  useEffect(() => {
    const filteredData = cuti.filter(
      (item) =>
        item.keperluan?.toLowerCase().includes(searchTerm1.toLowerCase()) ??
        false
    );
    setTotalPages1(Math.ceil(filteredData.length / limit1));
  }, [searchTerm1, limit1, cuti]);

  const handleSearch1 = (event) => {
    setSearchTerm1(event.target.value);
  };

  const handleLimitChange1 = (event) => {
    setLimit1(parseInt(event.target.value));
    setCurrentPage1(1); // Reset to the first page when limit changes
  };

  function onPageChange1(page) {
    setCurrentPage1(page);
  }

  const filteredCuti = cuti.filter(
    (item) =>
      item.keperluan?.toLowerCase().includes(searchTerm1.toLowerCase()) ?? false
  );

  // Reverse the filtered array before slicing for pagination
  const paginatedCuti = filteredCuti
    .reverse()
    .slice((currentPage - 1) * limit1, currentPage1 * limit1);

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <SidebarNavbar />
      </div>
      <div className="flex h-full">
        <div className="sticky top-16 z-40">
          <Navbar />
        </div>
        <div className="content-page container p-8 min-h-screen ml-0 md:ml-64 mt-5">
          <div className="mt-12 bg-slate-200 p-5 rounded-xl shadow-xl">
            <h1 className="judul text-3xl font-semibold text-center capitalize">
              Selamat Datang @{username.username}
            </h1>

            <div className="text-lg text-center mt-2 text-black">
              {day}, {date} - {time}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-7">
              <Link to={isAbsenMasuk ? "#" : "/user/absen"}>
                <div
                  className={`pl-2 h-24 rounded-lg shadow-md md:w-auto ${
                    isAbsenMasuk
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500"
                  }`}
                >
                  <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                    <div className="my-auto">
                      <p
                        className={`font-bold ${
                          isAbsenMasuk ? "text-gray-400" : "text-black"
                        }`}
                      >
                        Masuk
                      </p>
                      <p
                        className={`text-lg ${
                          isAbsenMasuk ? "text-gray-400" : "text-black"
                        }`}
                      >
                        Absen Masuk.
                      </p>
                    </div>
                    <div
                      className={`my-auto ${
                        isAbsenMasuk ? "text-gray-400" : "text-black"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        size="2x"
                      />
                    </div>
                  </div>
                </div>
              </Link>

              <Link to={isPulangDisabled ? "#" : "/user/pulang"}>
                <div
                  className={`pl-2 h-24 rounded-lg shadow-md md:w-auto ${
                    isPulangDisabled
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-500"
                  }`}
                >
                  <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                    <div className="my-auto">
                      <p
                        className={`font-bold ${
                          isPulangDisabled ? "text-gray-400" : "text-black"
                        }`}
                      >
                        Pulang
                      </p>
                      <p
                        className={`text-lg ${
                          isPulangDisabled ? "text-gray-400" : "text-black"
                        }`}
                      >
                        Absen Pulang.
                      </p>
                    </div>
                    <div
                      className={`my-auto ${
                        isPulangDisabled ? "text-gray-400" : "text-black"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        size="2x"
                      />
                    </div>
                  </div>
                </div>
              </Link>

              <Link to={isIzinDisabled ? "#" : "/user/izin"}>
                <div
                  className={`pl-2 h-24 rounded-lg shadow-md md:w-auto ${
                    isIzinDisabled
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-orange-500"
                  }`}
                >
                  <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                    <div className="my-auto">
                      <p
                        className={`font-bold ${
                          isIzinDisabled ? "text-gray-400" : "text-black"
                        }`}
                      >
                        Izin
                      </p>
                      <p
                        className={`text-lg ${
                          isIzinDisabled ? "text-gray-400" : "text-black"
                        }`}
                      >
                        Permohonan Izin.
                      </p>
                    </div>
                    <div
                      className={`my-auto ${
                        isIzinDisabled ? "text-gray-400" : "text-black"
                      }`}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} size="2x" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* <Link to="/user/pulang">
                <div className="pl-2 h-24 bg-green-500 rounded-lg shadow-md md:w-auto">
                  <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                    <div className="my-auto">
                      <p className="font-bold text-black">Pulang</p>
                      <p className="text-lg text-black">Absen pulang.</p>
                    </div>
                    <div className="my-auto text-black">
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        size="2x"
                      />
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/user/izin">
                <div className="pl-2 h-24 bg-red-500 rounded-lg shadow-md md:w-auto">
                  <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                    <div className="my-auto">
                      <p className="font-bold text-black">Izin</p>
                      <p className="text-lg text-black">Ajukan Izin.</p>
                    </div>
                    <div className="my-auto text-black">
                      <FontAwesomeIcon icon={faCircleXmark} size="2x" />
                    </div>
                  </div>
                </div>
              </Link> */}
            </div>

            <div className="flex justify-center mt-3 gap-4 flex-col md:flex-row">
              <Link to="/user/cuti">
                <div className="pl-2 h-24 w-full md:w-80 bg-red-400 rounded-lg shadow-md md:mr-20 cursor-pointer">
                  <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                    <div className="my-auto">
                      <p className="font-bold text-black">Cuti</p>
                      <p className="text-lg text-black">Ajukan cuti.</p>
                    </div>
                    <div className="my-auto text-black">
                      <FontAwesomeIcon icon={faCalendarDays} size="2x" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/user/lembur">
                <div className="pl-2 h-24 w-full md:w-80 bg-yellow-300 rounded-lg shadow-md md:ml-0 mt-4 md:mt-0 cursor-pointer">
                  <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                    <div className="my-auto">
                      <p className="font-bold text-black">Lembur</p>
                      <p className="text-lg text-black">Ajukan lembur.</p>
                    </div>
                    <div className="my-auto text-black">
                      <FontAwesomeIcon icon={faClockFour} size="2x" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-12">
            <div className="bg-blue-500 rounded-lg shadow-md p-4 md:w-full lg:w-auto">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-lg">Total Absen</p>
                  <p className="text-white text-md">
                    Jumlah absen yang tercatat
                  </p>
                </div>
                <div className="text-white text-2xl font-semibold">
                  {absensi.length}
                </div>
              </div>
            </div>

            <div className="bg-red-500 rounded-lg shadow-md p-4 md:w-full lg:w-auto">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-lg">Total Izin</p>
                  <p className="text-white text-md">
                    Jumlah izin yang diajukan
                  </p>
                </div>
                <div className="text-white text-2xl font-semibold">
                  {totalIzin}
                </div>
              </div>
            </div>
          </div>

          <div className="tabel-absen mt-12 bg-blue-100 p-5 rounded-xl shadow-xl border border-gray-300 text-center">
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-bold mb-4 md:mb-0">
                History Absensi
              </h2>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <div className="relative w-full md:w-64">
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
            <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
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
                      KEHADIRAN
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {paginatedAbsen.length > 0 ? (
                    paginatedAbsen.map((absenData, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                          {(currentPage - 1) * limit + index + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center capitalize">
                          {formatDate(absenData.tanggalAbsen)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center capitalize">
                          {absenData.statusAbsen}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        Tidak ada data yang ditampilkan
                      </td>
                    </tr>
                  )}
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
            <div className="flex justify-end mt-5">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => (window.location.href = "/user/history_absen")}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>

          <div className="tabel-cuti mt-12 bg-blue-100 p-5 rounded-xl shadow-xl border border-gray-300 text-center">
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-bold mb-4 md:mb-0">
                Permohonan Cuti
              </h2>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <div className="relative w-full md:w-64">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm1}
                    onChange={handleSearch1}
                    className="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
                    required
                  />
                </div>
                <select
                  value={limit1}
                  onChange={handleLimitChange1}
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border border-gray-300">
                <thead className="text-left text-white bg-blue-500">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-center">
                      NO
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-center">
                      KEPERLUAN CUTI
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {paginatedCuti.length > 0 ? (
                    paginatedCuti.map((item, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                          {(currentPage1 - 1) * limit1 + index + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center capitalize">
                          {item.keperluan}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-4">
                        Tidak ada data yang ditampilkan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              className="mt-5"
              layout="table"
              currentPage={currentPage1}
              totalPages={totalPages1}
              onPageChange={onPageChange1}
              showIcons
            />
            <div className="flex justify-end mt-5">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => (window.location.href = "/user/history_cuti")}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
