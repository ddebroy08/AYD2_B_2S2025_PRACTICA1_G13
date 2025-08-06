import { useEffect, useState } from "react";

// Función para transformar URLs a formato embed
const getEmbedUrl = (url) => {
  if (!url) return "";

  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
  }

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
  }

  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
  }

  if (url.includes("/embed/")) {
    return url;
  }

  return url;
};

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/all", {
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          setVideos(data.videos || []);
        } else {
          setError(data.message || "No tienes una suscripción activa.");
        }
      } catch {
        setError("Error de conexión con el servidor.");
      }
    };

    fetchVideos();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Recomendaciones</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.grid}>
        {videos.map((video) => (
          <div key={video.id} style={styles.card}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>

            {/* Contenedor embebido para el video */}
            <div style={styles.videoWrapper}>
              <iframe
                style={styles.iframe}
                src={getEmbedUrl(video.url)}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              ></iframe>
            </div>
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
    width: "350px",
  },
  videoWrapper: {
    position: "relative",
    paddingBottom: "56.25%", // 16:9 aspect ratio
    height: 0,
    overflow: "hidden",
    marginTop: "1rem",
    borderRadius: "8px",
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: "8px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    marginTop: "1rem",
  },
};
