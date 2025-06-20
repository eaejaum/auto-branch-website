import { useAuthContext } from "../../../context/authContext";
import { useState } from "react";
import { Button, Checkbox, Container, Flex, Link, Spinner, Text } from "@radix-ui/themes";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login, error, loading } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const req = await login(email, password, rememberUser);
      if (req) navigate("/vehicles");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>
        Auto<span className="titleSpan">Branch</span>
      </h1>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <label htmlFor="email-input" className="inputLabel">Email</label>
        <input
          id="email-input"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Digite seu email..."
          style={{ border: error ? "1px solid red" : "1px solid #ccc" }}
        />

        <label htmlFor="password-input" className="inputLabel">Senha</label>
        <input
          id="password-input"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Digite sua senha..."
          style={{ border: error ? "1px solid red" : "1px solid #ccc" }}
        />

        {error && <span className="errorMessage">{error}</span>}

        <Text as="label" size="2" htmlFor="remember-checkbox" style={{ marginBottom: "10px" }}>
          <Flex gap="2">
            <Checkbox
              id="remember-checkbox"
              checked={rememberUser}
              onClick={() => setRememberUser(!rememberUser)}
              style={{ cursor: "pointer" }}
            />
            Lembrar de mim
          </Flex>
        </Text>

        <Button id="login-button" type="submit" className="authButton">
          {loading ? <Spinner /> : "Entrar"}
        </Button>
      </form>
    </Container>
  );
}

export default Login;