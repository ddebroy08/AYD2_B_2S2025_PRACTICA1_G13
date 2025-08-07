import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // debe guardarse así al hacer login

  return (
    <nav style={styles.nav}>
      <Link to="/home" style={styles.link}>Inicio</Link>
      <Link to="/admin-login" style={styles.link}>Admin</Link>

      {!token && (
        <>
          <Link to="/" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Registro</Link>
        </>
      )}
        <>
          <Link to="/update-user" style={styles.link}>Actualizar Perfil</Link>
          <Link to="/upload-photo" style={styles.link}>Subir Foto</Link>
          <Link to="/add-card" style={styles.link}>Agregar Tarjeta</Link>
          <Link to="/update-card" style={styles.link}>Actualizar Tarjeta</Link>
          <Link to="/add-subscription" style={styles.link}>Suscripción</Link>
          <Link to="/cancel-subscription" style={styles.link}>Cancelar Suscripción</Link>
          <Link to="/watch-history" style={styles.link}>Historial</Link>
        </>
   

      {token && isAdmin && (
        <>
          <Link to="/admin-panel" style={styles.link}>Panel Admin</Link>
          <Link to="/admin/add-video" style={styles.link}>Agregar Video</Link>
          <Link to="/admin/all" style={styles.link}>Ver Todos</Link>
          <Link to="/admin/by-year" style={styles.link}>Buscar por Año</Link>
          <Link to="/admin/by-title" style={styles.link}>Buscar por Título</Link>
          
        </>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
};
