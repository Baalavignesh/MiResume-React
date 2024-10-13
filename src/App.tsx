import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import withAuth from "./HOC/withAuth";
import { PRIMARY } from "./constants/colors";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Error from "./pages/error";
import MyProfile from "./pages/profile";
import About from "./pages/about";

PRIMARY
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" Component={withAuth(Dashboard)} />
        <Route path="/profile" Component={withAuth(MyProfile)} />
        <Route path="/about" Component={(About)} />
        <Route path="/" Component={Login} />
        <Route path="*" Component={Error} />
      </Routes>
    </Router>
  );
}

export default App;
