import React from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExport,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function simpel() {
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
          <div class="p-5 mt-10">
            <main id="content" class="flex-1 p-4 sm:p-6">
              <div class="bg-white rounded-lg shadow-md p-4">
                <div class="flex justify-between">
                  <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Rekap Simpel
                  </h6>
                  {/* <!-- <a type="button" href="https://demo-absen.excellentsistem.com/admin/tambah_lokasi"
                    class="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"><i
                        class="fa-solid fa-plus"></i></a> --> */}
                </div>
                <hr />
                <form
                  action=""
                  method="post"
                  class="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5"
                >
                  <select
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="bulan"
                    name="bulan"
                  >
                    <option>Pilih Bulan</option>
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
                  <div class="flex sm:flex-row gap-4 mx-auto items-center">
                    <button
                      type="submit"
                      class="bg-indigo-500 hover:bg-indigo text-white font-bold py-2 px-4 rounded inline-block"
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <a
                      href="https://demo-absen.excellentsistem.com/Admin/export_simple"
                      class="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto"
                    >
                      <FontAwesomeIcon icon={faFileExport} />
                    </a>
                  </div>
                </form>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                  <table
                    id="rekapSimple"
                    class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                  >
                    <thead class="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-4 py-3">
                          No
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Nama
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Tanggal
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Jam Masuk
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Foto Masuk
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Lokasi Masuk
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Jam Pulang
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Foto Pulang
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Lokasi Pulang
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Jam Kerja
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Keterangan
                        </th>
                      </tr>
                    </thead>
                    <tbody class="text-left"></tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default simpel;
