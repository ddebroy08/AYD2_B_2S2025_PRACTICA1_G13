import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const idRol = localStorage.getItem("id_rol");

  const handleLogout = () => {
    localStorage.clear(); // Limpia todo
    navigate("/"); // Redirige al login o página principal
  };

  return (
    <nav style={styles.nav}>
      

      {!idRol && (
        <>
          <Link to="/" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Registro</Link>
        </>
      )}

      {idRol === "1" && (
        <>
          <Link to="/home" style={styles.link}>Inicio</Link>
          <Link to="/update-user" style={styles.link}>Actualizar Perfil</Link>
          <Link to="/upload-photo" style={styles.link}>Subir Foto</Link>
          <Link to="/add-card" style={styles.link}>Agregar Tarjeta</Link>
          <Link to="/update-card" style={styles.link}>Actualizar Tarjeta</Link>
          <Link to="/add-subscription" style={styles.link}>Suscripción</Link>
          <Link to="/cancel-subscription" style={styles.link}>Cancelar Suscripción</Link>
          <Link to="/history" style={styles.link}>Historial</Link>
          <button onClick={handleLogout} style={styles.logout}>Cerrar sesión</button>
        </>
      )}

      {idRol === "2" && (
        <>
          <Link to="/admin-panel" style={styles.link}>Panel Admin</Link>
          <Link to="/admin/add-video" style={styles.link}>Agregar Video</Link>
          <Link to="/admin/all" style={styles.link}>Ver Todos</Link>
          <Link to="/admin/by-year" style={styles.link}>Buscar por Año</Link>
          <Link to="/admin/by-title" style={styles.link}>Buscar por Título</Link>
          <button onClick={handleLogout} style={styles.logout}>Cerrar sesión</button>
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
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  logout: {
    backgroundColor: '#ff4d4d',
    border: 'none',
    color: '#fff',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};
