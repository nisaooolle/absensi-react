import React from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";
import {
  faInfo,
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
                  href="/admin/addlok"
                  class="text-white bg-indigo-500 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                >
                  <FontAwesomeIcon icon={faPlus} size="lg" />
                </a>
              </div>
              <hr />

              {/* <!-- Tabel --> */}
              <div class="relative overflow-x-auto mt-5">
                <table
                  id="dataJabatan"
                  class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
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
                      <th scope="col" class="px-6 py-3 text-center">
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
                      <td className=" py-3">
                        <div className="flex items-center -space-x-4 ml-12">
                          <a href="/admin/detailL">
                            <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                              <span className="relative inline-block">
                                <FontAwesomeIcon
                                  icon={faInfo}
                                  className="h-4 w-4"
                                />
                              </span>
                            </button>
                          </a>
                          <a href="/admin/editL">
                            <button className="z-30 block rounded-full border-2 border-white bg-yellow-100 p-4 text-yellow-700 active:bg-red-50">
                              <span className="relative inline-block">
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  className="h-4 w-4"
                                />
                              </span>
                            </button>
                          </a>
                          <a href="" onclick="hapusUser(4)">
                            <button className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 active:bg-red-50">
                              <span className="relative inline-block">
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="h-4 w-4"
                                />
                              </span>
                            </button>
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
