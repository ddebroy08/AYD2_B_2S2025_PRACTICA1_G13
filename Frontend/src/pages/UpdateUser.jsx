import { useState } from "react";

export default function UpdateUser() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    nit: "",
  });

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
        credentials: "include", // Para enviar cookies de sesión
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message || "Usuario actualizado");

    } catch (error) {
      alert("Error al actualizar usuario");
    }
  };

  return (
    <div>
      <h2>Actualizar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Nueva contraseña" value={form.password} onChange={handleChange} required />
        <input type="text" name="nit" placeholder="NIT" value={form.nit} onChange={handleChange} required />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}
