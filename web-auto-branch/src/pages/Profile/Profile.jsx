import { useState } from "react";
import { Button, Container, Spinner } from "@radix-ui/themes";
import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../context/authContext";
import styles from "./Profile.module.css";

function Profile() {
    const { user, editProfile, error, loading } = useAuthContext();
    const [name, setName] = useState(user ? user.name : "");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setSuccess("");
        const req = await editProfile(name, password ? password : null);
        if (req) {
            setPassword("");
            setSuccess("Dados atualizados com sucesso!");
        }
    }

    return (
        <>
            <Navbar />
            <Container className={styles.container}>
                <h1>Meu Perfil</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className="inputLabel" htmlFor="profile-name">Nome</label>
                    <input
                        id="profile-name"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Digite seu nome..."
                        style={{ border: error ? "1px solid red" : "1px solid #ccc" }}
                    />
                    <label className="inputLabel" htmlFor="profile-password">Nova Senha</label>
                    <input
                        id="profile-password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Digite sua nova senha..."
                        style={{ border: error ? "1px solid red" : "1px solid #ccc" }}
                    />
                    {error && <span className="errorMessage">{error}</span>}
                    {success && <span className="successMessage">{success}</span>}
                    <Button id="profile-submit" type="submit" className="authButton">
                        {loading ? <Spinner /> : "Salvar"}
                    </Button>
                </form>
            </Container>
        </>
    );
}

export default Profile;
