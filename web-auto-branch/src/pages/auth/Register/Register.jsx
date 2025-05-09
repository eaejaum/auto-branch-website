import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const { register, error } = useAuthContext();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    await register(name, email, password);
    navigate("/login");
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={(e) => handleRegister(e)}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nome"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Senha"
        />
        {error && <span style={{ color: "red" }}>{error}</span>}
        <button type="submit">Cadastrar</button>
      </form>
      <button onClick={() => navigate("/login")}>Login</button>
    </>
  );
}

export default Register;
