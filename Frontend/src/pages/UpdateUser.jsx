import { useEffect, useState } from "react";

export default function UpdateUser() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    nit: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [esExito, setEsExito] = useState(false);

  // 🚀 Obtener datos del usuario al cargar la página
  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const res = await fetch("http://localhost:5000/current-user", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.data) {
          setForm({
            nombre: data.data.nombre || "",
            email: data.data.email || "",
            password: "",
            nit: data.data.nit || "",
          });
        } else {
          setMensaje("Error al cargar los datos del usuario.");
          setEsExito(false);
        }
      } catch (error) {
        setMensaje("Error del servidor al obtener datos.");
        setEsExito(false);
      }
    };

    obtenerDatosUsuario();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setEsExito(true);
        setMensaje(data.message || "Usuario actualizado correctamente.");
      } else {
        setEsExito(false);
        setMensaje(data.message || "Error al actualizar usuario.");
      }
    } catch (error) {
      setEsExito(false);
      setMensaje("Error del servidor. Intenta más tarde.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>Actualizar Usuario</h2>

      {mensaje && (
        <p style={{ color: esExito ? "green" : "red", fontWeight: "bold" }}>
          {mensaje}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Nueva contraseña (opcional)"
        />

        <label>NIT:</label>
        <input
          type="text"
          name="nit"
          value={form.nit}
          onChange={handleChange}
        />

        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}
