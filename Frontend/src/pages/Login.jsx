import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Iniciar sesión</h2>
      <form>
        <label>Correo electrónico:</label>
        <input type="email" name="email" required />

        <label>Contraseña:</label>
        <input type="password" name="password" required />

        <button type="submit">Ingresar</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/register">Ir a registro</Link>
      </div>
    </div>
  );
}
