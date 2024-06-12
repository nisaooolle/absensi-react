import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function EditJabatanSA() {
  const [jabatan, setJabatan] = useState("");
  const param = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:2024/api/jabatan/getById/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data;
        setJabatan(response.jabatan);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateAdmin = async (id) => {
    // e.preventDefault();
    const admin = { jabatan: jabatan };

    try {
      const res = await axios.put(
        `http://localhost:2024/api/jabatan/edit/${id}`,
        admin,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setJabatan(res.data.jabatan);
      Swal.fire("Berhasil", "Berhasil mengubah data", "success");
      history.push("/superadmin/admin");
    } catch (error) {
      console.log(error);
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
      </div>
      <div className=" sm:ml-64 content-page p-8  ml-14 md:ml-64 mb-12">
        <div className="p-4">
          <div className="p-5 mb-44">
            {/* // <!-- Card --> */}
            <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div class="flex justify-between">
                <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Update Jabatan
                </h6>
              </div>

              <hr />

              <div class="mt-5 text-left">
                {/* <!-- Form Input --> */}
                <form
                 onSubmit={updateAdmin}
                  action="https://demo-absen.excellentsistem.com/superadmin/aksi_edit_jabatan"
                  method="post"
                  enctype="multipart/form-data"
                >
                  <input type="hidden" name="id_jabatan" value="12" />

                  {/* <!-- Nama Jabatan Input --> */}
                  <div class="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="nama_jabatan"
                      id="nama_jabatan"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      autocomplete="off"
                      value={jabatan}
                      onChange={(e) => setJabatan(e.target.value)}
                      required
                    />
                    <label
                      for="nama_jabatan"
                      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Nama Jabatan
                    </label>
                  </div>

                  {/* <!-- Button --> */}
                  <div class="flex justify-between">
                    <a
                      class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      href="javascript:history.go(-1)"
                    >
                      <i class="fa-solid fa-arrow-left"></i>
                    </a>
                    <button
                      type="submit"
                      class="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                    >
                      <i class="fa-solid fa-floppy-disk"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditJabatanSA;
