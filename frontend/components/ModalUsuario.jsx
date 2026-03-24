import { useState, useEffect } from 'react'

function ModalUsuario({ usuario, onGuardar, onCerrar }) {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    edad: '',
    direccion: '',
    rol: 'viewer'
  })

  useEffect(() => {
    if (usuario) setForm(usuario)
  }, [usuario])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nombre || !form.email) {
      alert('Nombre y email son obligatorios')
      return
    }
    onGuardar(form)
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div className="modal-content" style={{
        background: 'var(--card-bg)',
        borderRadius: '16px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '500px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-main)' }}>
            {usuario ? 'Editar Usuario' : 'Nuevo Usuario'}
          </h2>
          <button onClick={onCerrar} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'
          }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {[
            { label: 'Nombre Completo', name: 'nombre', type: 'text', placeholder: 'Ej. Juan Pérez' },
            { label: 'Correo Electrónico', name: 'email', type: 'email', placeholder: 'Ej. juan@correo.com' },
            { label: 'Teléfono', name: 'telefono', type: 'text', placeholder: 'Ej. +51 999 999 999' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--text-main)', marginBottom: '8px' }}>
                {label} {['nombre', 'email'].includes(name) && <span style={{ color: 'var(--danger)' }}>*</span>}
              </label>
              <input
                type={type}
                name={name}
                value={form[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '8px',
                  border: '1px solid var(--border-color)', fontSize: '15px',
                  outline: 'none'
                }}
              />
            </div>
          ))}

          <div style={{ display: 'flex', gap: '1.2rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--text-main)', marginBottom: '8px' }}>
                Edad
              </label>
              <input
                type="number"
                name="edad"
                value={form.edad || ''}
                onChange={handleChange}
                placeholder="Ej. 25"
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '8px',
                  border: '1px solid var(--border-color)', fontSize: '15px', outline: 'none'
                }}
              />
            </div>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--text-main)', marginBottom: '8px' }}>
                Rol de Sistema
              </label>
              <select
                name="rol"
                value={form.rol}
                onChange={handleChange}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '8px',
                  border: '1px solid var(--border-color)', fontSize: '15px', outline: 'none',
                  background: 'var(--card-bg)', appearance: 'none'
                }}
              >
                <option value="admin">Administrador</option>
                <option value="editor">Editor</option>
                <option value="viewer">Lector (Viewer)</option>
              </select>
            </div>
          </div>

          <div>
             <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: 'var(--text-main)', marginBottom: '8px' }}>
               Dirección
             </label>
             <input
                type="text"
                name="direccion"
                value={form.direccion || ''}
                onChange={handleChange}
                placeholder="Ej. Av. Principal 123"
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '8px',
                  border: '1px solid var(--border-color)', fontSize: '15px', outline: 'none'
                }}
              />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={onCerrar}
              style={{
                padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border-color)',
                background: 'var(--card-bg)', cursor: 'pointer', fontSize: '14px', fontWeight: '600',
                color: 'var(--text-main)'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--primary)',
                color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
              }}
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalUsuario