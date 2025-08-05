// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@jaja" && password === "admin123") {
      navigate("/admin-panel"); // Redirige al panel
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Inicio de sesión del Administrador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo del admin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
