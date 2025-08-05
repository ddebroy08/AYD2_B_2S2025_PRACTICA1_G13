import { Link } from 'react-router-dom';

export default function UpdateProfile() {
  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Actualizar perfil</h2>
      <form>
        <label>Nombre completo:</label>
        <input type="text" name="nombre" required />

        <label>Correo electrónico:</label>
        <input type="email" name="email" required />

        <label>Contraseña:</label>
        <input type="password" name="password" required />

        <label>NIT:</label>
        <input type="text" name="nit" />

        <button type="submit">Actualizar</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/">Volver al login</Link> | <Link to="/upload-photo">Siguiente</Link>
      </div>
    </div>
  );
}
