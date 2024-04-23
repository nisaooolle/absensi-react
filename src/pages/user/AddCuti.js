import React, { useState } from "react";
import Navbar from "../../components/NavbarUser";
import Sidebar from "../../components/SidebarUser";

function AddCuti() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar isOpen={sidebarOpen} />
        </div>
        <div className="content-page max-h-screen container p-8 min-h-screen ml-64">
          {" "}
          <h1 className="judul text-3xl font-semibold">Halaman Cuti</h1>
          <div className="add-cuti mt-12 bg-white p-5 rounded-xl shadow-lg border border-gray-300">
            <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
              Halaman Cuti
            </p>
            <form onSubmit={""}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative mb-3">
                  <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                    Awal Cuti
                  </label>
                  <input
                    type="date"
                    id="awalcuti"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukan Tanggal Awal Cuti"
                    //   value={nama}
                    //   onChange={(e) => setNama(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                    Akhir Cuti
                  </label>
                  <input
                    type="date"
                    id="akhircuti"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukan Tanggal Akhir Cuti"
                    // value={jabatan}
                    // onChange={(e) => setJabatan(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                    Masuk Kerja
                  </label>
                  <input
                    type="date"
                    id="masuk"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukan Tanggal Masuk Kerja"
                    // value={tanggalLahir}
                    // onChange={(e) => setTanggalLahir(e.target.value)}
                    required
                  />
                </div>{" "}
                <div className="relative">
                  <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                    Keperluan
                  </label>
                  <input
                    type="text"
                    id="keperluan"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukan Keperluan"
                    // value={noTelepon}
                    // onChange={(e) => setNoTelepon(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="block w-20 sm:w-24 rounded-lg text-black outline outline-[#0b409c] py-3 text-sm sm:text-xs font-medium"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCuti;
