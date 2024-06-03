import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

function Shift() {
  const [userData, setUserData] = useState([]);
  const idAdmin = localStorage.getItem("adminId");
  const [karyawan, setKaryawan] = useState("");

  const getallUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:2024/api/user/${idAdmin}/users`
      );
      setKaryawan(res.data.length);
    } catch (error) {}
  };

  const getAllShift = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:2024/api/shift/getall-byadmin/${idAdmin}`
      );

      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const deleteData = async (id) => {
    Swal.fire({
      title: "Anda Ingin Menghapus Data ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:2024/api/shift/delete/` + id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          Swal.fire({
            icon: "success",
            title: "Dihapus!",
            showConfirmButton: false,
          });

          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Gagal Menghapus Data",
          });
        }
      }
    });
  };

  useEffect(() => {
    getAllShift();
    getallUser();
  }, []);
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
                  Data Shift
                </h6>
                <a
                  type="button"
                  href="/admin/addshift"
                  class="text-white bg-indigo-500  focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
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
                        Nama shift
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Waktu Masuk
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Waktu pulang
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Jumlah karyawan
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Admin
                      </th>
                      <th scope="col" class="px-6 py-3 text-center">
                        aksi
                      </th>
                    </tr>
                  </thead>
                  {/* <!-- Tabel Body --> */}
                  <tbody class="text-left">
                    {userData.map((shift, index) => (
                      <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        key={index}
                      >
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>
                        <td class="px-6 py-4">{shift.namaShift}</td>
                        <td class="px-6 py-4">{shift.waktuMasuk}</td>
                        <td class="px-6 py-4">{shift.waktuPulang}</td>
                        <td class="px-6 py-4">{karyawan}</td>
                        <td class="px-6 py-4">{shift.admin.username} </td>
                        <td className="py-3">
                          <div className="flex items-center -space-x-4 ml-12">
                            <a href={`/admin/editS/${shift.id}`}>
                              <button className="z-30 block rounded-full border-2 border-white bg-yellow-100 p-4 text-yellow-700 active:bg-red-50">
                                <span className="relative inline-block">
                                  <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="h-4 w-4"
                                  />
                                </span>
                              </button>
                            </a>

                            <button
                              className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 active:bg-red-50"
                              onClick={() => deleteData(shift.id)}
                            >
                              <span className="relative inline-block">
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="h-4 w-4"
                                />
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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

export default Shift;
