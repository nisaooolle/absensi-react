import React, { useEffect, useRef, useState } from "react";
import Logo from "../components/absensii.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBriefcase,
  faBuilding,
  faBusinessTime,
  faCalendar,
  faCalendarDay,
  faCalendarDays,
  faCalendarWeek,
  faChalkboardUser,
  faChevronDown,
  faChevronUp,
  faClock,
  faCube,
  faDatabase,
  faMapLocationDot,
  faSignal,
  faTable,
  faUserCheck,
  faUserGear,
  faUserPen,
  faUserPlus,
  faUserTie,
  faUsers,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function SidebarNavbar() {
  const role = localStorage.getItem("role");
  const [isOpen, setIsOpen] = useState(false);
  const [masterDataOpen, setMasterDataOpen] = useState(false);
  const [rekapanOpen, setRekapanOpen] = useState(false);
  const [absenOpen, setAbsenOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  const isActive = (paths) => {
    return (
      Array.isArray(paths) &&
      paths.some((path) => location.pathname.startsWith(path))
    );
  };

  useEffect(() => {
    const isActive = (paths) => {
      return (
        Array.isArray(paths) &&
        paths.some((path) => location.pathname.startsWith(path))
      );
    };

    if (
      isActive([
        "/admin/simpel",
        "/admin/perkaryawan",
        "/admin/harian",
        "/admin/mingguan",
        "/admin/bulanan",
        "/superadmin/data-user",
        "/superadmin/absensi",
      ])
    ) {
      setRekapanOpen(true);
    } else {
      setRekapanOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Check if any link inside dropdown is active and open the dropdown if it is
    const isActive = (paths) => {
      return (
        Array.isArray(paths) &&
        paths.some((path) => location.pathname.startsWith(path))
      );
    };

    if (
      isActive([
        "/admin/absensi",
        "/admin/kehadiran",
        "/admin/cuti",
        "/admin/lembur",
      ])
    ) {
      setAbsenOpen(true);
    } else {
      setAbsenOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const isActive = (paths) => {
      return (
        Array.isArray(paths) &&
        paths.some((path) => location.pathname.startsWith(path))
      );
    };

    if (
      isActive([
        "/admin/karyawan",
        "/admin/jabatan",
        "/admin/shift",
        "/admin/lokasi",
        "/admin/organisasi",
        "/superadmin/admin",
        "/superadmin/jabatan",
        "/superadmin/shift",
        "/superadmin/lokasi",
        "/superadmin/organisasi",
      ])
    ) {
      setMasterDataOpen(true);
    } else {
      setMasterDataOpen(false);
    }
  }, [location.pathname]);
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={toggleSidebar}
        aria-controls="logo-sidebar"
        aria-expanded={isOpen}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-white rounded-lg sm:hidden hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white dark:hover:bg-blue-800 dark:focus:ring-blue-800"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col">
          <div className={`bg-indigo-500 ${isOpen ? "hidden" : "block"}`}>
            <Link to="/" className="flex items-center p-3">
              <img src={Logo} className="h-11 me-3 text-white" alt="Logo" />
              <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap text-white">
                Presensi App
              </span>
            </Link>
          </div>
          <div className="bg-white shadow-lg shadow-blue-300 flex-1 px-3 py-4 h-full pb-4 overflow-y-auto">
            <nav className="">
              <ul className="space-y-2 font-medium">
                {role === "ADMIN" && (
                  <ul>
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className={`${
                          isActive(["/admin/dashboard"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                            isActive(["/admin/dashboard"])
                              ? "text-white hover:text-black"
                              : "text-blue-500"
                          }`}
                          icon={faCube}
                        />
                        <span className="ms-3">Dashboard</span>
                      </Link>
                    </li>
                    {/* // <!-- Dropdown Master Data --> */}
                    <li>
                      <button
                        type="button"
                        className="flex items-center w-full p-2 text-base text-blue-900 transition duration-75 rounded-lg group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                        // aria-controls="dropdown-masterdata"
                        // data-dropdown-toggle="dropdown-masterdata"
                        onClick={toggleMasterData}
                      >
                        <FontAwesomeIcon
                          className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                          icon={faDatabase}
                        />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          Master Data
                        </span>
                        <FontAwesomeIcon
                          icon={masterDataOpen ? faChevronUp : faChevronDown}
                          className="flex-shrink-0 w-4 h-4 text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
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
                          <Link
                            to="/admin/karyawan"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/karyawan"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/karyawan"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faUsersGear}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Karyawan
                            </span>
                          </Link>
                        </li>

                        {/* <!-- Menu Jabatan --> */}
                        <li>
                          <Link
                            to="/admin/jabatan"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/jabatan"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/jabatan"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faBriefcase}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Jabatan
                            </span>
                          </Link>
                        </li>

                        {/* <!-- Menu Jam Kerja --> */}
                        <li>
                          <Link
                            to="/admin/shift"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/shift"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/shift"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faBriefcase}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Shift
                            </span>
                          </Link>
                        </li>

                        {/* <!-- Menu Lokasi --> */}
                        <li>
                          <Link
                            to="/admin/lokasi"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/lokasi"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/lokasi"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faMapLocationDot}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Lokasi
                            </span>
                          </Link>
                        </li>

                        {/* <!-- Menu Organisasi --> */}
                        <li>
                          <Link
                            to="/admin/organisasi"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/organisasi"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/organisasi"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faBuilding}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Organisasi
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* <!-- Dropdown Rekapan --> */}
                    <li>
                      <button
                        type="button"
                        className="flex items-center w-full p-2 text-base text-blue-900 transition duration-75 rounded-lg group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                        // aria-controls="dropdown-example"
                        // data-collapse-toggle="dropdown-example"
                        onClick={toggleRekapan}
                      >
                        <FontAwesomeIcon
                          className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                          icon={faSignal}
                        />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          Rekapan
                        </span>
                        <FontAwesomeIcon
                          icon={rekapanOpen ? faChevronUp : faChevronDown}
                          className="flex-shrink-0 w-4 h-4 text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
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
                          <Link
                            to="/admin/simpel"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/simpel"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/simpel"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faUserGear}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Simpel
                            </span>
                          </Link>
                        </li>
                        {/* <!-- Menu PerKaryawan --> */}
                        <li>
                          <Link
                            to="/admin/perkaryawan"
                            className={`${
                              isActive(["/admin/perkaryawan"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                            } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/perkaryawan"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faUserPen}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Perkaryawan
                            </span>
                          </Link>
                        </li>
                        {/* <!-- Menu Harian --> */}
                        <li>
                          <Link
                            to="/admin/harian"
                            className={`${
                              isActive(["/admin/harian"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                            } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/harian"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faCalendarDay}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Harian
                            </span>
                          </Link>
                        </li>
                        {/* <!-- Menu Mingguan --> */}
                        <li>
                          <Link
                            to="/admin/mingguan"
                            className={`${
                              isActive(["/admin/mingguan"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                            } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/mingguan"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faCalendarWeek}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Mingguan
                            </span>
                          </Link>
                        </li>
                        {/* <!-- Menu Bulanan --> */}
                        <li>
                          <Link
                            to="/admin/bulanan"
                            className={`${
                              isActive(["/admin/bulanan"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                            } flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/bulanan"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faCalendar}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Bulanan
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* // <!-- Dropdown Absen --> */}
                    <li>
                      <button
                        type="button"
                        className="flex items-center w-full p-2 text-base text-blue-900 transition duration-75 rounded-lg group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                        // aria-controls="dropdown-data"
                        // data-collapse-toggle="dropdown-data"
                        onClick={toggleAbsen}
                      >
                        <FontAwesomeIcon
                          className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                          icon={faTable}
                        />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          Data Absensi
                        </span>
                        <FontAwesomeIcon
                          icon={absenOpen ? faChevronUp : faChevronDown}
                          className="flex-shrink-0 w-4 h-4 text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
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
                          <Link
                            to="/admin/absensi"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/absensi"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/absensi"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faAddressCard}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Absensi
                            </span>
                          </Link>
                        </li>
                        {/* <!-- Menu Cuti --> */}
                        <li>
                          <Link
                            to="/admin/cuti"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/cuti"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/cuti"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faCalendarDays}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Cuti
                            </span>
                          </Link>
                        </li>
                        {/* <!-- Menu Kehadiran --> */}
                        <li>
                          <Link
                            to="/admin/kehadiran"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/kehadiran"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/kehadiran"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faUserCheck}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Kehadiran
                            </span>
                          </Link>
                        </li>
                        {/* <!-- Menu Lembur --> */}
                        <li>
                          <Link
                            to="/admin/lembur"
                            className={`flex items-center p-2 rounded-lg ml-9 pl-3 ${
                              isActive(["/admin/lembur"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 textsition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/admin/lembur"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faBusinessTime}
                            />{" "}
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              Lembur
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
                {role === "USER" && (
                  <ul>
                    {" "}
                    <li>
                      <Link
                        to="/user/dashboard"
                        className={`${
                          isActive(["/user/dashboard"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                            isActive(["/user/dashboard"])
                              ? "text-white hover:text-black"
                              : "text-blue-500"
                          }`}
                          icon={faCube}
                        />
                        <span className="ms-3">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user/history_absen"
                        className={`${
                          isActive(["/user/history_absen"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                            isActive(["/user/history_absen"])
                              ? "text-white hover:text-black"
                              : "text-blue-500"
                          }`}
                          icon={faClock}
                        />
                        <span className="ms-3">Absensi</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user/history_cuti"
                        className={`${
                          isActive(["/user/history_cuti"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                            isActive(["/user/history_cuti"])
                              ? "text-white hover:text-black"
                              : "text-blue-500"
                          }`}
                          icon={faCalendarDays}
                        />
                        <span className="ms-3">Cuti</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user/history_lembur"
                        className={`${
                          isActive(["/user/history_lembur"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        } flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group`}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                            isActive(["/user/history_lembur"])
                              ? "text-white hover:text-black"
                              : "text-blue-500"
                          }`}
                          icon={faBusinessTime}
                        />
                        <span className="ms-3">Lembur</span>
                      </Link>
                    </li>
                  </ul>
                )}
                {role === "SUPERADMIN" && (
                  <ul>
                    <li>
                      <Link
                        to="/superadmin/dashboard"
                        className={`flex items-center p-2 rounded-lg ${
                          isActive(["/superadmin/dashboard"])
                            ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                            : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                        }`}
                      >
                        <FontAwesomeIcon
                          className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                            isActive(["/superadmin/dashboard"])
                              ? "text-white hover:text-black"
                              : "text-blue-500"
                          }`}
                          icon={faCube}
                        />
                        <span className="ms-3">Dashboard</span>
                      </Link>
                    </li>
                    {/* // <!-- Dropdown Master Data --> */}
                    <li>
                      <button
                        type="button"
                        className="flex items-center w-full p-2 text-base text-blue-900 transition duration-75 rounded-lg group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                        // aria-controls="dropdown-masterdata"
                        // data-dropdown-toggle="dropdown-masterdata"
                        onClick={toggleMasterData}
                      >
                        <FontAwesomeIcon
                          className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                          icon={faUserTie}
                        />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          Data Admin
                        </span>
                        <FontAwesomeIcon
                          icon={masterDataOpen ? faChevronUp : faChevronDown}
                          className="flex-shrink-0 w-4 h-4 text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        />
                      </button>
                      <ul
                        // id="dropdown-masterdata"
                        className={`${
                          masterDataOpen ? "" : "hidden" // Tampilkan atau sembunyikan dropdown berdasarkan state masterDataOpen
                        } py-2 space-y-2 ml-6`}
                      >
                        {/* <!-- Menu superadmin --> */}
                        <li>
                          <Link
                            to="/superadmin/admin"
                            className={`flex items-center p-2 rounded-lg ${
                              isActive(["/superadmin/admin"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/superadmin/admin"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faChalkboardUser}
                            />
                            <span className="ms-3">Admin</span>
                          </Link>
                        </li>
                        {/* <!-- Menu Organisasi --> */}
                        <li>
                          <Link
                            to="/superadmin/organisasi"
                            className={`flex items-center p-2 rounded-lg ${
                              isActive(["/superadmin/organisasi"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/superadmin/organisasi"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faBuilding}
                            />
                            <span className="ms-3">Organisasi</span>
                          </Link>
                        </li>
                        {/* <!-- Menu Jabatan --> */}
                        <li>
                          <Link
                            to="/superadmin/jabatan"
                            className={`flex items-center p-2 rounded-lg ${
                              isActive(["/superadmin/jabatan"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/superadmin/jabatan"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faBriefcase}
                            />
                            <span className="ms-3">Jabatan</span>
                          </Link>
                        </li>

                        {/* <!-- Menu Jam Kerja --> */}
                        <li>
                          <Link
                            to="/superadmin/shift"
                            className={`flex items-center p-2 rounded-lg ${
                              isActive(["/superadmin/shift"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/superadmin/shift"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faBusinessTime}
                            />
                            <span className="ms-3">Shift</span>
                          </Link>
                        </li>

                        {/* <!-- Menu Lokasi --> */}
                        <li>
                          <Link
                            to="/superadmin/lokasi"
                            className={`flex items-center p-2 rounded-lg ${
                              isActive(["/superadmin/lokasi"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/superadmin/lokasi"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faMapLocationDot}
                            />
                            <span className="ms-3">Lokasi</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* <!-- Dropdown user --> */}
                    <li>
                      <button
                        type="button"
                        className="flex items-center w-full p-2 text-base text-blue-900 transition duration-75 rounded-lg group hover:bg-blue-100 dark:text-white dark:hover:bg-blue-700"
                        // aria-controls="dropdown-example"
                        // data-collapse-toggle="dropdown-example"
                        onClick={toggleRekapan}
                      >
                        <FontAwesomeIcon
                          className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                          icon={faUserPlus}
                        />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          Data User
                        </span>
                        <FontAwesomeIcon
                          icon={rekapanOpen ? faChevronUp : faChevronDown}
                          className="flex-shrink-0 w-4 h-4 text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                        />
                      </button>

                      <ul
                        // id="dropdown-masterdata"
                        className={`${
                          rekapanOpen ? "" : "hidden" // Tampilkan atau sembunyikan dropdown berdasarkan state masterDataOpen
                        } py-2 space-y-2 ml-6`}
                      >
                        {/* <!-- Menu Simpel --> */}
                        <li>
                          <Link
                            to="/superadmin/data-user"
                            className={`flex items-center p-2 rounded-lg ${
                              isActive(["/superadmin/data-user"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/superadmin/data-user"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faUsers}
                            />
                            <span className="ms-3">User</span>
                          </Link>
                        </li>
                        {/* <!-- Menu PerKaryawan --> */}
                        <li>
                          <Link
                            to="/superadmin/absensi"
                            className={`flex items-center p-2 rounded-lg ${
                              isActive(["/superadmin/absensi"])
                                ? "bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white hover:text-black"
                                : "hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-white hover:text-black"
                            }`}
                          >
                            <FontAwesomeIcon
                              className={`flex-shrink-0 w-5 h-5 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white ${
                                isActive(["/superadmin/absensi"])
                                  ? "text-white hover:text-black"
                                  : "text-blue-500"
                              }`}
                              icon={faAddressCard}
                            />
                            <span className="ms-3">Absensi</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
                {/* <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
            >
              <FontAwesomeIcon
                className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                icon={faArrowRightFromBracket}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </a>
          </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default SidebarNavbar;
