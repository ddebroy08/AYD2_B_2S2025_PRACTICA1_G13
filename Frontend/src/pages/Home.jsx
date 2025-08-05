import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/admin/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setVideos(data.videos || []);
        } else {
          setError(data.message || "Error al obtener los videos.");
        }
      } catch {
        setError("Error de conexión con el servidor.");
      }
    };

    fetchVideos();
  }, []);

  const handleWatch = (video) => {
    navigate("/watch-player", { state: { video } });
  };

  return (
    <div style={styles.container}>
      <h2>Recomendaciones</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.grid}>
        {videos.map((video) => (
          <div key={video.id} style={styles.card}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <button onClick={() => handleWatch(video)} style={styles.button}>
              Ver ahora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    width: "300px",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
};
