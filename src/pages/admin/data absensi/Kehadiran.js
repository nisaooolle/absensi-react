import React from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";

function Kehadiran() {
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
          <div class="p-4">
            <div class="p-5">
              {/* <!-- Card --> */}
              <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-between">
                  <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Data Kehadiran
                  </h6>
                </div>
                <hr />

                {/* <!-- Tabel --> */}
                <div class="relative overflow-x-auto mt-5">
                  <table
                    id="dataKehadiran"
                    class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                  >
                    {/* <!-- Tabel Head --> */}
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          No
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Username
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Jabatan
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Terlambat
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Lebih Awal
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
                        <td class="px-6 py-4">Layla Rabi'atus Syarifah </td>

                        <td class="px-6 py-4">Magang </td>
                        <td class="px-6 py-4">1 </td>
                        <td class="px-6 py-4">0 </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          2{" "}
                        </th>
                        <td class="px-6 py-4">Hidayatul muna </td>

                        <td class="px-6 py-4">Magang </td>
                        <td class="px-6 py-4">0 </td>
                        <td class="px-6 py-4">0 </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          3{" "}
                        </th>
                        <td class="px-6 py-4">Kamilia Qotrunnada </td>

                        <td class="px-6 py-4">Magang </td>
                        <td class="px-6 py-4">0 </td>
                        <td class="px-6 py-4">0 </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          4{" "}
                        </th>
                        <td class="px-6 py-4">nia </td>

                        <td class="px-6 py-4">Magang </td>
                        <td class="px-6 py-4">0 </td>
                        <td class="px-6 py-4">0 </td>
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

export default Kehadiran;
