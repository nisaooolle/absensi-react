import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import Logo from "../components/absensi.png";

function Login() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:2024/api/login", {
        email: email,
        password: password,
      });

      if (data.data.role === "ADMIN") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.data.role);
        localStorage.setItem("adminId", data.data.id);

        Swal.fire({
          icon: "success",
          title: "Berhasil masuk",
        });
        history.push("/admin/dashboard");
      } else if (data.data.role === "USER") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.data.role);
        localStorage.setItem("userId", data.data.id);
        Swal.fire({
          icon: "success",
          title: "Berhasil masuk!",
        });
        history.push("/user/dashboard ");
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Email atau Password yang Anda masukan salah  ",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
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
              class=" h-16 w-h-16  text-white"
              fill="currentColor"
              src={Logo}
              alt=""
            />{" "}
            <h1 class="text-white text-2xl ">
              selamat datang di aplikasi absensi
            </h1>
            <form action="" onSubmit={login} method="POST" className="w-72 ">
              <input
                className="w-full p-2 bg-gray-900 text-gray-100 rounded-md  border border-gray-700 focus:border-blue-700 mb-3"
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="justify-center my-2">
                {" "}
                <input
                  className="w-full p-2 bg-gray-900 text-gray-100 rounded-md border border-gray-700 mb-3"
                  placeholder="password*"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
              />{" "}
              Show Password
              <button
                className="w-full my-5 h-10 bg-gray-50 rounded-full font-bold text-gray-900 border border-gray-700 "
                type="submit"
              >
                Login
              </button>
            </form>
            <p>
              Tidak memiliki akun?
              <a class="font-semibold text-sky-700" href="/registerUser">
                Register
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
