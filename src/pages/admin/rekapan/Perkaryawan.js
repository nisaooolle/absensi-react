import React from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Perkaryawan() {
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
      <div class="p-4">
      <div class="p-5 mt-10">
        <main id="content" class="flex-1 p-4 sm:p-6">
          <div class="bg-white rounded-lg shadow-md p-4">
            <div class="flex justify-between">
              <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Rekap Perkaryawan
              </h6>
            </div>
            <hr />
            <form
              action=""
              method="post"
              class="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5"
            >
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 js-example-basic-single"
                id="id_user"
                name="id_user"
              >
                <option>Pilih Karyawan</option>
                <option value="4">Khoirul Nisa </option>
                <option value="35">Davina Cahyani </option>
                <option value="36">satria candra </option>
                <option value="41">Nia </option>
              </select>
              <div class="flex sm:flex-row gap-4 mx-auto items-center">
                <button
                  type="submit"
                  class="bg-indigo-500 hover:bg-indigo text-white font-bold py-2 px-4 rounded inline-block"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <a
                  href="https://demo-absen.excellentsistem.com/Admin/export_perkaryawan"
                  class="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto"
                >
                  <FontAwesomeIcon icon={faFileExport} />
                </a>
              </div>
            </form>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <h5 class="mb-2 text-l font-bold text-gray-900 dark:text-white">
                Rekap Atas Nama : -{" "}
              </h5>

              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      No
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Tanggal
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Jam Masuk
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Foto Masuk
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Jam Pulang
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Foto Pulang
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Jam Kerja
                    </th>
                    <th scope="col" class="px-6 py-3">
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
  </div>
   
  );
}

export default Perkaryawan;
