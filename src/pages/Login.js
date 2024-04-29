import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import Logo from "../components/absensi.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, seRole] = useState("admin");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email: email,
        password: password,
        role: role,
      };

      const response = await axios.post(
        "http://localhost:2024/api/login",
        data
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: `Berhasil Login Sebagai ${
            role.charAt(0).toUpperCase() + role.slice(1)
          }`,
          showConfirmButton: false,
          timer: 1500,
        });

        history.push(role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard");

        setTimeout(() => {
          window.location.reload();
        }, 1500);

        localStorage.setItem("id", response.data.data.id);
        localStorage.setItem("role", response.data.data.role);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Username / Password Salah",
      });
      console.error(error);
    }
  };
  return (
    // <!-- component -->
    <body class="bg-gray-700 ">
      <div class="flex min-h-screen items-center justify-center">
        <div class="min-h-1/2 bg-gray-900  border border-gray-900 rounded-2xl">
          <div class="mx-4 sm:mx-24 md:mx-34 lg:mx-56 mx-auto  flex items-center space-y-4 py-16 font-semibold text-gray-500 flex-col">
            <img
              viewBox="0 0 24 24"
              class=" h-16 w-h-16 text-white"
              fill="currentColor"
              src={Logo}
              alt=""
            />{" "}
            <h1 class="text-white text-2xl">
              selamat datang di aplikasi absensi
            </h1>
            <form
              action=""
              onSubmit={handleLogin}
              method="POST"
              className="w-72 "
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
                className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 mb-3"
                placeholder="password*"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border border-gray-700 "
                type="submit"
              >
                Login
              </button>
            </form>
            <p>
              Tidak memiliki akun?
              <a class="font-semibold text-sky-700" href="/register">
                Registrate
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
