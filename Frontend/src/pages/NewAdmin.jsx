import { useState } from "react";

export default function NewAdmin() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nombre, email, password };

    try {
      const response = await fetch("http://localhost:5000/new-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMensaje("✅ Admin creado exitosamente.");
        setNombre("");
        setEmail("");
        setPassword("");
      } else {
        setMensaje(`❌ Error: ${result.message}`);
      }
    } catch (error) {
      setMensaje("❌ Error en la solicitud.");
    }
  };

  return (
    <div className="container">
      <h2>Registro de Nuevo Administrador</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Contraseña:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Registrar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
