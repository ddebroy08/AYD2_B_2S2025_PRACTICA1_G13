import { useState } from "react";

export default function AdminVideosByYear() {
  const [anio, setAnio] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función para convertir URL a formato embed (igual que en el componente por título)
  const getEmbedUrl = (url) => {
    if (!url) return "";
    
    // Para URLs de YouTube
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
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
    
    return url;
  };

  const handleSearch = async () => {
    if (!anio.trim()) {
      alert("Por favor ingresa un año");
      return;
    }

    setLoading(true);
    setError("");
    setVideos([]);

    try {
      const res = await fetch("http://localhost:5000/admin/by-year", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ anio: parseInt(anio) }), // Convertir a número
      });
      
      const data = await res.json();
      
      // Manejo de respuesta basado en tu endpoint
      if (data.status === "Error") {
        setError(data.message);
        setVideos([]);
      } else if (data.status === "Success") {
        setVideos(data.videos || []);
        if (!data.videos || data.videos.length === 0) {
          setError(`No se encontraron videos del año ${anio}`);
        }
      }
    } catch (error) {
      console.error("Error al buscar videos por año:", error);
      setError("Error al buscar videos. Intenta de nuevo.");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "2rem", color: "#333" }}>📅 Buscar Videos por Año</h2>
      
      <div style={{ 
        display: "flex", 
        gap: "1rem", 
        marginBottom: "2rem",
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        <input
          type="number"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ej: 2024"
          style={{
            padding: "0.75rem",
            border: "2px solid #ddd",
            borderRadius: "8px",
            fontSize: "1rem",
            minWidth: "200px",
            flex: "1"
          }}
          disabled={loading}
        />
        <button 
          onClick={handleSearch}
          disabled={loading || !anio.trim()}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: loading ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s"
          }}
        >
          {loading ? "Buscando..." : "🔍 Buscar"}
        </button>
      </div>

      {/* Mostrar errores o mensajes */}
      {error && (
        <div style={{
          padding: "1rem",
          marginBottom: "1rem",
          backgroundColor: videos.length > 0 ? "#d4edda" : "#f8d7da",
          color: videos.length > 0 ? "#155724" : "#721c24",
          border: `1px solid ${videos.length > 0 ? "#c3e6cb" : "#f5c6cb"}`,
          borderRadius: "8px"
        }}>
          {error}
        </div>
      )}

      {/* Mostrar videos */}
      {videos.length > 0 && (
        <>
          <h3 style={{ 
            marginBottom: "1.5rem", 
            color: "#333",
            borderBottom: "2px solid #28a745",
            paddingBottom: "0.5rem"
          }}>
            Videos del año {anio} - {videos.length} encontrado(s)
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {videos.map((video, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              >
                <h3 style={{ 
                  marginBottom: "1rem", 
                  color: "#333",
                  fontSize: "1.5rem"
                }}>
                  {video.titulo}
                </h3>
                
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                  gap: "1rem", 
                  marginBottom: "1rem" 
                }}>
                  <p><strong>Categoría:</strong> {video.categoria}</p>
                  <p><strong>Fecha de creación:</strong> {
                    video.anio_creacion 
                      ? new Date(video.anio_creacion).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'No disponible'
                  }</p>
                </div>
                
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Descripción:</strong> {video.descripcion}
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  <strong>Sinopsis:</strong> {video.sinopsis}
                </p>
                
                {/* Reproductor de video embebido */}
                <div style={{ 
                  position: "relative", 
                  paddingBottom: "56.25%", 
                  height: 0, 
                  overflow: "hidden",
                  borderRadius: "8px",
                  backgroundColor: "#000"
                }}>
                  {video.link_video && (
                    <>
                      {/* Si es un video local (mp4, webm, etc.) */}
                      {(video.link_video.includes('.mp4') || 
                        video.link_video.includes('.webm') || 
                        video.link_video.includes('.ogg') || 
                        video.link_video.startsWith('http://localhost') || 
                        video.link_video.startsWith('/uploads')) ? (
                        <video 
                          controls 
                          style={{ 
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%", 
                            height: "100%", 
                            borderRadius: "8px"
                          }}
                        >
                          <source src={video.link_video} type="video/mp4" />
                          <source src={video.link_video} type="video/webm" />
                          Tu navegador no soporta el elemento de video.
                        </video>
                      ) : (
                        /* Para videos de YouTube, Vimeo, etc. */
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
                          sandbox="allow-same-origin allow-scripts allow-presentation"
                        ></iframe>
                      )}
                    </>
                  )}
                </div>
                
                {/* Link alternativo */}
                <div style={{ marginTop: "1rem", textAlign: "center" }}>
                  <a 
                    href={video.link_video} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      color: "#28a745",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      padding: "0.5rem 1rem",
                      border: "1px solid #28a745",
                      borderRadius: "5px",
                      display: "inline-block",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#28a745";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#28a745";
                    }}
                  >
                    🔗 Ver en nueva pestaña
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}