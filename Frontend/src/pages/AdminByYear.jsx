// src/pages/AdminByYear.jsx
import { useState } from "react";

function AdminByYear() {
  const [anio, setAnio] = useState("");
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  const handleBuscar = async () => {
    setError("");
    try {
      const response = await fetch("http://localhost:5000/admin/by-year", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ anio }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en la búsqueda");
      }

      setVideos(data.videos || []);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Buscar Videos por Año</h2>
      <input
        type="number"
        placeholder="Ingrese el año"
        value={anio}
        onChange={(e) => setAnio(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            {video.titulo} - {video.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminByYear;
