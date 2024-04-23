import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DashboardUser from "./pages/user/DashboardUser";
import TabelAbsen from "./pages/user/TabelAbsen";
import Dashboard from "./pages/admin/Dashboard";
import Karyawan from "./pages/admin/Karyawan";
import Jabatan from "./pages/admin/Jabatan";
import Shift from "./pages/admin/Shift";
import Lokasi from "./pages/admin/Lokasi";
import Organisasi from "./pages/admin/Organisasi";
import TabelCuti from "./pages/user/TabelCuti";
import TabelLembur from "./pages/user/TabelLembur";
import AddCuti from "./pages/user/AddCuti";
import AddLembur from "./pages/user/AddLembur";
import AddIzin from "./pages/user/AddIzin";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />
          {/* start admin */}
          <Route path="/admin/dashboard" component={Dashboard} exact />
          <Route path="/admin/karyawan" component={Karyawan} exact />
          <Route path="/admin/jabatan" component={Jabatan} exact />
          <Route path="/admin/shift" component={Shift} exact />
          <Route path="/admin/lokasi" component={Lokasi} exact />
          <Route path="/admin/organisasi" component={Organisasi} exact />
          {/* end admin */}

          {/* start user */}
          <Route path="/user/dashboard" component={DashboardUser} exact />
          <Route path="/user/history_absen" component={TabelAbsen} exact />
          <Route path="/user/history_absen" component={TabelAbsen} exact />
          <Route path="/user/history_cuti" component={TabelCuti} exact />
          <Route path="/user/history_lembur" component={TabelLembur} exact />
          <Route path="/user/cuti" component={AddCuti} exact />
          <Route path="/user/lembur" component={AddLembur} exact />
          <Route path="/user/izin" component={AddIzin} exact />
          {/* end user */}
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
