import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
import { useState } from "react";
import { Box, Button, Checkbox, Container, Flex, Link, Text } from "@radix-ui/themes";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { login, error } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    await login(email, password);
    navigate("/home");
  }

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>
        Auto<span className="titleSpan">Branch</span>
      </h1>
      <form
        onSubmit={handleLogin}
        className={styles.loginForm}
      >
        <label className="inputLabel">Email</label>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Digite seu email..."
          style={{
            border: error ? "1px solid red" : "1px solid #ccc",
          }}
        />
        <label className="inputLabel">Senha</label>
        <input
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Digite sua senha..."
          style={{
            border: error ? "1px solid red" : "1px solid #ccc",
          }}
        />

        {error && (
          <span className="errorMessage">{error}</span>
        )}

        <Text as="label" size="2" style={{ marginBottom: "16px" }}>
          <Flex gap="2">
            <Checkbox style={{ cursor: "pointer" }} />
            Lembrar de mim
          </Flex>
        </Text>

        <Button type="submit" className={styles.loginButton}>
          Entrar
        </Button>
        <Flex justify="center" style={{ marginTop: "10px" }}>
          <Link onClick={() => navigate("/register")}>
            <span className={styles.newSeller}>Cadastrar novo vendedor</span>
          </Link>
        </Flex>
      </form>
    </Container>
  );
}

export default Login;
