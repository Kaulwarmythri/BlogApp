import Home from "./components/pages/home/Home";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/login/Login";
import Settings from "./components/pages/settings/Settings";
import Single from "./components/pages/single/Single";
import Write from "./components/pages/write/Write";
import Topbar from "./components/topbar/Topbar";
import react from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { Context } from "./context/AuthContext";

function App() {
  const {user} = react.useContext(Context);
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register/" element={user ? <Home/> : <Register />} />
        <Route path="login/" element={user ? <Home/> : <Login />} />
        <Route path="write/" element={user ? <Write/> : <Register />} />
        <Route path="settings/" element={user ? <Settings/> : <Register />} />
        <Route path="post/:postId" element={<Single />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
