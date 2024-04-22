import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import DashboardUser from "./pages/user/DashboardUser";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/user/dashboard" component={DashboardUser} exact />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
