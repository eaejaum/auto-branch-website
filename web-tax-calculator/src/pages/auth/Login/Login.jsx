import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const { login, error } = useAuthContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        await login(email, password);
        navigate("/home");
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={(e) => handleLogin(e)}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" />
                {error && <span style={{ color: "red" }}>{error}</span>}
                <button type="submit">Entrar</button>
            </form>
            <button onClick={() => navigate("/register")}>Registro</button>
        </>
    )
};

export default Login;