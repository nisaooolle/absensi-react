import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Swal from "sweetalert2";

function EditShift() {
  const { id } = useParams();
  const adminId = localStorage.getItem("adminId");
  const [namaShift, setNamaShift] = useState("");
  const [waktuMasuk, setWaktuMasuk] = useState("");
  const [waktuPulang, setWaktuPulang] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:2024/api/shift/getbyId/${id}`,
          config
        );
        const { namaShift, waktuMasuk, waktuPulang } = response.data;

        setNamaShift(namaShift);
        setWaktuMasuk(waktuMasuk);
        setWaktuPulang(waktuPulang);
      } catch (error) {
        alert("Terjadi kesalahan Sir! " + error);
      }
    };

    fetchData();
  }, [id]);
  const namaShiftChangeHandler = (event) => {
    setNamaShift(event.target.value);
  };

  const waktuMasukChangeHandler = (event) => {
    setWaktuMasuk(event.target.value);
  };

  const waktuPulangChangeHandler = (event) => {
    setWaktuPulang(event.target.value);
  };

  const submitActionHandler = async (event) => {
    event.preventDefault();

    // Melanjutkan dengan proses submit jika format waktu valid

    // Mendapatkan token autentikasi dari local storage
    const token = localStorage.getItem("token");

    // Membuat objek konfigurasi untuk menyertakan token dalam header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Menyertakan token dalam header "Authorization"
      },
    };

    const shiftData = {
      id: id, // ID shift yang ingin diedit
      namaShift,
      waktuMasuk,
      waktuPulang,
      admin: {
        // ID admin yang terkait dengan shift
        id: adminId,
      },
    };

    try {
      await axios.put(
        `http://localhost:2024/api/shift/editbyId/${id}`,
        shiftData,
        config
      );

      // Jika permintaan berhasil, tampilkan pesan sukses dan arahkan kembali ke halaman "/guru"
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Edit Berhasil",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href = "/admin/shift";
      }, 1500);
    } catch (error) {
      // Jika terjadi kesalahan, tampilkan pesan kesalahan
      alert("Terjadi kesalahan: " + error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className="sm:ml-64 content-page container p-8 ml-14 md:ml-64 mt-12">
          <div className="p-4">
            <div className="p-5">
              {/* <!-- Card --> */}
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Edit Shift
                  </h6>
                </div>

                <hr />

                <div className="mt-5 text-left">
                  {/* <!-- Form Input --> */}
                  <form onSubmit={submitActionHandler}>
                    {/* <input type="hidden" name="id_shift" value="8" /> */}

                    <div className="grid md:grid-cols-2 md:gap-6">
                      {/* <!-- Shift Input --> */}
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="nama_shift"
                          id="namaShift"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder="Nama Shift"
                          autoComplete="off"
                          required
                          value={namaShift}
                          onChange={namaShiftChangeHandler}
                        />
                        <label
                          htmlFor="nama_shift"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Nama Shift
                        </label>
                      </div>

                      {/* <!-- Jam Masuk Input --> */}
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="time"
                          name="waktu_masuk"
                          id="waktuMasuk"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder="Jam Masuk"
                          autoComplete="off"
                          required
                          value={waktuMasuk}
                          onChange={waktuMasukChangeHandler}
                        />
                        <label
                          htmlFor="jam_masuk"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Jam Masuk
                        </label>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                      {/* <!-- Jam Pulang Input --> */}
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="time"
                          name="waktu_pulang"
                          id="waktuPulang"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder="Jam Pulang"
                          autoComplete="off"
                          required
                          value={waktuPulang}
                          onChange={waktuPulangChangeHandler}
                        />
                        <label
                          htmlFor="jam_pulang"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Jam Pulang
                        </label>
                      </div>
                    </div>

                    {/* <!-- Button --> */}
                    <div className="flex justify-between">
                      <a
                        className="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        href="/admin/shift"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </a>
                      <button
                        type="submit"
                        className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                      >
                        <FontAwesomeIcon icon={faFloppyDisk} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditShift;
