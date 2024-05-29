import React, { useEffect, useState } from "react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import Navbar from "../../components/NavbarUser";
import Sidebar from "../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";
function Profil() {
  const [showPassword, setShowPassword] = useState(false);
  const [imageAdmin, setImageAdmin] = useState("");
  const [showPasswordd, setShowPasswordd] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ubahUsername, setUbahUsername] = useState(false);
  const [profile, setProfile] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("adminId");

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2024/api/admin/getById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
      setImageAdmin(response.data.imageAdmin);
      setEmail(response.data.email);
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const HandleUbahUsernameEmail = async (e) => {
    e.preventDefault();
    if (ubahUsername) {
     
        try {
          const response = await axios.put(
            `http://localhost:2024/api/admin/edit-email-username/${id}`,
            { username, email },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setProfile(response.data);
          setUsername(response.data.username);
          setEmail(response.data.email);
          setUbahUsername(false);
          Swal.fire(
            "Berhasil",
            "Berhasil mengubah username dan email",
            "success"
          );
        } catch (error) {
          console.error("Error updating data:", error);
          Swal.fire("Gagal", "Gagal mengubah username dan email", "error");
        }
      
    } else {
      setUbahUsername(true);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const handleImageUpload = async (event) => {
    setLoading(true);
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await axios.put(
        `http://localhost:2024/api/admin/ubah-foto/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setImageAdmin(response.data.imageAdmin);
      Swal.fire("Berhasil", "Berhasil mengubah foto profil", "success");
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };
  return (
    <>
      {loading && <Loader />}
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
                        src={
                          imageAdmin
                            ? imageAdmin
                            : require("../../components/asset/download.jpg")
                        }
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
                          <span className="z-20 block rounded-xl border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
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
                        className="z-20 block rounded-xl border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50"
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
                    <form onSubmit={HandleUbahUsernameEmail}>
                      <div className="relative mb-3">
                        <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          id="nama"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Masukkan Nama"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          disabled={!ubahUsername}
                        />
                      </div>
                      <div className="relative">
                        <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Masukkan Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={!ubahUsername}
                        />
                      </div>

                      <div className="flex justify-between mt-6">
                        {!ubahUsername && (
                          <button
                            type="button"
                            onClick={() => setUbahUsername(true)}
                            className="z-20 block rounded-xl border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50"
                          >
                            Ubah
                          </button>
                        )}
                        {ubahUsername && (
                          <button
                            onClick={handleCancel}
                            className="z-20 block rounded-xl border-2 border-white bg-rose-100 p-4 text-rose-500 active:bg-rose-50"
                          >
                            Batal
                          </button>
                        )}
                        {ubahUsername && (
                          <button
                            type="submit"
                            className="z-20 block rounded-xl border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50"
                          >
                            Simpan
                          </button>
                        )}
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
                          className="z-20 block rounded-xl border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50"
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
    </>
  );
}

export default Profil;
