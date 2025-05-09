import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
import { useState } from "react";
import { Box, Button, Checkbox, Container, Flex, Link, Text } from "@radix-ui/themes";

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
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        style={{
          width: "40%",
          height: "100%",
          margin: "0 auto",
          padding: "24px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "8px",
            color: "#5C92F6",
          }}
        >
          TaxCalculator
        </h1>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "4px" }}
        >
          <label style={{ fontWeight: "500", color: "#595959" }}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Digite seu email..."
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: error ? "1px solid red" : "1px solid #ccc",
              fontSize: "16px",
              outline: "none",
              marginBottom: "16px",
            }}
          />
          <label style={{ fontWeight: "500", color: "#595959" }}>Senha</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Digite sua senha..."
            style={{
              padding: "10px",
              borderRadius: "5px",
              border:  error ? "1px solid red" : "1px solid #ccc",
              fontSize: "16px",
              outline: "none",
              marginBottom: "16px",
            }}
          />

          {error && (
            <span style={{ color: "red", fontSize: "14px", marginBottom: "16px" }}>{error}</span>
          )}

          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox style={{ cursor: "pointer" }} />
              Lembrar de mim
            </Flex>
          </Text>

          <Button
            type="submit"
            style={{
              width: "100%",
              padding: "18px",
              backgroundColor: "#5C92F6",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              marginTop: "16px",
            }}
          >
            Entrar
          </Button>
          <Flex justify="center" style={{ marginTop: "10px" }}>
            <Link
              onClick={() => navigate("/register")}
              style={{
                fontSize: "14px",
                color: "#595959",
                textDecoration: "none",
              }}
            >
              Não possui uma conta?{" "}
              <span style={{ fontWeight: "500", color: "#5C92F6", cursor: "pointer" }}>Cadastre-se!</span>
            </Link>
          </Flex>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
