import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavbarAdmin";
import Sidebar from "../../../components/SidebarUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFloppyDisk,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader"; // Import Loader component

function EditOrganisasi() {
  const { id } = useParams();
  const [namaOrganisasi, setNamaOrganisasi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nomerTelepon, setNomerTelepon] = useState("");
  const [emailOrganisasi, setEmailOrganisasi] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [fotoOrganisasi, setFotoOrganisasi] = useState(null);
  const [fotoUrl, setFotoUrl] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

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
          `http://localhost:2024/api/organisasi/getById/${id}`,
          config
        );
        const dataOrganisasi = response.data;

        // Mengisi state dengan data yang didapatkan dari API
        setNamaOrganisasi(dataOrganisasi.namaOrganisasi);
        setAlamat(dataOrganisasi.alamat);
        setEmailOrganisasi(dataOrganisasi.emailOrganisasi);
        setNomerTelepon(dataOrganisasi.nomerTelepon);
        setKecamatan(dataOrganisasi.kecamatan);
        setKabupaten(dataOrganisasi.kabupaten);
        setProvinsi(dataOrganisasi.provinsi);
        setFotoUrl(dataOrganisasi.fotoOrganisasi); // Set initial URL
      } catch (error) {
        alert("Terjadi kesalahan Sir! " + error);
      }
    };

    fetchData();
  }, [id]); // Memastikan useEffect dipanggil kembali ketika nilai id berubah

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const fotoOrganisasiChangeHandler = (event) => {
    setFotoOrganisasi(event.target.files[0]);
    setFotoUrl(""); // Clear the URL when a new file is selected
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("namaOrganisasi", namaOrganisasi);
    formData.append("alamat", alamat);
    formData.append("nomerTelepon", nomerTelepon);
    formData.append("emailOrganisasi", emailOrganisasi);
    formData.append("kecamatan", kecamatan);
    formData.append("kabupaten", kabupaten);
    formData.append("provinsi", provinsi);
    if (fotoOrganisasi) {
      formData.append("image", fotoOrganisasi);
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      setLoading(true); // Set loading to true before the request
      const response = await axios.put(
        `http://localhost:2024/api/organisasi/editById/${id}`,
        formData,
        config
      );
      setLoading(false); // Set loading to false after the request is complete

      Swal.fire("Berhasil", "Organisasi berhasil diperbarui!", "success");
    } catch (error) {
      setLoading(false); // Set loading to false in case of an error
      Swal.fire(
        "Gagal",
        "Terjadi kesalahan saat memperbarui organisasi",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {loading && <Loader />} {/* Show loader when loading */}
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
                    Edit Organisasi
                  </h6>
                </div>

                <hr />

                <div className="mt-5 text-left">
                  {/* <!-- Form Update Organisasi --> */}
                  <form
                    id="updateForm"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                  >
                    <div className="mt-5 text-center">
                      <img
                        className="mb-5 rounded-full w-48 h-48 mx-auto"
                        src={
                          fotoOrganisasi
                            ? URL.createObjectURL(fotoOrganisasi)
                            : fotoUrl
                        }
                        alt="Foto Organisasi"
                      />
                      <div className="flex justify-center mt-4">
                        <label htmlFor="fileInput" className="cursor-pointer">
                          <span className="z-20 block rounded-xl border-2 border-white bg-blue-100 p-4 text-blue-700 active:bg-blue-50">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </span>
                        </label>
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          onChange={fotoOrganisasiChangeHandler}
                          className="hidden"
                        />
                      </div>
                    </div>
                    <input type="hidden" name="id_organisasi" value={id} />
                    <div className="grid md:grid-cols-2 md:gap-6 mt-5">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="nama_organisasi"
                          id="nama_organisasi"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                          value={namaOrganisasi}
                          onChange={handleInputChange(setNamaOrganisasi)}
                        />
                        <label
                          htmlFor="nama_organisasi"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Nama Organisasi
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="alamat"
                          id="alamat"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                          value={alamat}
                          onChange={handleInputChange(setAlamat)}
                        />
                        <label
                          htmlFor="alamat"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Alamat
                        </label>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="nomer_telepon"
                          id="nomer_telepon"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                          value={nomerTelepon}
                          onChange={handleInputChange(setNomerTelepon)}
                        />
                        <label
                          htmlFor="nomer_telepon"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Nomer Telepon
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="email"
                          name="email_organisasi"
                          id="email_organisasi"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                          value={emailOrganisasi}
                          onChange={handleInputChange(setEmailOrganisasi)}
                        />
                        <label
                          htmlFor="email_organisasi"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Email Organisasi
                        </label>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="kecamatan"
                          id="kecamatan"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                          value={kecamatan}
                          onChange={handleInputChange(setKecamatan)}
                        />
                        <label
                          htmlFor="kecamatan"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Kecamatan
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="kabupaten"
                          id="kabupaten"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                          value={kabupaten}
                          onChange={handleInputChange(setKabupaten)}
                        />
                        <label
                          htmlFor="kabupaten"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Kabupaten
                        </label>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          name="provinsi"
                          id="provinsi"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          autoComplete="off"
                          required
                          value={provinsi}
                          onChange={handleInputChange(setProvinsi)}
                        />
                        <label
                          htmlFor="provinsi"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Provinsi
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <a
                        href="/admin/organisasi"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} /> Kembali
                      </a>
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        <FontAwesomeIcon icon={faFloppyDisk} /> Simpan
                      </button>
                    </div>
                  </form>
                  {/* <!-- End Form Update Organisasi --> */}
                </div>
              </div>
              {/* <!-- End Card --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrganisasi;
