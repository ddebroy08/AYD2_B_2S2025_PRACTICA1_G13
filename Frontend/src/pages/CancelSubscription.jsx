import { useState } from "react";

export default function CancelSubscription() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {// Asegúrate de guardar el token en login

      const response = await fetch("http://localhost:5000/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Suscripción cancelada con éxito.");
      } else {
        setMessage(data.message || "Error al cancelar suscripción.");
      }
    } catch (error) {
      setMessage("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cancelar Suscripción</h2>
      <p>¿Estás seguro de que deseas cancelar tu suscripción?</p>
      <button onClick={handleCancel} disabled={loading} style={styles.button}>
        {loading ? "Cancelando..." : "Sí, cancelar suscripción"}
      </button>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
  },
  button: {
    padding: "0.8rem 1.5rem",
    backgroundColor: "#e63946",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  message: {
    marginTop: "1.5rem",
    fontWeight: "bold",
  },
};
