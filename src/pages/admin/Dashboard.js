import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faClipboardUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/NavbarAdmin";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";
import SidebarNavbar from "../../components/SidebarNavbar";
import { Pagination } from "flowbite-react";

function Dashboard() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [userData, setUserData] = useState([]);
  const [absenData, setAbsenData] = useState([]);
  const [cutiData, setCutiData] = useState([]);
  const [jabatanData, setJabatanData] = useState([]);
  const [lokasiData, setLokasiData] = useState([]);
  const [organisasiData, setOrganisasiData] = useState([]);
  const [username, setUsername] = useState("");
  const idAdmin = localStorage.getItem("adminId");
  const adminId = localStorage.getItem("adminId");
  const [karyawan, setKaryawan] = useState("");

  const getallUser = async () => {
    try {
      const res = await axios.get(`${API_DUMMY}/api/user/${idAdmin}/users`);
      setKaryawan(res.data.length);
    } catch (error) { }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const addLeadingZero = (num) => (num < 10 ? "0" + num : num);

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

  const fetchData = async (url, setter) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setter(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUser = () =>
    fetchData(`${API_DUMMY}/api/user/byAdmin/${idAdmin}`, setUserData);
  const getAbsensi = () =>
    fetchData(`${API_DUMMY}/api/absensi/admin/${idAdmin}`, setAbsenData);
  const getCuti = () =>
    fetchData(`${API_DUMMY}/api/cuti/admin/${idAdmin}`, setCutiData);
  const getJabatan = () =>
    fetchData(`${API_DUMMY}/api/jabatan/getByAdmin/${adminId}`, setJabatanData);
  const getLokasi = () =>
    fetchData(`${API_DUMMY}/api/lokasi/get-admin/${idAdmin}`, setLokasiData);
  const getOrganisasi = () =>
    fetchData(
      `${API_DUMMY}/api/organisasi/all-by-admin/${idAdmin}`,
      setOrganisasiData
    );

  const getUsername = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("adminId");

    try {
      const response = await axios.get(`${API_DUMMY}/api/admin/getById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

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
    getUser();
    getAbsensi();
    getCuti();
    getUsername();
    getJabatan();
    getLokasi();
    getOrganisasi();
    getallUser();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "true") {
      Swal.fire({
        icon: "success",
        title: "Berhasil masuk!",
      });
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const filteredData = absenData.filter(
      (absenData) =>
        absenData.user?.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        absenData.statusAbsen
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (formatDate(absenData.tanggalAbsen)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false)
    );
    setTotalPages(Math.ceil(filteredData.length / limit));
  }, [searchTerm, limit, absenData]);

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

  const filteredAbsenData = absenData.filter(
    (absenData) =>
      absenData.user?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      absenData.statusAbsen?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (formatDate(absenData.tanggalAbsen)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ??
        false)
  );

  const paginatedAbsenData = filteredAbsenData.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const [searchTerm2, setSearchTerm2] = useState("");
  const [limit2, setLimit2] = useState(5);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [totalPages2, setTotalPages2] = useState(1);

  useEffect(() => {
    const filteredData = cutiData.filter(
      (cutiData) =>
        (cutiData.user?.username
          .toLowerCase()
          .includes(searchTerm2.toLowerCase()) ??
          false) ||
        (cutiData.keperluan
          ?.toLowerCase()
          .includes(searchTerm2.toLowerCase()) ??
          false) ||
        (cutiData.status?.toLowerCase().includes(searchTerm2.toLowerCase()) ??
          false) ||
        (formatDate(cutiData.awalCuti)
          ?.toLowerCase()
          .includes(searchTerm2.toLowerCase()) ??
          false) ||
        (formatDate(cutiData.akhirCuti)
          ?.toLowerCase()
          .includes(searchTerm2.toLowerCase()) ??
          false)
    );
    setTotalPages2(Math.ceil(filteredData.length / limit2));
  }, [searchTerm2, limit2, cutiData]);

  const handleSearch2 = (event) => {
    setSearchTerm2(event.target.value);
  };

  const handleLimitChange2 = (event) => {
    setLimit2(parseInt(event.target.value));
    setCurrentPage2(1); // Reset to the first page when limit changes
  };

  function onPageChange2(page) {
    setCurrentPage2(page);
  }

  const filteredCuti = cutiData.filter(
    (cutiData) =>
      (cutiData.user?.username
        .toLowerCase()
        .includes(searchTerm2.toLowerCase()) ??
        false) ||
      (cutiData.keperluan?.toLowerCase().includes(searchTerm2.toLowerCase()) ??
        false) ||
      (cutiData.status?.toLowerCase().includes(searchTerm2.toLowerCase()) ??
        false) ||
      (formatDate(cutiData.awalCuti)
        ?.toLowerCase()
        .includes(searchTerm2.toLowerCase()) ??
        false) ||
      (formatDate(cutiData.akhirCuti)
        ?.toLowerCase()
        .includes(searchTerm2.toLowerCase()) ??
        false)
  );

  const paginatedCuti = filteredCuti.slice(
    (currentPage2 - 1) * limit2,
    currentPage2 * limit2
  );

  const [searchTerm3, setSearchTerm3] = useState("");
  const [limit3, setLimit3] = useState(5);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [totalPages3, setTotalPages3] = useState(1);

  useEffect(() => {
    const filteredData = jabatanData.filter(
      (jabatan) =>
        jabatan.namaJabatan
          ?.toLowerCase()
          .includes(searchTerm3.toLowerCase()) ||
        jabatan.admin?.username
          ?.toLowerCase()
          .includes(searchTerm3.toLowerCase())
    );
    setTotalPages3(Math.ceil(filteredData.length / limit3));
  }, [searchTerm3, limit3, jabatanData]);

  const handleSearch3 = (event) => {
    setSearchTerm3(event.target.value);
  };

  const handleLimitChange3 = (event) => {
    setLimit3(parseInt(event.target.value));
    setCurrentPage3(1); // Reset to the first page when limit changes
  };

  function onPageChange3(page) {
    setCurrentPage3(page);
  }

  const filteredJabatan = jabatanData.filter(
    (jabatan) =>
      jabatan.namaJabatan?.toLowerCase().includes(searchTerm3.toLowerCase()) ||
      jabatan.admin?.username?.toLowerCase().includes(searchTerm3.toLowerCase())
  );

  const paginatedJabatan = filteredJabatan.slice(
    (currentPage3 - 1) * limit3,
    currentPage3 * limit3
  );

  const [searchTerm4, setSearchTerm4] = useState("");
  const [limit4, setLimit4] = useState(5);
  const [currentPage4, setCurrentPage4] = useState(1);
  const [totalPages4, setTotalPages4] = useState(1);

  useEffect(() => {
    const filteredData = lokasiData.filter(
      (lokasi) =>
        lokasi.namaLokasi?.toLowerCase().includes(searchTerm4.toLowerCase()) ||
        lokasi.alamat?.toLowerCase().includes(searchTerm4.toLowerCase()) ||
        lokasi.organisasi?.namaOrganisasi
          ?.toLowerCase()
          .includes(searchTerm4.toLowerCase())
    );
    setTotalPages4(Math.ceil(filteredData.length / limit4));
  }, [searchTerm4, limit4, lokasiData]);

  const handleSearch4 = (event) => {
    setSearchTerm4(event.target.value);
  };

  const handleLimitChange4 = (event) => {
    setLimit4(parseInt(event.target.value));
    setCurrentPage4(1); // Reset to the first page when limit changes
  };

  function onPageChange4(page) {
    setCurrentPage4(page);
  }

  const filteredLokasi = lokasiData.filter(
    (lokasi) =>
      lokasi.namaLokasi?.toLowerCase().includes(searchTerm4.toLowerCase()) ||
      lokasi.alamat?.toLowerCase().includes(searchTerm4.toLowerCase()) ||
      lokasi.organisasi?.namaOrganisasi
        ?.toLowerCase()
        .includes(searchTerm4.toLowerCase())
  );

  const paginatedLokasi = filteredLokasi.slice(
    (currentPage4 - 1) * limit4,
    currentPage4 * limit4
  );

  const [searchTerm5, setSearchTerm5] = useState("");
  const [limit5, setLimit5] = useState(5);
  const [currentPage5, setCurrentPage5] = useState(1);
  const [totalPages5, setTotalPages5] = useState(1);

  useEffect(() => {
    const filteredData = organisasiData.filter(
      (organisasi) =>
        organisasi.namaOrganisasi
          ?.toLowerCase()
          .includes(searchTerm5.toLowerCase()) ||
        organisasi.alamat?.toLowerCase().includes(searchTerm5.toLowerCase()) ||
        organisasi.nomerTelepon
          ?.toLowerCase()
          .includes(searchTerm5.toLowerCase()) ||
        organisasi.emailOrganisasi
          ?.toLowerCase()
          .includes(searchTerm5.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredData.length / limit5));
  }, [searchTerm5, limit5, organisasiData]);

  const handleSearch5 = (event) => {
    setSearchTerm5(event.target.value);
  };

  const handleLimitChange5 = (event) => {
    setLimit5(parseInt(event.target.value));
    setCurrentPage5(1); // Reset to the first page when limit changes
  };

  function onPageChange5(page) {
    setCurrentPage5(page);
  }

  const filteredOrganisasi = organisasiData.filter(
    (organisasi) =>
      organisasi.namaOrganisasi
        ?.toLowerCase()
        .includes(searchTerm5.toLowerCase()) ||
      organisasi.alamat?.toLowerCase().includes(searchTerm5.toLowerCase()) ||
      organisasi.nomerTelepon
        ?.toLowerCase()
        .includes(searchTerm5.toLowerCase()) ||
      organisasi.emailOrganisasi
        ?.toLowerCase()
        .includes(searchTerm5.toLowerCase())
  );

  const paginatedOrganisasi = filteredOrganisasi.slice(
    (currentPage5 - 1) * limit5,
    currentPage5 * limit5
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <SidebarNavbar />
      </div>
      <div className="flex h-full">
        <div className="sticky top-16 z-40">
          <Navbar />
        </div>
        <div className="content-page container p-8 ml-0 md:ml-64 mt-10">
          <div className="mt-5 w-full">
            <div className="p-4 text-center bg-indigo-300 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 capitalize">
                Selamat Datang di Absensi
                <span> @{username}</span>
              </h2>
              <a className="profile-menu-link">{day}, </a>
              <a className="profile-menu-link active">{date} - </a>
              <a className="profile-menu-link">{time}</a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-12">
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">User</p>
                  <p className="text-lg">Jumlah User</p>
                  <p className="text-lg">{userData.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faUsers} size="2x" />
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Absensi</p>
                  <p className="text-lg">Jumlah Absen</p>
                  <p className="text-lg">{absenData.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faClipboardUser} size="2x" />
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-indigo-500 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Cuti</p>
                  <p className="text-lg">Jumlah Cuti</p>
                  <p className="text-lg">{cutiData.length}</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faCalendarDays} size="2x" />
                </div>
              </div>
            </div>
          </div>

          <br />

          {/* Tabel Absensi */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-bold mb-4 md:mb-0">
                History Absensi
              </h2>
              <div className="flex items-center gap-2 mt-2">
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
            <hr className="mt-3" />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Jam Masuk
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Jam Pulang
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Kehadiran
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredAbsenData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4">
                        Tidak ada data yang ditampilkan
                      </td>
                    </tr>
                  ) : (
                    paginatedAbsenData
                      .slice()
                      .reverse()
                      .map((absen, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            {(currentPage - 1) * limit + index + 1}
                          </th>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {absen.user.username}
                          </td>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {formatDate(absen.tanggalAbsen)}
                          </td>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {absen.jamMasuk || "-"}
                          </td>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {absen.jamPulang || "-"}
                          </td>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {absen.statusAbsen}
                          </td>
                        </tr>
                      ))
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
              previousLabel=""
              nextLabel=""
            />
          </div>
          <br />
          {/* Tabel Cuti */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-bold mb-4 md:mb-0">History Cuti</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="relative w-64">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm2}
                    onChange={handleSearch2}
                    className="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
                    required
                  />
                </div>
                <select
                  value={limit2}
                  onChange={handleLimitChange2}
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <hr className="mt-3" />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Awal Cuti
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Akhir Cuti
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredCuti.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4">
                        Tidak ada data yang ditampilkan
                      </td>
                    </tr>
                  ) : (
                    paginatedCuti
                      .slice()
                      .reverse()
                      .map((cuti, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {(currentPage2 - 1) * limit2 + index + 1}
                          </th>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {cuti.user.username}
                          </td>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {formatDate(cuti.awalCuti)}
                          </td>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {formatDate(cuti.akhirCuti)}
                          </td>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {cuti.status}
                          </td>
                        </tr>
                      ))
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
              previousLabel=""
              nextLabel=""
            />
          </div>
          <br />
          {/* Tabel Jabatan */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-bold mb-4 md:mb-0">Data Jabatan</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="relative w-64">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm3}
                    onChange={handleSearch3}
                    className="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
                    required
                  />
                </div>
                <select
                  value={limit3}
                  onChange={handleLimitChange3}
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <hr className="mt-3" />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Jabatan
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredJabatan.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="px-6 py-4">
                        Tidak ada data yang ditampilkan
                      </td>
                    </tr>
                  ) : (
                    paginatedJabatan
                      .slice()
                      .reverse()
                      .map((jabatan, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {(currentPage3 - 1) * limit3 + index + 1}
                          </th>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {jabatan.namaJabatan}
                          </td>
                        </tr>
                      ))
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
              previousLabel=""
              nextLabel=""
            />
          </div>

          <br />

          {/* Tabel Lokasi */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-bold mb-4 md:mb-0">Data Lokasi</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="relative w-64">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm4}
                    onChange={handleSearch4}
                    className="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
                    required
                  />
                </div>
                <select
                  value={limit4}
                  onChange={handleLimitChange4}
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <hr className="mt-3" />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Nama Lokasi
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Alamat
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Jumlah Karyawan
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Organisasi
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredLokasi.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4">
                        Tidak ada data yang ditampilkan
                      </td>
                    </tr>
                  ) : (
                    paginatedLokasi
                      .slice()
                      .reverse()
                      .map((lokasi, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {(currentPage4 - 1) * limit4 + index + 1}
                          </th>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {lokasi.namaLokasi}
                          </td>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {lokasi.alamat}
                          </td>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {karyawan}
                          </td>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {lokasi.organisasi.namaOrganisasi}
                          </td>
                        </tr>
                      ))
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
              previousLabel=""
              nextLabel=""
            />
          </div>

          <br />

          {/* Tabel Organisasi */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-bold mb-4 md:mb-0">
                Data Organisasi
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="relative w-64">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm5}
                    onChange={handleSearch5}
                    className="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
                    required
                  />
                </div>
                <select
                  value={limit5}
                  onChange={handleLimitChange5}
                  className="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="5">05</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <hr className="mt-3" />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Nama Organisasi
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Alamat
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredOrganisasi.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-4">
                        Tidak ada data yang ditampilkan
                      </td>
                    </tr>
                  ) : (
                    paginatedOrganisasi
                      .slice()
                      .reverse()
                      .map((organisasi, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {(currentPage5 - 1) * limit5 + index + 1}
                          </th>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {organisasi.namaOrganisasi}
                          </td>
                          <td className="px-6 py-4 capitalize whitespace-nowrap">
                            {organisasi.alamat}
                          </td>
                        </tr>
                      ))
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
              previousLabel=""
              nextLabel=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
