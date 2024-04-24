import React from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";
import { faFileExport, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Harian() {
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
            <div class="p-5 ">
              <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-none shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-between">
                  <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Rekap Harian
                  </h6>
                </div>
                <hr />

                <form
                  method="get"
                  id="filterForm"
                  class="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5"
                >
                  <input
                    type="date"
                    class="appearance-none block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                    id="tanggal"
                    name="tanggal"
                    value=""
                  />

                  <div class="flex sm:flex-row gap-4 mx-auto items-center">
                    <button
                      type="button"
                      class="bg-indigo-500 hover:bg-indigo text-white font-bold py-2 px-4 rounded inline-block"
                      onclick="submitForm('filter')"
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <button
                      type="button"
                      class="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto"
                      onclick="submitForm('export')"
                    >
                       <FontAwesomeIcon icon={faFileExport} />
                    </button>
                  </div>
                </form>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 py-3">
                  <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white mt-5 mb-3">
                    Tidak Ada Absen Hari Ini !!
                  </h1>
                  <p class="text-center">Silahkan pilih tanggal lain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Harian;
