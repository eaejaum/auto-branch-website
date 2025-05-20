import { useAuthContext } from "../../../context/authContext";
import { useState } from "react";
import { Button, Checkbox, Container, Flex, Link, Spinner, Text } from "@radix-ui/themes";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login, loginError, loading } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const req = await login(email, password, rememberUser);
      if (req)
        navigate("/branches");
    } catch (err) {
      console.error(err);
    }
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
            border: loginError ? "1px solid red" : "1px solid #ccc",
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
            border: loginError ? "1px solid red" : "1px solid #ccc",
          }}
        />

        {loginError && (<span className="errorMessage">{loginError}</span>)}

        <Text as="label" size="2" style={{ marginBottom: "10px" }}>
          <Flex gap="2">
            <Checkbox checked={rememberUser} onClick={() => setRememberUser(!rememberUser)} style={{ cursor: "pointer" }} />
            Lembrar de mim
          </Flex>
        </Text>

        <Button type="submit" className="authButton">{loading ? <Spinner /> : "Entrar"}</Button>
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
