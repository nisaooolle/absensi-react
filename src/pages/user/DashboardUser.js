import React from "react";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarDays,
  faCircleXmark,
  faClockFour,
} from "@fortawesome/free-regular-svg-icons";
import Navbar from "../../components/Navbar";

function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div>
          <Sidebar />
        </div>
        <div className="content-page max-h-screen container p-8 min-h-screen bg-slate-200">
          <h1 className="judul text-3xl font-semibold text-center">
            Selamat Datang
          </h1>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-12">
            <div className="pl-2 h-32 bg-green-400 rounded-lg shadow-md">
              <div className="flex w-full h-full py-2 px-4 bg-gray-100 rounded-lg justify-between">
                <div className="my-auto">
                  <p className="font-bold">Masuk</p>
                  <p className="text-lg">Absen masuk.</p>
                </div>
                <div className="my-auto">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" />{" "}
                  {/* Menggunakan properti size untuk memperbesar ikon */}
                </div>
              </div>
            </div>
            <div className="pl-2 h-32 bg-red-400 rounded-lg shadow-md">
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
            <div className="pl-2 h-32 bg-red-800 rounded-lg shadow-md">
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
          <div className="flex justify-center mt-3 gap-4">
            {" "}
            <div className="pl-2 h-32 w-80 bg-blue-400 rounded-lg shadow-md mr-20">
              {" "}
              {/* Menggunakan w-80 untuk menyesuaikan lebar */}
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
            <div className="pl-2 h-32 w-80 bg-yellow-400 rounded-lg shadow-md ml-20">
              {" "}
              {/* Menggunakan w-80 untuk menyesuaikan lebar */}
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
