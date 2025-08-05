import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Registro de nuevo usuario</h2>
      <form>
        <label>Nombre completo:</label>
        <input type="text" name="nombre" required />

        <label>Correo electrónico:</label>
        <input type="email" name="email" required />

        <label>Contraseña:</label>
        <input type="password" name="password" required />

        <label>NIT:</label>
        <input type="text" name="nit" />

        <label>Número de tarjeta:</label>
        <input type="text" name="tarjeta" />

        <label>Fecha de vencimiento:</label>
        <input type="month" name="vencimiento" />

        <label>Fotografía (opcional):</label>
        <input type="file" name="foto" />

        <button type="submit">Registrarse</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/">Volver al login</Link> | <Link to="/update-profile">Siguiente</Link>
      </div>
    </div>
  );
}
