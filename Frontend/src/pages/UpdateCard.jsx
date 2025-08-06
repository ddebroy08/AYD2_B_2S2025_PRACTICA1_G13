import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UpdateCard() {
  const [form, setForm] = useState({
    numero_antiguo: "",
    numero: "",
    fecha_vencimiento: "",
    codigo_seguridad: "",
    tipo: "Tarjeta de credito",
  });

  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);

  // Obtener tarjeta actual al cargar el componente
  useEffect(() => {
    fetch("http://localhost:5000/get-card", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Success") {
          setForm((prev) => ({
            ...prev,
            ...data.data,
          }));
        } else {
          setMensaje(data.message || "No se pudo cargar la tarjeta.");
        }
      })
      .catch(() => {
        setMensaje("Error al cargar la tarjeta.");
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosFormateados = {
      ...form,
      fecha_vencimiento: form.fecha_vencimiento + "-01",
    };

    try {
      const res = await fetch("http://localhost:5000/update-card", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(datosFormateados),
      });

      const data = await res.json();

      if (res.ok) {
        setExito(true);
        setMensaje(data.message || "Tarjeta actualizada correctamente.");
      } else {
        setExito(false);
        setMensaje(data.message || "Error al actualizar tarjeta.");
      }
    } catch (error) {
      setExito(false);
      setMensaje("Error del servidor.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Actualizar tarjeta de crédito</h2>

      {mensaje && (
        <p style={{ color: exito ? "green" : "red", fontWeight: "bold" }}>
          {mensaje}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label>Nuevo número de tarjeta:</label>
        <input
          type="text"
          name="numero"
          value={form.numero}
          onChange={handleChange}
          required
        />

        <label>Nuevo vencimiento:</label>
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
          Actualizar tarjeta
        </button>
      </form>

      <div style={{ marginTop: "1rem" }}>
        <Link to="/">Volver al login</Link> |{" "}
        <Link to="/add-subscription">Siguiente</Link>
      </div>
    </div>
  );
}
