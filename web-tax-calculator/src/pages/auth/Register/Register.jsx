import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  function handleRegister() {
    navigate("/login");
  }

  return (
    <>
      <h1>Register</h1>
      <button onClick={handleRegister}>Login</button>
    </>
  );
}

export default Register;
