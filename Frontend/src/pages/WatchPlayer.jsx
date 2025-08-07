import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function WatchPlayer() {
  const location = useLocation();
  const { video } = location.state || {};
  const [error, setError] = useState("");

  useEffect(() => {
    const registrarVisualizacion = async () => {
      if (!video) return;

      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/register-watch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ videoId: video.id }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Error al registrar la reproducción.");
        }
      } catch {
        setError("No se pudo conectar con el servidor.");
      }
    };

    registrarVisualizacion();
  }, [video]);

  if (!video) {
    return <p>No se proporcionó información del video.</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Reproduciendo: {video.title}</h2>
      {error && <p style={styles.error}>{error}</p>}

      <video controls width="720" style={styles.video}>
        <source src={video.url} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
  },
  error: {
    color: "red",
  },
  video: {
    marginTop: "1rem",
    borderRadius: "10px",
    backgroundColor: "#000",
  },
};
