import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

function Perkaryawan() {
  const [listAbsensi, setListAbsensi] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const idAdmin = localStorage.getItem("adminId");

  const getAllUserByAdmin = async () => {
    try {
      const usList = await axios.get(
        `http://localhost:2024/api/user/${idAdmin}/users`
      );
      setListUser(usList.data);
      console.log(usList);
    } catch (error) {
      console.log(error);
    }
  };

  const getAbsensiByUserId = async (userId) => {
    try {
      const abs = await axios.get(`http://localhost:2024/api/absensi/getByUserId/${userId}`);
      setListAbsensi(abs.data);
    } catch (error) {
      console.log(error);
      Swal.fire("Gagal", "Gagal Mengambil data ", "error");
    }
  };

  const handleUserChange = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);
    getAbsensiByUserId(userId);
  };

  const handleExport = () => {
    window.location.href = `http://localhost:2024/api/absensi/rekap/export/${selectedUser}`;
  };

  useEffect(() => {
    getAllUserByAdmin();
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
        <div className="sm:ml-64 content-page container p-8 ml-0 md:ml-64 mt-12">
          <div className="p-4">
            <div className="p-5 mt-10">
              <main id="content" className="flex-1 p-4 sm:p-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between">
                    <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      Rekap Perkaryawan
                    </h6>
                  </div>
                  <hr />
                  <form
                    action=""
                    method="post"
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5"
                  >
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 js-example-basic-single"
                      id="id_user"
                      name="id_user"
                      onChange={handleUserChange}
                      value={selectedUser}
                    >
                      <option value="">Pilih Karyawan</option>
                      {listUser.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.username}
                        </option>
                      ))}
                    </select>
                    <div className="flex sm:flex-row gap-4 mx-auto items-center">
                      <button
                        type="button"
                        className="bg-indigo-500 hover:bg-indigo text-white font-bold py-2 px-4 rounded inline-block"
                        onClick={() => getAbsensiByUserId(selectedUser)}
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                      <button
                        type="button"
                        className="exp bg-green-500 hover:bg-green text-white font-bold py-2 px-4 rounded inline-block ml-auto"
                        onClick={handleExport}
                      >
                        <FontAwesomeIcon icon={faFileExport} />
                      </button>
                    </div>
                  </form>

                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                    {/* <h5 className="mb-2 text-l font-bold text-gray-900 dark:text-white">
                      Rekap Atas Nama : {listUser.find(user => user.id === selectedUser)?.username || "-"} 
                    </h5> */}

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            No
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Nama
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Tanggal
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Jam Masuk
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Foto Masuk
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Jam Pulang
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Foto Pulang
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Jam Kerja
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {listAbsensi.map((absensi, index) => (
                          <tr key={absensi.id}>
                            <td className="px-6 py-3">{index + 1}</td>
                            <td className="px-6 py-3">{absensi.user.username}</td>
                            <td className="px-6 py-3">{absensi.tanggalAbsen}</td>
                            <td className="px-6 py-3">{absensi.jamMasuk}</td>
                            <td className="px-6 py-3">
                              <img src={absensi.fotoMasuk} alt="Foto Masuk" />
                            </td>
                            <td className="px-6 py-3">{absensi.jamPulang}</td>
                            <td className="px-6 py-3">
                              <img src={absensi.fotoPulang} alt="Foto Pulang" />
                            </td>
                            <td className="px-6 py-3">{absensi.user.shift.namaShift}</td>
                            <td className="px-6 py-3">{absensi.statusAbsen}</td>
                          </tr>
                        ))}
                      </tbody>
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
