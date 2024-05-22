import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import Logo from "../components/absensii.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import ikon dari react-icons

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
    // <body class="bg-slate-300">
    //   <div class="flex min-h-screen items-center justify-center">
    //     <div class="min-h-1/2 bg-gray-900  border border-gray-900 rounded-2xl">
    //       <div class="mx-4 sm:mx-24 md:mx-34 lg:mx-56 mx-auto  flex items-center space-y-4 py-16 font-semibold text-gray-500 flex-col">
    //         <img
    //           viewBox="0 0 24 24"
    //           class=" h-16 w-h-16  text-white"
    //           fill="currentColor"
    //           src={Logo}
    //           alt=""
    //         />{" "}
    //         <h1 class="text-white text-2xl ">
    //           selamat datang di aplikasi absensi
    //         </h1>
    //         <form action="" onSubmit={login} method="POST" className="w-72 ">
    //           <input
    //             className="w-full p-2 bg-gray-900 text-gray-100 rounded-md  border border-gray-700 focus:border-blue-700 mb-3"
    //             placeholder="email"
    //             type="email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             required
    //           />
    //           <div className="justify-center my-2">
    //             {" "}
    //             <input
    //               className="w-full p-2 bg-gray-900 text-gray-100 rounded-md border border-gray-700 mb-3"
    //               placeholder="password*"
    //               type={showPassword ? "text" : "password"}
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               required
    //             />
    //           </div>
    //           <input
    //             type="checkbox"
    //             onChange={() => setShowPassword(!showPassword)}
    //           />{" "}
    //           Show Password
    //           <button
    //             className="w-full my-5 h-10 bg-gray-50 rounded-full font-bold text-gray-900 border border-gray-700 "
    //             type="submit"
    //           >
    //             Login
    //           </button>
    //         </form>
    //         <p>
    //           Tidak memiliki akun?
    //           <a class="font-semibold text-sky-700" href="/registerUser">
    //             Register
    //           </a>{" "}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </body>

    // <!-- source:https://codepen.io/owaiswiz/pen/jOPvEPB -->
    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src={Logo} class="w-16 mx-auto" />
          </div>
          <div class="mt-12 flex flex-col items-center">
            <h1 class="text-2xl xl:text-3xl font-extrabold">Sign in</h1>
            <div class="w-full flex-1 mt-8">
              <form action="" onSubmit={login} method="POST">
                <div class="mx-auto max-w-xs">
                  <input
                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div class="relative mt-5">
                    <input
                      class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      placeholder="Password*"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)} // Mengubah state showPassword ketika ikon diklik
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}{" "}
                      {/* Menampilkan ikon view atau hide password sesuai dengan state showPassword */}
                    </span>
                  </div>
                  <button class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      class="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span class="ml-3">Sign In</span>
                  </button>
                  <p class="mt-6 text-xs text-gray-600 text-center">
                    Tidak memiliki akun?
                    <a
                      href="/registerUser"
                      class="border-b border-gray-500 border-dotted"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
