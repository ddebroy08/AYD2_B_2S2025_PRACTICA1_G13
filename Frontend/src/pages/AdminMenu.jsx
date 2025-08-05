import React from "react";

const AdminMenu = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Panel de Administración</h2>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => window.location.href = "/admin/add-video"}>
          ➕ Agregar Video
        </button>

        <button style={styles.button} onClick={() => window.location.href = "/admin/all"}>
          📋 Ver Todos los Videos
        </button>

        <button style={styles.button} onClick={() => window.location.href = "/admin/by-year"}>
          📅 Buscar Videos por Año
        </button>

        <button style={styles.button} onClick={() => window.location.href = "/admin/by-title"}>
          🔍 Buscar Videos por Título
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh"
  },
  title: {
    fontSize: "2rem",
    marginBottom: "2rem"
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    width: "250px"
  }
};

export default AdminMenu;
