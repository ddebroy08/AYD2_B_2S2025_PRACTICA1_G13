import { useEffect, useState } from "react";

export default function WatchHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/watch-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setHistory(data.history || []);
        } else {
          setError(data.message || "No se pudo obtener el historial.");
        }
      } catch (err) {
        setError("Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Historial de Reproducción</h2>

      {loading && <p>Cargando...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && history.length === 0 && (
        <p>No hay reproducciones registradas.</p>
      )}

      {!loading && history.length > 0 && (
        <ul style={styles.list}>
          {history.map((item, index) => (
            <li key={index} style={styles.item}>
              <strong>Título:</strong> {item.title} <br />
              <strong>Fecha:</strong> {new Date(item.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  item: {
    marginBottom: "1rem",
    padding: "1rem",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
  },
  error: {
    color: "red",
  },
};
