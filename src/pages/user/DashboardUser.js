import React from "react";
import Sidebar from "../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarDays,
  faCircleXmark,
  faClockFour,
} from "@fortawesome/free-regular-svg-icons";
import Navbar from "../../components/NavbarUser";

function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className="content-page container p-8 bg-slate-200 ml-0 md:ml-64 mt-12">
          <h1 className="judul text-3xl font-semibold text-center">
            Selamat Datang
          </h1>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-12">
            {/* Ubah class untuk lebar saat di mode desktop */}
            <div className="pl-2 h-32 bg-green-400 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Masuk</p>
                  <p className="text-lg">Absen masuk.</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" />
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-red-400 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Pulang</p>
                  <p className="text-lg">Absen pulang.</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" />{" "}
                  {/* Menggunakan properti size untuk memperbesar ikon */}
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-red-800 rounded-lg shadow-md md:w-auto">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Izin</p>
                  <p className="text-lg">Ajukan Izin.</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faCircleXmark} size="2x" />{" "}
                  {/* Menggunakan properti size untuk memperbesar ikon */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-3 gap-4 flex-col md:flex-row">
            <div className="pl-2 h-32 w-full md:w-80 bg-blue-400 rounded-lg shadow-md md:mr-20">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Cuti</p>
                  <p className="text-lg">Ajukan cuti.</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faCalendarDays} size="2x" />{" "}
                  {/* Menggunakan properti size untuk memperbesar ikon */}
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 w-full md:w-80 bg-yellow-400 rounded-lg shadow-md md:ml-0 mt-4 md:mt-0">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Lembur</p>
                  <p className="text-lg">Ajukan lembur.</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faClockFour} size="2x" />{" "}
                  {/* Menggunakan properti size untuk memperbesar ikon */}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-12">
            <div className="bg-green-400 rounded-lg shadow-md p-4 md:w-full lg:w-auto">
              {" "}
              {/* Ubah lebar saat di mode ponsel */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-lg">Total Absen</p>
                  <p className="text-white text-md">
                    Jumlah absen yang tercatat
                  </p>
                </div>
                <div className="text-white text-2xl font-semibold">100</div>
              </div>
            </div>
            <div className="bg-red-800 rounded-lg shadow-md p-4 md:w-full lg:w-auto">
              {" "}
              {/* Ubah lebar saat di mode ponsel */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-lg">Total Izin</p>
                  <p className="text-white text-md">
                    Jumlah izin yang diajukan
                  </p>
                </div>
                <div className="text-white text-2xl font-semibold">2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
