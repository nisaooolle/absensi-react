import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

function Addkaryawan() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [organisasiId, setorganisasiId] = useState("");
  const [idJabatan, setidJabatan] = useState("");
  const [shift, setShift] = useState("");
  const [password, setPassword] = useState("");
  const adminId = localStorage.getItem("adminId");
  const [organisasiList, setOrganisasiList] = useState([]);
  const [organisasi, setOrganisasi] = useState("");

  useEffect(() => {
    GetALLOrganisasi();
  }, []);

  const GetALLOrganisasi = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2024/api/organisasi/all"
      );
      setOrganisasiList(response.data.data);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Gagal mendapatkan data organisasi", "error");
    }
  };
  const tambahJabatan = async (e) => {
    e.preventDefault();
    try {
      const add = {
        email: email,
        username: username,
        organisasiId: organisasiId,
        idJabatan: idJabatan,
        shift: shift,
        password: password,
        adminId: adminId,
      };
      const response = await axios.post(
        `http://localhost:2024/api/jabatan/add/${adminId}`,
        add
      );
      console.log(response);
      Swal.fire("Berhasil", "Berhasil menambahkan data", "success");

      window.location.href = "/admin/jabatan";
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Gagal mengambil data", "error");
    }
  };

  useEffect(() => {}, [adminId]);
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar />
        </div>
        <div class=" sm:ml-64 content-page container p-8  ml-14 md:ml-64 mt-12">
          <div class="p-4">
            <div class="p-5 ">
              {/* <!-- Card --> */}
              <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                {/* <!-- Header --> */}
                <div class="flex justify-between">
                  <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Tambah Karyawan
                  </h6>
                </div>

                <hr />

                {/* <!-- Form Input --> */}
                <form
                  onSubmit={tambahJabatan}
                  action="/admin/aksi_tambah_user"
                  method="post"
                  enctype="multipart/form-data"
                >
                  <div class="mt-5 text-left">
                    <div class="grid md:grid-cols-2 md:gap-6">
                      {/* <!-- Email Input --> */}
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          required
                        />
                        <label
                          for="email"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email
                        </label>
                      </div>

                      {/* <!-- Username Input --> */}
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          required
                        />
                        <label
                          for="username"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Username
                        </label>
                      </div>
                    </div>

                    {/* <!-- Organisasi Input --> */}
                    <div class="relative z-0 w-full mb-6 group">
                      <label for="id_organisasi" class="sr-only">
                        Organisasi
                      </label>
                      <select
                       value={organisasi}
                       onChange={(e) => setOrganisasi(e.target.value)}
                        name="id_organisasi"
                        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      >
                        <option selected>Pilih Organisasi</option>
                        <option value="7">Excellent Computer </option>
                      </select>
                    </div>

                    {/* <!-- Jabatan Input --> */}
                    <div class="relative z-0 w-full mb-6 group">
                      <select
                        id="id_jabatan"
                        name="id_jabatan"
                        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      >
                        <option selected>Pilih Jabatan</option>
                        <option value="10">Magang </option>
                      </select>
                    </div>

                    {/* <!-- Organisasi Input --> */}
                    <div class="relative z-0 w-full mb-6 group">
                      <label for="id_shift" class="sr-only">
                        Organisasi
                      </label>
                      <select
                        name="id_shift"
                        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      >
                        <option selected>Pilih Shift</option>
                        <option value="8">Normal </option>
                      </select>
                    </div>

                    {/* <!-- Password Input --> */}
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autocomplete="off"
                        required
                      />
                      <label
                        for="password"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Password
                      </label>
                    </div>
                  </div>

                  <div class="mb-6">
                    <div class="flex">
                      <div class="text-red-500">*</div>
                      <div class="text-sm font-medium text-gray-950 dark:text-gray-950">
                        Password harus memiliki 8 karakter
                      </div>
                    </div>
                    <div class="flex">
                      <div class="flex items-center h-5">
                        <input
                          id="showpass"
                          type="checkbox"
                          class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                          value={showPassword}
                          onChange={handleShowPasswordChange}
                        />
                      </div>
                      <label
                        for="showpass"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Show Password
                      </label>
                    </div>
                  </div>

                  {/* <!-- Button --> */}
                  <div class="flex justify-between">
                    <a
                      class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      href="/admin/karyawan "
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </a>
                    <button
                      type="submit"
                      class="text-white bg-indigo-500 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                    >
                      <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addkaryawan;
