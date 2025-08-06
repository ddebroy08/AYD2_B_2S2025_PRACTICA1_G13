import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nit, setNit] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [esExito, setEsExito] = useState(false); // para saber si es éxito o error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      nombre,
      email,
      password,
      nit,
      fecha_nacimiento: fechaNacimiento,
    };

    try {
      const res = await fetch("http://localhost:5000/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.status === 201) {
        setEsExito(true);
        alert("✅ Usuario creado correctamente. Redirigiendo...");
        setTimeout(() => {
          navigate("/");
        }, 2000); // redirige después de 2 segundos
      } else {
        setEsExito(false);
        setMensaje(data.message || "❌ Error al registrar usuario");
      }
    } catch (error) {
      setEsExito(false);
      alert("❌ Error en el servidor");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Registro de nuevo usuario</h2>

      {mensaje && (
        <p style={{ color: esExito ? "green" : "red", fontWeight: "bold" }}>
          {mensaje}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label>Nombre completo:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Correo electrónico:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Contraseña:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>NIT:</label>
        <input type="text" value={nit} onChange={(e) => setNit(e.target.value)} required />

        <label>Fecha de nacimiento:</label>
        <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />

        <button type="submit">Registrarse</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/">Volver al login</Link>
      </div>
    </div>
  );
}
