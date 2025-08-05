import { Link } from 'react-router-dom';

export default function UpdateCard() {
  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Actualizar tarjeta de crédito</h2>
      <form>
        <label>Nuevo número de tarjeta:</label>
        <input type="text" name="numero" required />

        <label>Nuevo vencimiento:</label>
        <input type="month" name="vencimiento" required />

        <label>Nombre del titular:</label>
        <input type="text" name="titular" required />

        <button type="submit">Actualizar tarjeta</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/">Volver al login</Link> | <Link to="/add-subscription">Siguiente</Link>
      </div>
    </div>
  );
}
