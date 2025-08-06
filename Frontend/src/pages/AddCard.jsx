import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddCard() {
  const [form, setForm] = useState({
    numero: "",
    fecha_vencimiento: "",
    codigo_seguridad: "",
    tipo: "Tarjeta de credito", // Valor compatible con PostgreSQL
  });

  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir fecha_vencimiento a YYYY-MM-01
    const datosFormateados = {
      ...form,
      fecha_vencimiento: form.fecha_vencimiento + "-01",
    };

    try {
      const res = await fetch("http://localhost:5000/add-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(datosFormateados),
      });

      const data = await res.json();

      if (res.ok) {
        setExito(true);
        setMensaje(data.message || "Tarjeta guardada correctamente.");
      } else {
        setExito(false);
        setMensaje(data.message || "Error al guardar tarjeta.");
      }
    } catch (error) {
      setExito(false);
      setMensaje("Error del servidor.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Agregar tarjeta de crédito</h2>

      {mensaje && (
        <p style={{ color: exito ? "green" : "red", fontWeight: "bold" }}>
          {mensaje}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label>Número de tarjeta:</label>
        <input
          type="text"
          name="numero"
          value={form.numero}
          onChange={handleChange}
          required
        />

        <label>Fecha de vencimiento:</label>
        <input
          type="month"
          name="fecha_vencimiento"
          value={form.fecha_vencimiento}
          onChange={handleChange}
          required
        />

        <label>Código de seguridad:</label>
        <input
          type="text"
          name="codigo_seguridad"
          value={form.codigo_seguridad}
          onChange={handleChange}
          required
        />

        <label>Tipo de tarjeta:</label>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          required
        >
          <option value="Tarjeta de debito">Tarjeta de débito</option>
          <option value="Tarjeta de credito">Tarjeta de crédito</option>
        </select>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Guardar tarjeta
        </button>
      </form>

      <div style={{ marginTop: "1rem" }}>
        <Link to="/">Volver al login</Link> | <Link to="/update-card">Siguiente</Link>
      </div>
    </div>
  );
}
