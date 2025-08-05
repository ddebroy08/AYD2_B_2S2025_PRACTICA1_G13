import { Link } from 'react-router-dom';

export default function AddSubscription() {
  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Contratar suscripción</h2>
      <form>
        <label>Tipo de suscripción:</label>
        <select name="tipo" required>
          <option value="">Seleccionar</option>
          <option value="mensual">Mensual</option>
          <option value="trimestral">Trimestral</option>
          <option value="anual">Anual</option>
        </select>

        <label>Fecha de inicio:</label>
        <input type="date" name="fecha_inicio" required />

        <button type="submit">Activar suscripción</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/">Volver al login</Link>
      </div>
    </div>
  );
}
