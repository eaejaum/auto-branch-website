import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { Spinner } from "@radix-ui/themes";

function PrivateRoute() {
    const { user, isAuthenticated, isRestoringSession } = useAuthContext();

    if (isRestoringSession) {
      return <Spinner />;
    }
  
    if (!user || !isAuthenticated) {
      return <Navigate to="/login" />;
    }
  
    return <Outlet />;
};

export default PrivateRoute;