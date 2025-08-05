import { useState } from "react";

export default function AdminVideosByYear() {
  const [anio, setAnio] = useState("");
  const [videos, setVideos] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/by-year", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // para enviar cookies si estás usando sesiones
        body: JSON.stringify({ anio }),
      });
      const data = await res.json();
      setVideos(data.videos || []);
    } catch (error) {
      console.error("Error al buscar videos por año:", error);
      alert("Error al buscar videos.");
    }
  };

  return (
    <div className="container">
      <h2>Buscar Videos por Año</h2>
      <input
        type="text"
        value={anio}
        onChange={(e) => setAnio(e.target.value)}
        placeholder="Ej: 2024"
      />
      <button onClick={handleSearch}>Buscar</button>

      {videos.length > 0 && (
        <ul>
          {videos.map((video, index) => (
            <li key={index}>
              <strong>{video.titulo}</strong> — {video.descripcion}
              <br />
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                Ver Video
              </a>
              <br />
              Fecha: {video.fecha}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
