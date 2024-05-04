import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import Logo from "../components/absensi.png";

function RegisterUser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [idOrganisasi, setidOrganisasi] = useState("");
  const [role, setRole] = useState("USER");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:2024/api/user/register`,
        {
          username,
          email,
          password,
          idOrganisasi,
          role,
        }
      );

      if (response.data === "Username already taken") {
        Swal.fire({
          icon: "error",
          title: "Username sudah terdaftar. Pilih username lain.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setShow(false);
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
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setShow(false);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan saat mendaftar. Coba lagi nanti.",
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
              <input
                className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 focus:border-blue-700 mb-3"
                placeholder="organisasi"
                list="organisasiList"
                value={idOrganisasi}
                onChange={(e) => setidOrganisasi(e.target.value)}
                required
              />
              <datalist id="organisasiList">
                <option value="SMK Bina Nusantara Semarang"></option>
                <option value="SMK Bina Nusantara Demak"></option>
                <option value="Excellent Computer"></option>
                {/* <!-- tambahkan opsi lainnya sesuai kebutuhan --> */}
              </datalist>
              <input
                className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 mb-3"
                placeholder="password*"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />{" "}
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
              />{" "}
              Show Password
              <button
                className="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border border-gray-700 "
                type="submit"
              >
                Register
              </button>
            </form>
            <br />
            <p>
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
