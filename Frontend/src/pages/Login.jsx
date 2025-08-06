import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // evitar recarga del formulario

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })

      });

      const data = await response.json();

      if (data.status === 'success') {
        console.log('Login exitoso:', data.id_rol);
        if (data.id_rol === 1) {
          navigate('/home');
        } else if (data.id_rol === 2) {
          navigate('/admin-panel');
        }
      } else {
        setMensaje(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      setMensaje('Error del servidor. Intenta más tarde.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Iniciar sesión</h2>
      {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <label>Correo electrónico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/register">Ir a registro</Link>
      </div>
    </div>
  );
}
