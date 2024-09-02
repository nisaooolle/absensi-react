import React, { useEffect, useState } from "react";
import Logo from "../components/absensii.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_DUMMY } from "../utils/api";
import Swal from "sweetalert2";
const NavbarAdmin = () => {
  const [profileAdmin, setProfileAdmin] = useState("");
  const role = localStorage.getItem("role");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const getAdmin = async () => {
    const id = localStorage.getItem("adminId");
    try {
      const admin = await axios.get(`${API_DUMMY}/api/admin/getById/${id}`);
      setProfileAdmin(admin.data.imageAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmin();
  });

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
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
        localStorage.clear();
        Swal.fire({
          title: "Logout Berhasil",
          text: "Anda telah berhasil logout.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.href = "/";
        });
      }
    });
  }

  return (
    <nav className="fixed top-0 z-50 w-full bg-indigo-500 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <a href="" className="flex ms-2 md:me-24">
              <img src="" className="h-11 me-3 text-white" alt="" />
              <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap text-white">
                {/* Presensi App */}
              </span>
            </a>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={toggleUserMenu}
                  id="user-menu-button"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-11 h-11 rounded-full"
                    src={
                      profileAdmin
                        ? profileAdmin
                        : "https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
                    }
                    alt="user photo"
                  />
                </button>
                {userMenuOpen && (
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg"
                    tabIndex="-1"
                  >
                    <Link
                      to="/admin/profil"
                      className={`block text-sm text-gray-700 dark:text-white`}
                    >
                      <button
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                        className={`block px-4 py-2 text-sm text-gray-700 dark:text-white `}
                      >
                        Profile
                      </button>
                    </Link>

                    <button
                      onClick={() => logout()}
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white w-full text-left"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
