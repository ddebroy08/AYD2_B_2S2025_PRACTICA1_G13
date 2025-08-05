import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [contenidos, setContenidos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const mockData = [
      { id: 1, titulo: 'El Padrino', anio: 1972 },
      { id: 2, titulo: 'Avatar', anio: 2009 },
      { id: 3, titulo: 'Avengers: Endgame', anio: 2019 },
    ];
    setContenidos(mockData);
  }, []);

  const filtrados = contenidos.filter(c =>
    c.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard de Contenido</h1>
      <input
        type="text"
        placeholder="Buscar por título"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem' }}
      />
      <ul>
        {filtrados.map(c => (
          <li key={c.id}>
            {c.titulo} ({c.anio})
          </li>
        ))}
      </ul>
    </div>
  );
}
