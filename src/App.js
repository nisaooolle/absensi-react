import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
    <main>
      <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/register" component={Register} exact />
      </Switch>
    </main>
    </BrowserRouter>
  );
}

export default App;
