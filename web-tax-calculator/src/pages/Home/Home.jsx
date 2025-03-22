import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

function Home() {
    const navigate = useNavigate();
    const { logout } = useAuthContext();

    function handleLogout() {
        logout();
        navigate("/login");
    };

    return (
        <>
            <h1>Home</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
};

export default Home;