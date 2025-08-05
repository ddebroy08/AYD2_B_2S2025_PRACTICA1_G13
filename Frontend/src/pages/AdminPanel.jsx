import { Link } from 'react-router-dom';

export default function AdminPanel() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Panel de Administración</h2>

      <div style={styles.buttonContainer}>
        <Link to="/admin/add-video" style={styles.button}>Agregar Video</Link>
        <Link to="/admin/all" style={styles.button}>Ver Todos los Videos</Link>
        <Link to="/admin/by-title" style={styles.button}>Buscar por Título</Link>
        <Link to="/admin/by-year" style={styles.button}>Buscar por Año</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1.5rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  button: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
};
