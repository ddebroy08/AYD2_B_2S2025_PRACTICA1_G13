import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function UploadPhoto() {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Subir fotografía</h2>
      <form>
        <input type="file" accept="image/*" onChange={handleChange} />
        {preview && (
          <div style={{ marginTop: '1rem' }}>
            <img src={preview} alt="Vista previa" width="100%" />
          </div>
        )}
        <button type="submit">Subir</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/">Volver al login</Link> | <Link to="/add-card">Siguiente</Link>
      </div>
    </div>
  );
}
