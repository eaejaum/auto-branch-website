import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/404/NotFound";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import Branches from "./pages/Branches.jsx/Branches";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/branches" element={<Branches />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
