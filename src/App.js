import Register from "./pages/Register";
import DashboardUser from "./pages/user/DashboardUser";
import TabelAbsen from "./pages/user/TabelAbsen";
import Dashboard from "./pages/admin/Dashboard";
import Karyawan from "./pages/admin/masterdata/Karyawan";
import Jabatan from "./pages/admin/masterdata/Jabatan";
import Shift from "./pages/admin/masterdata/Shift";
import Lokasi from "./pages/admin/masterdata/Lokasi";
import Organisasi from "./pages/admin/masterdata/Organisasi";
import DetailKaryawan from "./pages/admin/detail/DetailKaryawan";
import DetailLokasi from "./pages/admin/detail/DetailLokasi";
import Simpel from "./pages/admin/rekapan/simpel";
import DetailOrganisasi from "./pages/admin/detail/DetailOrganisasi";
import Login from "./pages/Login";
import TabelCuti from "./pages/user/TabelCuti";
import TabelLembur from "./pages/user/TabelLembur";
import AddCuti from "./pages/user/AddCuti";
import AddLembur from "./pages/user/AddLembur";
import AddIzin from "./pages/user/AddIzin";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Addkaryawan from "./pages/admin/add/Addkaryawan";
import AddJabatan from "./pages/admin/add/AddJabatan";
import AddShift from "./pages/admin/add/AddShift";
import AddLokasi from "./pages/admin/add/AddLokasi";
import AddOrganisasi from "./pages/admin/add/AddOrganisasi";
import EditKaryawan from "./pages/admin/edit/EditKaryawan";
import EditJabatan from "./pages/admin/edit/EditJabatan";
import EditLokasi from "./pages/admin/edit/EditLokasi";
import EditOrganisasi from "./pages/admin/edit/EditOrganisasi";
import Perkaryawan from "./pages/admin/rekapan/Perkaryawan";
import Harian from "./pages/admin/rekapan/Harian";
import Mingguan from "./pages/admin/rekapan/Mingguan";
import Bulanan from "./pages/admin/rekapan/Bulanan";
import Absensi from "./pages/admin/data absensi/Absensi";
import Profile from "./pages/user/Profile";

function App() {
  const role = localStorage.getItem("role");
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />
          {/* start admin */}
          {/* Admin Routes */}
          {role === "ADMIN" && (
            <>
              <Route path="/admin/dashboard" component={Dashboard} exact />
              {/* master data */}
              <Route path="/admin/karyawan" component={Karyawan} exact />
              <Route path="/admin/jabatan" component={Jabatan} exact />
              <Route path="/admin/shift" component={Shift} exact />
              <Route path="/admin/lokasi" component={Lokasi} exact />
              <Route path="/admin/organisasi" component={Organisasi} exact />
              <Route path="/admin/detailK" component={DetailKaryawan} exact />
              <Route path="/admin/detailL" component={DetailLokasi} exact />
              <Route path="/admin/detailO" component={DetailOrganisasi} exact />
              <Route path="/admin/addkary" component={Addkaryawan} exact />
              <Route path="/admin/addjab" component={AddJabatan} exact />
              <Route path="/admin/addshift" component={AddShift} exact />
              <Route path="/admin/addlok" component={AddLokasi} exact />
              <Route path="/admin/addor" component={AddOrganisasi} exact />
              <Route path="/admin/editK" component={EditKaryawan} exact />
              <Route path="/admin/editJ" component={EditJabatan} exact />
              <Route path="/admin/editL" component={EditLokasi} exact />
              <Route path="/admin/editO" component={EditOrganisasi} exact />
              {/* rekapan */}
              <Route path="/admin/simpel" component={Simpel} exact />
              <Route path="/admin/perkaryawan" component={Perkaryawan} exact />
              <Route path="/admin/harian" component={Harian} exact />
              <Route path="/admin/mingguan" component={Mingguan} exact />
              <Route path="/admin/bulanan" component={Bulanan} exact />
              {/* data absensi */}
              <Route path="/admin/absensi" component={Absensi} exact />
            </>
          )}
          {/* end admin */}
          {/* /* start user */}
          {role === "USER" && (
            <>
              <Route path="/user/dashboard" component={DashboardUser} exact />
              <Route path="/user/history_absen" component={TabelAbsen} exact />
              <Route path="/user/history_absen" component={TabelAbsen} exact />
              <Route path="/user/history_cuti" component={TabelCuti} exact />
              <Route
                path="/user/history_lembur"
                component={TabelLembur}
                exact
              />
              <Route path="/user/cuti" component={AddCuti} exact />
              <Route path="/user/lembur" component={AddLembur} exact />
              <Route path="/user/izin" component={AddIzin} exact />
              <Route path="/user/profile" component={Profile} exact />
            </>
          )}
          {/* end user */}
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
