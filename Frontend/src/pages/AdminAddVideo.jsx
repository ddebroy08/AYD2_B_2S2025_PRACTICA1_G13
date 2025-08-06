import { useState } from "react";

export default function AdminAddVideo() {
  const [videoData, setVideoData] = useState({
    categoria: 2,
    titulo: "",
    descripcion: "",
    sinopsis: "",
    anio_creacion: "",
    link_video: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData({ ...videoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados al backend:", videoData);
    try {
      const res = await fetch("http://localhost:5000/admin/add-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(videoData)
        
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
          type="number"
          name="categoria"
          placeholder="ID de categoría (1-10)"
          value={videoData.categoria}
          onChange={handleChange}
          required
        />
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
          placeholder="Descripción técnica"
          value={videoData.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="sinopsis"
          placeholder="Sinopsis del contenido"
          value={videoData.sinopsis}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="anio_creacion"
          placeholder="Año de creación"
          value={videoData.anio_creacion}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="link_video"
          placeholder="URL del video"
          value={videoData.link_video}
          onChange={handleChange}
          required
        />
        <button type="submit">Subir Video</button>
      </form>
    </div>
  );
}
