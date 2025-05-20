import { useAuthContext } from "../../../context/authContext";
import React, { useState } from "react";
import { Box, Button, Container, Flex, Link, Spinner } from "@radix-ui/themes";
import { ChevronLeft } from "lucide-react";
import styles from "./Register.module.css";
// import { navigate } from "../../../utils/navigate";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { register, registerError, loading } = useAuthContext();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const req = await register(name, email, password);
      if (req)
        navigate("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Box className={styles.box}>
      <ChevronLeft className="backButton" onClick={() => navigate('/login')} />
      <Container className={styles.container}>
        <h1 className={styles.title}>
          Cadastro de {" "}<span className="titleSpan">Funcionário</span>
        </h1>
        <form
          onSubmit={(e) => handleRegister(e)}
          className={styles.registerForm}
        >
          <label className="inputLabel">Email</label>
          <input
            className="input"
            value={email}
            style={{
              border: registerError ? "1px solid red" : "1px solid #ccc",
            }}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Digite o email do funcionário..."
          />
          <label className="inputLabel">Nome</label>
          <input
            className="input"
            value={name}
            style={{
              border: registerError ? "1px solid red" : "1px solid #ccc",
            }}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Digite o nome do funcionário..."
          />
          <label className="inputLabel">Senha</label>
          <input
            className="input"
            value={password}
            style={{
              border: registerError ? "1px solid red" : "1px solid #ccc",
            }}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Crie uma senha para o usuário..."
          />
          {registerError && <span className="errorMessage">{registerError}</span>}
          <Button type="submit" className="authButton">{loading ? <Spinner /> : "Cadastrar"}</Button>
        </form>
      </Container>
    </Box>
  );
}

export default Register;
