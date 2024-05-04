import React, { useState } from "react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import Navbar from "../../components/NavbarUser";
import Sidebar from "../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  // State untuk menyimpan URL gambar profil
  const [profileImage, setProfileImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordd, setShowPasswordd] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fungsi untuk menangani peristiwa pengunggahan gambar
  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    const objectUrl = URL.createObjectURL(selectedFile);
    setProfileImage(objectUrl);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="content-page container p-8 min-h-screen ml-0 md:ml-64 mt-20">
          <Tabs aria-label="Tabs with underline" style="underline">
            <Tabs.Item active title="Profile" icon={HiUserCircle}>
              {/* Konten tab Profil */}
              <div className="font-medium text-gray-800 dark:text-white">
                <div className="profile mt-12 bg-white p-5 rounded-xl shadow-xl border border-gray-300">
                  <h2 className="text-xl font-bold">Profile Picture</h2>
                  <div className="flex flex-col items-center mt-4">
                    {/* Placeholder untuk menampilkan gambar profil yang dipilih */}
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-48 h-48 rounded-full"
                    />
                    {/* Pesan instruksi */}
                    <p className="mt-2 text-sm text-gray-600">
                      JPG atau PNG tidak lebih besar dari 5 MB. Disarankan
                      Berukuran 1:1.
                    </p>
                  </div>
                  <div className="flex justify-between mt-6">
                    <div>
                      <label htmlFor="fileInput" className="cursor-pointer">
                        <span className="flex items-center justify-center w-20 sm:w-24 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </span>
                      </label>
                      {/* Input file tersembunyi */}
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    <button
                      type="submit"
                      className="block w-20 sm:w-24 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 py-3 text-sm sm:text-xs font-medium"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </Tabs.Item>

            <Tabs.Item title="Detail" icon={MdDashboard}>
              {/* Konten tab Dashboard */}
              <div className="font-medium text-gray-800 dark:text-white">
                <div className="detail-akun mt-12 bg-white p-5 rounded-xl shadow-lg border border-gray-300">
                  <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
                    Detail Akun
                  </p>
                  <form onSubmit={""}>
                    <div className="relative mb-3">
                      <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="nama"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Masukkan Nama"
                        //   value={nama}
                        //   onChange={(e) => setNama(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          placeholder="Masukkan Email"
                          // value={jabatan}
                          // onChange={(e) => setJabatan(e.target.value)}
                          required
                        />
                      </div>
                      <div className="relative">
                        <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                          Organisasi
                        </label>
                        <input
                          type="selected"
                          id="organisasi"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          placeholder="Masukkan Organisasi"
                          // value={tanggalLahir}
                          // onChange={(e) => setTanggalLahir(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="relative">
                        <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                          Jabatan
                        </label>
                        <input
                          type="selected"
                          id="jabatan"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          placeholder="Masukkan Jabatan"
                          // value={noTelepon}
                          // onChange={(e) => setNoTelepon(e.target.value)}
                          required
                        />
                      </div>
                      <div className="relative">
                        <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                          Shift
                        </label>
                        <input
                          type="selected"
                          id="shift"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          placeholder="Masukkan Shift"
                          // value={noTelepon}
                          // onChange={(e) => setNoTelepon(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        type="submit"
                        className="block w-20 sm:w-24 rounded-lg text-black outline outline-[#0b409c] py-3 text-sm sm:text-xs font-medium"
                      >
                        Simpan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item title="Settings" icon={HiAdjustments}>
              <div className="font-medium text-gray-800 dark:text-white">
                <div className="settings mt-12 bg-white p-5 rounded-xl shadow-lg border border-gray-300">
                  <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
                    Settings
                  </p>
                  <form onSubmit={""}>
                    <div className="relative mb-3">
                      <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                        Password Lama
                      </label>
                      <input
                        type={showPasswordd ? "text" : "password"}
                        id="pw-lama"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        required
                      />
                      <FontAwesomeIcon
                        icon={showPasswordd ? faEye : faEyeSlash}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer mt-3"
                        onClick={() => setShowPasswordd(!showPasswordd)}
                      />
                    </div>
                    <div className="relative mb-3">
                      <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                        Password Baru
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="pw-baru"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          required
                        />
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </div>
                    </div>
                    <div className="relative mb-3">
                      <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                        Konfirmasi Password Baru
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="konfirmasi-pw"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          required
                        />
                        <FontAwesomeIcon
                          icon={showConfirmPassword ? faEye : faEyeSlash}
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        type="submit"
                        className="block w-20 sm:w-24 rounded-lg text-black outline outline-[#0b409c] py-3 text-sm sm:text-xs font-medium"
                      >
                        Simpan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;
