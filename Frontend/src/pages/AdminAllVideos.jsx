import { useEffect, useState } from "react";

export default function AdminAllVideos() {
  const [videos, setVideos] = useState([]);

  // Función para convertir URL de YouTube a formato embed
  const getEmbedUrl = (url) => {
    if (!url) return "";
    
    // Para URLs de YouTube (youtube.com/watch?v= o youtu.be/)
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      // Añadir parámetros para forzar reproducción embebida
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
    }
    
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
    }
    
    // Para URLs de Vimeo
    if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      return `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
    }
    
    // Para otros servicios o si ya está en formato embed
    if (url.includes("/embed/")) {
      return url;
    }
    
    // Si no es un formato reconocido, devolver el URL original
    return url;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/all", {
          method: "GET",
          credentials: "include",
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
    <div className="container" style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>🎥 Todos los Videos</h2>
      {videos.length === 0 ? (
        <p>No hay videos disponibles.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {videos.map((video, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{video.titulo}</h3>
              <p><strong>Categoría:</strong> {video.categoria}</p>
              <p><strong>Descripción:</strong> {video.descripcion}</p>
              <p><strong>Sinopsis:</strong> {video.sinopsis}</p>
              <p><strong>Fecha:</strong> {video.anio_creacion}</p>
              
              {/* Contenedor responsive para el video */}
              <div style={{ 
                position: "relative", 
                paddingBottom: "56.25%", 
                height: 0, 
                overflow: "hidden",
                marginTop: "1rem",
                borderRadius: "8px"
              }}>
                <iframe
                  style={{ 
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    width: "100%", 
                    height: "100%",
                    borderRadius: "8px",
                    border: "none"
                  }}
                  src={getEmbedUrl(video.link_video)}
                  title={video.titulo}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}