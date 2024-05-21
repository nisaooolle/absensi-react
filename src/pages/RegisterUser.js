import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import Logo from "../components/absensi.png";

function RegisterUser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [idOrganisasi, setIdOrganisasi] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [organisasiList, setOrganisasiList] = useState([]);
  const [organisasi, setOrganisasi] = useState("");

  const history = useHistory();

  useEffect(() => {
    GetALLOrganisasi();
  }, []);

  const GetALLOrganisasi = async () => {
    try {
      const response = await axios.get("http://localhost:2024/api/organisasi/all");
      setOrganisasiList(response.data);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Gagal mendapatkan data organisasi", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Password tidak sesuai",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:2024/api/user/register", {
        username: username,
        email: email,
        password: password,
        idOrganisasi: idOrganisasi,
      });

      setShowPassword(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil Register",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error during registration:", error);

      const message = error.response?.data || "Terjadi kesalahan saat mendaftar. Coba lagi nanti.";
      setErrorMessage(message);
      Swal.fire({
        icon: "error",
        title:  "Akun sudah terdaftar",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <body className="bg-gray-700 ">
      <div className="flex min-h-screen items-center justify-center">
        <div className="min-h-1/2 bg-gray-900  border border-gray-900 rounded-2xl">
          <div className="mx-4 sm:mx-24 md:mx-34 lg:mx-56 mx-auto  flex items-center space-y-4 py-16 font-semibold text-gray-500 flex-col">
            <img
              viewBox="0 0 24 24"
              class=" h-16 w-h-16 text-white"
              fill="currentColor"
              src={Logo}
              alt=""
            />{" "}
            <h1 className="text-white text-2xl">
              selamat datang di aplikasi absensi
            </h1>
            <form
              action=""
              onSubmit={handleSubmit}
              method="POST"
              className="w-72 h-64"
            >
              <input
                className="w-full p-2 bg-gray-900 rounded-md  border border-gray-700 focus:border-blue-700 mb-3"
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="w-full p-2 bg-gray-900 rounded-md  border border-gray-700 focus:border-blue-700 mb-3"
                placeholder="nama lengkap"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <select
                className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 focus:border-blue-700 mb-3"
                value={organisasi}
                onChange={(e) => {
                  const selectedOrg = organisasiList.find(
                    (org) => org.namaOrganisasi === e.target.value
                  );
                  setOrganisasi(selectedOrg ? selectedOrg.id : "");
                }}
                required
              >
                <option value="" disabled hidden>
                  Pilih Organisasi
                </option>
                {organisasiList &&
                  organisasiList.map((org) => (
                    <option key={org.id} value={org.namaOrganisasi}>
                      {org.namaOrganisasi}
                    </option>
                  ))}
              </select>
              <div className="justify-center">
                <input
                  className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 mb-3"
                  placeholder="password*"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="text-rose-500 text-[10px]">
                  *Password harus besertakan angka dan huruf minimal 8 angka
                </span>
              </div>
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
              />{" "}
              Show Password
              <button
                className="w-full mt-2 h-10   bg-gray-50 rounded-full font-bold text-gray-900 border border-gray-700 "
                type="submit"
              >
                Register
              </button>
            </form>
            <br />
            <p className="py-4 ">
              Sudah mempunyai akun?
              <a className="font-semibold text-sky-700" href="/">
                Login
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </body>
  );
}

export default RegisterUser;
