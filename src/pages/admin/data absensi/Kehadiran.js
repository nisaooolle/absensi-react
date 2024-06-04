import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import axios from "axios";

function Kehadiran() {
  const [allUser, setAllUser] = useState([]);
  const [allAbsensi, setAllAbsensi] = useState([]);
  const idAdmin = localStorage.getItem("adminId");
  const adminId = localStorage.getItem("adminId");
  const [lateCount, setLateCount] = useState(0);
  const [earlyCount, setEarlyCount] = useState(0);
  const [permissionCount, setPermissionCount] = useState(0);

  const getAllKaryawanUser = async () => {
    try {
      const all = await axios.get(
        `http://localhost:2024/api/user/${idAdmin}/users`
      );
      setAllUser(all.data);
      console.log(all);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAbsensiByAdmin = async () => {
    try {
      const abs = await axios.get(
        `http://localhost:2024/api/absensi/admin/${adminId}`
      );

      setAllAbsensi(abs.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllKaryawanUser();
    getAllAbsensiByAdmin();
  }, []);
 

  const getAbsensiByUserId = (userId, status) => {
    return allAbsensi.filter((abs) => abs.user.id === userId && abs.statusAbsen === status).length;
  };
  
  useEffect(() => {
    const userAbsensiCounts = allUser.map((user) => ({
      userId: user.id,
      lateCount: getAbsensiByUserId(user.id, "Terlambat"),
      earlyCount: getAbsensiByUserId(user.id, "Lebih Awal"),
      permissionCount: getAbsensiByUserId(user.id, "Izin"),
    }));
  
    userAbsensiCounts.forEach(({ userId, lateCount, earlyCount, permissionCount }) => {
      const userIndex = allUser.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        const updatedUser = { ...allUser[userIndex], lateCount, earlyCount, permissionCount };
        setAllUser((prevUsers) => {
          const newUsers = [...prevUsers];
          newUsers[userIndex] = updatedUser;
          return newUsers;
        });
      }
    });
  }, [allAbsensi, allUser]);
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
            <div className="p-5">
              <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Data Kehadiran
                  </h6>
                </div>
                <hr />
                <div className="relative overflow-x-auto mt-5">
                  <table
                    id="dataKehadiran"
                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                  >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Jabatan
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Terlambat
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Lebih Awal
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Izin
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-left">
                      {allUser.map((item, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {index + 1}
                          </th>
                          <td className="px-6 py-4">{item.username}</td>
                          <td className="px-6 py-4">
                            {item.jabatan
                              ? item.jabatan.namaJabatan
                              : "Tidak ada jabatan"}
                          </td>
                          <td className="px-6 py-4">{item.lateCount}</td>
                          <td className="px-6 py-4">{item.earlyCount}</td>
                          <td className="px-6 py-4">{item.permissionCount}</td>
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
    </div>
  );
}

export default Kehadiran;
