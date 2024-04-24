import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faBusinessTime,
  faChevronDown,
  faChevronUp,
  faClock,
  faCube,
  faDatabase,
  faSignal,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Sidebar = () => {
  const role = localStorage.getItem("role");
  // State untuk mengelola status dropdown
  const [masterDataOpen, setMasterDataOpen] = useState(false);
  const [rekapanOpen, setRekapanOpen] = useState(false);
  const [absenOpen, setAbsenOpen] = useState(false);

  // Fungsi untuk menampilkan atau menyembunyikan dropdown master data
  const toggleMasterData = () => {
    setMasterDataOpen(!masterDataOpen);
  };

  // Fungsi untuk menampilkan atau menyembunyikan dropdown rekapan
  const toggleRekapan = () => {
    setRekapanOpen(!rekapanOpen);
  };

  // Fungsi untuk menampilkan atau menyembunyikan dropdown absen
  const toggleAbsen = () => {
    setAbsenOpen(!absenOpen);
  };

  function logout() {
    // Tampilkan SweetAlert2 konfirmasi sebelum logout
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Hapus item dari local storage saat logout
        localStorage.removeItem("token");
        // Tampilkan pesan berhasil logout
        Swal.fire({
          title: "Logout Berhasil",
          text: "Anda telah berhasil logout.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          // Redirect ke halaman login setelah menekan tombol OK
          window.location.href = "/";
        });
      }
    });
  }

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {role === "ADMIN" && (
            <ul>
              <li>
                <a
                  href="/admin/dashboard"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    icon={faCube}
                  />
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              {/* // <!-- Dropdown Master Data --> */}
              <li>
                <button
                  type="button"
                  class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  // aria-controls="dropdown-masterdata"
                  // data-dropdown-toggle="dropdown-masterdata"
                  onClick={toggleMasterData}
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    icon={faDatabase}
                  />
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">
                    Master Data
                  </span>
                  <FontAwesomeIcon
                    icon={masterDataOpen ? faChevronUp : faChevronDown}
                    className="flex-shrink-0 w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                </button>
                <ul
                  // id="dropdown-masterdata"
                  className={`${
                    masterDataOpen ? "" : "hidden" // Tampilkan atau sembunyikan dropdown berdasarkan state masterDataOpen
                  } py-2 space-y-2`}
                >
                  {/* <!-- Menu Karyawan --> */}
                  <li>
                    <a
                      href=""
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-users-gear fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">
                        Karyawan
                      </span>
                    </a>
                  </li>

                  {/* <!-- Menu Jabatan --> */}
                  <li>
                    <a
                      href="https://demo-absen.excellentsistem.com/admin/jabatan"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-briefcase fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">Jabatan</span>
                    </a>
                  </li>

                  {/* <!-- Menu Jam Kerja --> */}
                  <li>
                    <a
                      href="https://demo-absen.excellentsistem.com/admin/shift"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-business-time fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">Shift</span>
                    </a>
                  </li>

                  {/* <!-- Menu Lokasi --> */}
                  <li>
                    <a
                      href="https://demo-absen.excellentsistem.com/admin/lokasi"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-map-location-dot fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">Lokasi</span>
                    </a>
                  </li>

                  {/* <!-- Menu Organisasi --> */}
                  <li>
                    <a
                      href="https://demo-absen.excellentsistem.com/admin/all_organisasi"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-building fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">
                        Organisasi
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* <!-- Dropdown Rekapan --> */}
              <li>
                <button
                  type="button"
                  class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  // aria-controls="dropdown-example"
                  // data-collapse-toggle="dropdown-example"
                  onClick={toggleRekapan}
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    icon={faSignal}
                  />
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">
                    Rekapan
                  </span>
                  <FontAwesomeIcon
                    icon={rekapanOpen ? faChevronUp : faChevronDown}
                    className="flex-shrink-0 w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                </button>

                <ul
                  // id="dropdown-masterdata"
                  className={`${
                    rekapanOpen ? "" : "hidden" // Tampilkan atau sembunyikan dropdown berdasarkan state masterDataOpen
                  } py-2 space-y-2`}
                >
                  {/* <!-- Menu Simpel --> */}
                  <li>
                    <a
                      href="https://demo-absen.excellentsistem.com/admin/rekap_simpel"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-users-gear fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">Simpel</span>
                    </a>
                  </li>
                  {/* <!-- Menu PerKaryawan --> */}
                  <li>
                    <a
                      href="https://demo-absen.excellentsistem.com/admin/rekap_perkaryawan"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-user fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">
                        Perkaryawan
                      </span>
                    </a>
                  </li>
                  {/* <!-- Menu Harian --> */}
                  <li>
                    <a
                      href="https://demo-absen.excellentsistem.com/admin/rekap_harian"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-calendar-day fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">Harian</span>
                    </a>
                  </li>
                  {/* <!-- Menu Mingguan --> */}
                  <li>
                    <a
                      href="https://demo-absen.excellentsistem.com/admin/rekap_mingguan"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-calendar-week fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">
                        Mingguan
                      </span>
                    </a>
                  </li>
                  {/* <!-- Menu Bulanan --> */}
                  <li>
                    <a
                      href="https://demo-absen.excellentsistem.com/admin/rekap_bulanan"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-calendar fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">Bulanan</span>
                    </a>
                  </li>
                </ul>
              </li>

              {/* // <!-- Dropdown Absen --> */}
              <li>
                <button
                  type="button"
                  class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  // aria-controls="dropdown-data"
                  // data-collapse-toggle="dropdown-data"
                  onClick={toggleAbsen}
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    icon={faTable}
                  />
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">
                    Data Absensi
                  </span>
                  <FontAwesomeIcon
                    icon={absenOpen ? faChevronUp : faChevronDown}
                    className="flex-shrink-0 w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                </button>

                <ul
                  id="dropdown-masterdata"
                  className={`${
                    absenOpen ? "" : "hidden" // Tampilkan atau sembunyikan dropdown berdasarkan state masterDataOpen
                  } py-2 space-y-2`}
                >
                  {/* <!-- Menu Absensi --> */}
                  <li>
                    <a
                      href="https://demo-absen.excellentsistem.com/admin/absensi"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-address-card fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">Absensi</span>
                    </a>
                  </li>
                  {/* <!-- Menu Cuti --> */}
                  <li>
                    <a
                      href="https://demo-absen.excellentsistem.com/admin/cuti"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-calendar-alt fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">Cuti</span>
                    </a>
                  </li>
                  {/* <!-- Menu Kehadiran --> */}
                  <li>
                    <a
                      href="https://demo-absen.excellentsistem.com/admin/kehadiran"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-user-check fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">
                        Kehadiran
                      </span>
                    </a>
                  </li>
                  {/* <!-- Menu Mingguan --> */}
                  <li>
                    <a
                      href="https://demo-absen.excellentsistem.com/admin/lembur"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <i class="fa-solid fa-business-time fa-lg me-3 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                      <span class="flex-1 ml-3 whitespace-nowrap">Lembur</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          )}
          {role === "USER" && (
            <ul>
              {" "}
              <li>
                <a
                  href="/user/dashboard"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    icon={faCube}
                  />
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="/user/history_absen"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    icon={faClock}
                  />
                  <span className="flex-1 ms-3 whitespace-nowrap">Absen</span>
                </a>
              </li>
              <li>
                <a
                  href="/user/history_cuti"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    icon={faCalendarDays}
                  />
                  <span className="flex-1 ms-3 whitespace-nowrap">Cuti</span>
                </a>
              </li>
              <li>
                <a
                  href="/user/history_lembur"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FontAwesomeIcon
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    icon={faBusinessTime}
                  />
                  <span className="flex-1 ms-3 whitespace-nowrap">Lembur</span>
                </a>
              </li>
            </ul>
          )}
          <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                icon={faArrowRightFromBracket}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
