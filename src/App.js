import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DashboardUser from "./pages/user/DashboardUser";
import Dashboard from "./pages/admin/Dashboard";
import Karyawan from "./pages/admin/Karyawan";
import Jabatan from "./pages/admin/Jabatan";
import Shift from "./pages/admin/Shift";
import Lokasi from "./pages/admin/Lokasi";
import Organisasi from "./pages/admin/Organisasi";

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
          <Route path="/user/dashboard" component={DashboardUser} exact />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
