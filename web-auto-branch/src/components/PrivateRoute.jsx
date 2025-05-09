import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

function PrivateRoute() {
    const { isAuthenticated } = useAuthContext();

    if(!isAuthenticated)
        return <Navigate to="/login" />;

    return <Outlet />;
};

export default PrivateRoute;