import React from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function DetailOrganisasi() {
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
            <div class="p-5 mt-10">
              {/* <!-- Card --> */}
              <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-between">
                  <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Detail Organisasi
                  </h6>
                </div>

                <hr />

                <div class="mt-5 text-left">
                  {/* <!-- Form Input --> */}
                  <form
                    action="https://demo-absen.excellentsistem.com/"
                    method="post"
                    enctype="multipart/form-data"
                  >
                    <div class="mt-5 text-center">
                      {/* <!-- Mengubah kelas "text-left" menjadi "text-center" --> */}
                      <img
                        class="rounded-full w-96 h-96 mx-auto"
                        src="https://demo-absen.excellentsistem.com/images/logo/"
                        alt="image description"
                      />
                    </div>

                    {/* <!-- Nama & Email Input --> */}
                    <div class="grid md:grid-cols-2 md:gap-6">
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="nama"
                          id="nama"
                          value="Excellent Computer"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          required
                          readonly
                        />
                        <label
                          for="nama"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Nama
                        </label>
                      </div>
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value="excellent@gmail.com"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          required
                          readonly
                        />
                        <label
                          for="email"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email
                        </label>
                      </div>
                      {/* <!-- No.tlpn & Alamat Input --> */}
                      <div class="grid md:grid-cols-1 md:gap-6">
                        <div class="relative z-0 w-full mb-6 group">
                          <input
                            type="tel"
                            name="nomor_telepon"
                            id="nomor_telepon"
                            value="098756381624"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autocomplete="off"
                            required
                            readonly
                          />
                          <label
                            for="nomor_telepon"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            No.Telepon
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="alamat"
                            id="alamat"
                            value="bulustalan"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autocomplete="off"
                            required
                            readonly
                          />
                          <label
                            for="alamat"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Alamat
                          </label>
                        </div>
                      </div>
                      {/* <!-- Kecamatan & Kabupaten Input --> */}
                      <div class="grid md:grid-cols-1 md:gap-6">
                        <div class="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="kecamatan"
                            id="kecamatan"
                            value="Kec.Semarang Selatan"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autocomplete="off"
                            required
                            readonly
                          />
                          <label
                            for="kecamatan"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Kecamatan
                          </label>
                        </div>
                        <div class="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="kabupaten"
                            id="kabupaten"
                            value="Semarang"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            autocomplete="off"
                            required
                            readonly
                          />
                          <label
                            for="kabupaten"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Kabupaten
                          </label>
                        </div>
                      </div>
                      {/* <!-- Provinsi Input --> */}
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="provinsi"
                          id="provinsi"
                          value="Jawa Tengah"
                          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autocomplete="off"
                          required
                          readonly
                        />
                        <label
                          for="provinsi"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Provinsi
                        </label>
                      </div>
                    </div>
                    {/* <!-- Button --> */}
                    <div class="flex justify-between">
                      <a
                        class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        href="/admin/organisasi"
                      >
                        {" "}
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailOrganisasi;
