import { useEffect, useState } from "react";

export default function AdminAllVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/all", {
          method: "GET",
          credentials: "include", // importante si usas login con sesión
        });
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (error) {
        console.error("Error al obtener videos:", error);
        alert("Error al obtener los videos.");
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="container">
      <h2>Todos los Videos</h2>
      {videos.length === 0 ? (
        <p>No hay videos disponibles.</p>
      ) : (
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
