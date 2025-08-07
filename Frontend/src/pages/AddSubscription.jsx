import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddSubscription() {
  const [idPlan, setIdPlan] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idPlan || !fechaInicio) {
      setMensaje("Por favor complete todos los campos.");
      return;
    }

    const dataToSend = {
      id_plan: parseInt(idPlan), // enviar como número
      fecha_inicio: fechaInicio,
    };

    try {
      const response = await fetch("http://localhost:5000/add-suscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
        credentials: "include", // si usas login y sesiones/cookies
      });

      const result = await response.json();

      if (response.ok) {
        setMensaje(result.message);
      } else {
        setMensaje(result.message || "Error al agregar suscripción");
      }
    } catch (error) {
      setMensaje("Error de conexión al servidor.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Contratar suscripción</h2>
      <form onSubmit={handleSubmit}>
        <label>Tipo de suscripción:</label>
        <select
          name="id_plan"
          required
          value={idPlan}
          onChange={(e) => setIdPlan(e.target.value)}
        >
          <option value="">Seleccionar</option>
          <option value="1">Mensual</option>
          <option value="2">Bimestral</option>
          <option value="3">Anual</option>
        </select>

        <label>Fecha de inicio:</label>
        <input
          type="date"
          name="fecha_inicio"
          required
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />

        <button type="submit" style={{ marginTop: "1rem" }}>
          Activar suscripción
        </button>
      </form>

      {mensaje && <p style={{ marginTop: "1rem" }}>{mensaje}</p>}
    </div>
  );
}
