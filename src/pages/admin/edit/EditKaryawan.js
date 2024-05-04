import React from "react";
import Navbar from "../../../components/NavbarUser";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function EditKaryawan() {
  // const [author, setAuthor] = useState("");
  // const [judulBerita, setJudulBerita] = useState("");
  // const [image, setImage] = useState(null);
  // const [categoryId, setCategoryId] = useState(0);
  // const [category, setCategory] = useState([]);
  // const [isiBerita, setIsiBerita] = useState("");

  // const param = useParams();
  // const history = useHistory();

  // const updateKaryawan = async (e) => {
  //   e.preventDefault();
  //   e.persist();

  //   const formData = new FormData();
  //   formData.append("author", author);
  //   formData.append("judulBerita", judulBerita);
  //   formData.append("isiBerita", isiBerita);
  //   formData.append("categoryId", categoryId);
  //   formData.append("file", image);

  //   await axios
  //     .put(`${API_DUMMY}/bawaslu/api/berita/put/` + param.id, formData, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then(() => {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Berhasil Mengedit Berita",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //         history.push("/admin-berita");
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1500);
  //     })
  //     .catch((error) => {
  //       if (error.ressponse && error.response.status === 401) {
  //         localStorage.clear();
  //         history.push("/login");
  //       } else {
  //         console.log(error);
  //       }
  //     });
  // };

  // //get by id category
  // const getAllCategoryId = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/bawaslu/api/category-berita/all`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     setCategory(response.data.data.content);
  //     console.log(response.data.data.content);
  //   } catch (error) {
  //     console.error("Terjadi Kesalahan", error);
  //   }
  // };

  // useEffect(() => {
  //   axios
  //     .get(`${API_DUMMY}/bawaslu/api/berita/get/` + param.id, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((ress) => {
  //       const response = ress.data.data;
  //       setAuthor(response.author);
  //       setJudulBerita(response.judulBerita);
  //       setIsiBerita(response.isiBerita);
  //       setCategoryId(response.categoryBerita);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   getAllCategoryId();
  // }, []);

  // useEffect(() => {
  //   AOS.init();
  // },[]);
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="fixed">
          <Sidebar />
        </div>
        <div class=" sm:ml-64 content-page container p-8  ml-14 md:ml-64 mt-12">
          <div class="p-4 ">
            <div class="p-5 ">
              {/* <!-- Card --> */}
              <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-between">
                  <h6 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Edit Karyawan
                  </h6>
                </div>

                <hr />

                <div class="mt-5 text-left">
                  {/* <!-- Form Input --> */}
                  <form
                    action="https://demo-absen.excellentsistem.com/admin/aksi_edit_user"
                    method="post"
                    enctype="multipart/form-data"
                  >
                    <input type="hidden" name="id_user" value="4" />

                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        // value="Khoirul Nisa"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        autocomplete="off"
                        required
                      />
                      <label
                        for="username"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Username
                      </label>
                    </div>

                    <div class="grid md:grid-cols-2 md:gap-6 mb-6">
                      {/* <!-- Shift Input --> */}

                      <div class="relative z-0 w-full mb-6 group">
                        <label
                          for="id_jabatan"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Jabatan
                        </label>
                        <select
                          name="id_jabatan"
                          class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        >
                          <option selected value="10">
                            Magang{" "}
                          </option>
                          <option value="10">Magang </option>
                        </select>
                      </div>
                      <div class="relative z-0 w-full mb-6 group">
                        <label
                          for="id_jabatan"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Shift
                        </label>
                        <select
                          name="id_shift"
                          class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        >
                          <option selected value="8">
                            Normal{" "}
                          </option>
                          <option value="8">Normal </option>
                        </select>
                      </div>
                    </div>

                    {/* <!-- Button --> */}
                    <div class="flex justify-between">
                      <a
                        class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        href="/admin/karyawan"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </a>
                      <button
                        type="submit"
                        class="text-white bg-indigo-500  focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
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

export default EditKaryawan;
