import { useState } from "react";

export default function AdminAddVideo() {
  const [videoData, setVideoData] = useState({
    titulo: "",
    descripcion: "",
    url: "",
    fecha: "",
  });

  const handleChange = (e) => {
    setVideoData({ ...videoData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/admin/add-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Asume que ya se manejó login y cookie de sesión JWT o sesión de flask
        },
        body: JSON.stringify(videoData),
        credentials: "include",
      });

      const data = await res.json();
      alert(data.message || "Video agregado correctamente");
    } catch (error) {
      console.error("Error al agregar video:", error);
      alert("Error al agregar video");
    }
  };

  return (
    <div className="container">
      <h2>Agregar Video</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="Título del video"
          value={videoData.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={videoData.descripcion}
          onChange={handleChange}
        />
        <input
          type="url"
          name="url"
          placeholder="URL del video"
          value={videoData.url}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha"
          placeholder="Fecha"
          value={videoData.fecha}
          onChange={handleChange}
          required
        />
        <button type="submit">Subir Video</button>
      </form>
    </div>
  );
}
