import React from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";

function Absensi() {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar />
        </div>
        <div class="sm:ml-64 content-page container p-8 ml-0 md:ml-64 mt-12">
          <div class="p-4 ">
            <div class="p-5">
              {/* <!-- Card --> */}
              <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-between">
                  <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Detail History Absensi
                  </h6>
                </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                  <div class="flex items-center p-4">
                    <form
                      id="form-filter"
                      action="https://demo-absen.excellentsistem.com/Admin/aksi_filter"
                      class="flex gap-4 mx-10"
                    >
                      {/* <!-- Form Bulan --> */}
                      <div class="relative flex items-center">
                        <label
                          for="bulan"
                          class="mx-10 mb-2 text-gray-900 dark:text-white sm:mr-4"
                        ></label>
                        <select
                          id="select"
                          name="bulan"
                          class="w-40 sm:w-64 sm:w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-3"
                        >
                          <option value="" disabled selected>
                            Pilih Bulan
                          </option>
                          <option value="01">Januari</option>
                          <option value="02">Februari</option>
                          <option value="03">Maret</option>
                          <option value="04">April</option>
                          <option value="05">Mei</option>
                          <option value="06">Juni</option>
                          <option value="07">Juli</option>
                          <option value="08">Agustus</option>
                          <option value="09">September</option>
                          <option value="10">Oktober</option>
                          <option value="11">November</option>
                          <option value="12">Desember</option>
                        </select>
                      </div>

                      {/* <!-- Form Tanggal --> */}
                      <div class="relative flex items-center mx-3">
                        <input
                          type="text"
                          id="tanggal"
                          name="tanggal"
                          class="w-40 sm:w-64 sm:w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-3"
                          placeholder="Pilih Tanggal"
                          min="2024-04-24"
                          max="2024-04-24"
                          autocomplete="off"
                        />
                        <label
                          for="tanggal"
                          class="mx-2 mb-2 absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-900 dark:text-white mx-3 "
                        ></label>
                      </div>

                      {/* <!-- Form Tahun --> */}
                      <div class="relative flex items-center">
                        <input
                          type="number"
                          id="form_tahun"
                          name="tahun"
                          class="w-40 sm:w-64 sm:w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3 "
                          placeholder="Pilih Tahun"
                          pattern="[0-9]{4}"
                        />
                        <label
                          for="tahun"
                          class="mx-2 mb-2 absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-900 dark:text-white ml-auto"
                        ></label>
                      </div>
                    </form>

                    {/* <!-- Tombol untuk Semua Form --> */}
                    <button
                      type="button"
                      id="submit-button"
                      class="bg-indigo-500 hover:bg-indigo text-white font-bold py-2 px-4 rounded inline-block ml-2"
                    >
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <a
                      href="https://demo-absen.excellentsistem.com/Admin/export_absensi"
                      class="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-2"
                    >
                      <i class="fa-solid fa-file-export"></i>
                    </a>
                  </div>
                </div>

                <br />

                {/* <!-- Tabel --> */}
                <div class="relative overflow-x-auto mt-5">
                  <table
                    id="absen"
                    class="w-full text-left text-sm text-left text-gray-500 dark:text-gray-400"
                  >
                    {/* <!-- Tabel Head --> */}
                    <thead class="text-left text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-4 py-3">
                          No
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Username
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Tanggal
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Kehadiran
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Jam Masuk
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Foto Masuk
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Jam Pulang
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Foto Pulang
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Jam Kerja
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody class="text-left">
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          1{" "}
                        </th>
                        <td class="px-6 py-4">Layla Rabi'atus Syarifah </td>
                        <td class="px-6 py-4">29 Februari 2024 </td>
                        <td class="px-6 py-4">Terlambat </td>
                        <td class="px-6 py-4">22:27:53 </td>
                        <td class="px-6 py-4">
                          <img
                            src="https://demo-absen.excellentsistem.com/./images/foto_masuk/65e0a2791f50b.png"
                            alt=""
                            class="block py-2.5 px-0 w-25 max-h-32 h-25 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="foto_masuk"
                            style={{maxwidth: "100px;", maxheight: "100px;"}}
                          />
                        </td>
                        <td class="px-6 py-4">22:27:58 </td>
                        <td class="px-6 py-4">
                          <img
                            src="https://demo-absen.excellentsistem.com/./images/foto_pulang/65e0a27ed4111.png"
                            alt=""
                            class="block py-2.5 px-0 w-25 max-h-96 h-25 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            id="foto_masuk"
                            style={{maxwidth: "100px;", maxheight: "100px;"}}
                          />
                        </td>
                        <td class="px-6 py-4">00 jam 00 menit </td>
                        <td class="px-6 py-4">
                          <a
                            type="button"
                            href="https://demo-absen.excellentsistem.com/admin/detail_absen/23"
                            class="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 mx-1 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                          >
                            <i class="fa-solid fa-circle-info"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Absensi;
