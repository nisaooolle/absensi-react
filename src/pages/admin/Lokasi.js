import React from "react";
import Navbar from "../../components/NavbarUser";
import Sidebar from "../../components/SidebarUser";
import {
  faCircleInfo,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Lokasi() {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar />
        </div>
        <div class=" sm:ml-64 content-page container p-8  ml-0 md:ml-64 mt-12">
          <div class="p-5 mt-10">
            {/* <!-- Card --> */}
            <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div class="flex justify-between">
                <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Data Lokasi
                </h6>
                <a
                  type="button"
                  href="https://demo-absen.excellentsistem.com/admin/tambah_user"
                  class="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                >
                  <FontAwesomeIcon icon={faPlus} size="lg" />
                </a>
              </div>
              <hr />

              {/* <!-- Tabel --> */}
              <div class="relative overflow-x-auto mt-5">
                <table
                  id="dataJabatan"
                  class="w-full text-center text-sm text-left text-gray-500 dark:text-gray-400"
                >
                  {/* <!-- Tabel Head --> */}
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        No
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Nama Lokasi
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Alamat
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Jumlah Karyawan
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Organisasi
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  {/* <!-- Tabel Body --> */}
                  <tbody class="text-left">
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        1{" "}
                      </th>
                      <td class="px-6 py-4">mangkang </td>
                      <td class="px-6 py-4">kemantren</td>
                      <td class="px-6 py-4">17 </td>
                      <td class="px-6 py-4">admin_demo </td>
                      <td class="px-6 py-4 ">
                        <div class=" flex justify-center">
                          <a
                            type="button"
                            href="https://demo-absen.excellentsistem.com/admin/detail_user/4"
                            class="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 mx-1 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                          >
                            <FontAwesomeIcon icon={faCircleInfo} size="lg" />
                          </a>
                          <a
                            type="button"
                            href="https://demo-absen.excellentsistem.com/admin/update_user/4"
                            class="text-white bg-yellow-400 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                          </a>
                          <a
                            type="button"
                            onclick="hapusUser(4)"
                            class="text-white bg-red-600 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                          >
                            <FontAwesomeIcon icon={faTrash} size="lg" />
                          </a>
                        </div>
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
  );
}

export default Lokasi;
