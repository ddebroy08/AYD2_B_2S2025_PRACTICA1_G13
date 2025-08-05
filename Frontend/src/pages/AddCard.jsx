import { Link } from 'react-router-dom';

export default function AddCard() {
  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Agregar tarjeta de crédito</h2>
      <form>
        <label>Número de tarjeta:</label>
        <input type="text" name="numero" required />

        <label>Fecha de vencimiento:</label>
        <input type="month" name="vencimiento" required />

        <label>Nombre del titular:</label>
        <input type="text" name="titular" required />

        <button type="submit">Guardar tarjeta</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/">Volver al login</Link> | <Link to="/update-card">Siguiente</Link>
      </div>
    </div>
  );
}
