import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Página no encontrada</h1>
      <p style={styles.text}>
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link to="/" style={styles.link}>
        Volver al inicio
      </Link>
    </div>
  );
}

const styles = {
  container: {
    padding: '4rem',
    textAlign: 'center',
    backgroundColor: '#f8f8f8',
    height: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    color: '#c0392b',
  },
  text: {
    fontSize: '1.2rem',
    margin: '1rem 0',
  },
  link: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};
