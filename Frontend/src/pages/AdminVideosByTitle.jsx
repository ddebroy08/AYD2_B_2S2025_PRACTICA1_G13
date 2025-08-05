import { useState } from "react";

export default function AdminVideosByTitle() {
  const [titulo, setTitulo] = useState("");
  const [video, setVideo] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/by-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // si usas sesiones
        body: JSON.stringify({ titulo }),
      });

      const data = await res.json();

      if (data.status === "Error") {
        alert(data.message);
        setVideo(null);
      } else {
        setVideo(data.video || data);
      }
    } catch (error) {
      console.error("Error al buscar el video:", error);
      alert("Error al buscar video.");
    }
  };

  return (
    <div className="container">
      <h2>Buscar Video por Título</h2>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Ej: Python Básico"
      />
      <button onClick={handleSearch}>Buscar</button>

      {video && (
        <div className="video-info">
          <h3>{video.titulo}</h3>
          <p>{video.descripcion}</p>
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            Ver Video
          </a>
          <p>Fecha: {video.fecha}</p>
        </div>
      )}
    </div>
  );
}
