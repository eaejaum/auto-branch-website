import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/404/NotFound";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/auth/Login/Login";
import Branch from "./pages/Branches/Branch";
import Vehicle from "./pages/Vehicles/Vehicle";
import Employee from "./pages/Employees/Employee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/branches" element={<Branch />} />
          <Route path="/vehicles" element={<Vehicle />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
