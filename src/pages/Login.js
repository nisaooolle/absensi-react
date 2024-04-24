import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const history = useHistory();

  // const login = async (e) => {
  //   e.preventDefault();
  //   axios.get("http://localhost:2024/api/login").then(({ data }) => {
  //     const user = data.find(
  //       (x) => x.email === email && x.password === password
  //     );
  //     if (user) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Selamat Datang!",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       localStorage.setItem("id", user.id);
  //       history.push("/");
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1000);
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Email Or Password Not Found",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     }
  //   });
  // };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, seRole] = useState("admin");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
      role: role,
    };
    try {
      const response = await axios.post(`http://localhost:2024/api/login`, data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Login Sebagai Adminn",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin/dashboard");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        localStorage.setItem("id", response.data.data.id);
        localStorage.setItem("role", response.data.data.data.role);
        localStorage.setItem("token", response.data.data.token);
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
            <svg
              viewBox="0 0 24 24"
              class=" h-12 w-12 text-white"
              fill="currentColor"
            >
              <g>
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </g>
            </svg>

            <h1 class="text-white text-2xl">
              selamat datang di aplikasi absensi
            </h1>
            <form action="" onSubmit={handleLogin} method="POST" className="w-72 ">
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
