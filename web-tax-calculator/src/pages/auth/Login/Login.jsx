import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuthContext();

    function handleLogin() {
        login();
        navigate("/home");
    };

    return (
        <>
            <h1>Login</h1>
            <button onClick={handleLogin}>Entrar</button>
            <button onClick={() => navigate("/register")}>Registro</button>
        </>
    )
};

export default Login;