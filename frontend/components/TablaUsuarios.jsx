function TablaUsuarios({ usuarios, onEditar, onEliminar, cargando }) {
  const badgeColor = (rol) => {
    switch(rol) {
      case 'admin': return { background: '#e0e7ff', color: '#3730a3', border: '1px solid #c7d2fe' }
      case 'editor': return { background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }
      default: return { background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' }
    }
  }

  if (cargando) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Cargando usuarios...
      </div>
    )
  }

  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--border-color)',
      overflowX: 'auto'
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
            <th style={th}>#</th>
            <th style={th}>Nombre y Correo</th>
            <th style={th}>Teléfono</th>
            <th style={th}>Edad</th>
            <th style={th}>Dirección</th>
            <th style={th}>Rol</th>
            <th style={{...th, textAlign: 'right'}}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '16px', fontWeight: '500' }}>No se encontraron usuarios</div>
                <div style={{ fontSize: '14px', marginTop: '4px' }}>Intenta con otro término de búsqueda o crea un nuevo usuario.</div>
              </td>
            </tr>
          ) : (
            usuarios.map(u => (
              <tr key={u.id} className="table-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ ...td, color: 'var(--text-muted)', fontWeight: '500' }}>{u.id}</td>
                <td style={td}>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{u.nombre}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{u.email}</div>
                </td>
                <td style={td}>{u.telefono || '-'}</td>
                <td style={td}>{u.edad || '-'}</td>
                <td style={{ ...td, color: 'var(--text-muted)' }}>{u.direccion || '-'}</td>
                <td style={td}>
                  <span style={{
                    ...badgeColor(u.rol),
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'inline-block'
                  }}>
                    {u.rol === 'viewer' ? 'lector' : u.rol}
                  </span>
                </td>
                <td style={{ ...td, textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button onClick={() => onEditar(u)} style={btnEditar}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </button>
                    <button onClick={() => onEliminar(u.id)} style={btnEliminar}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

const th = {
  padding: '16px 20px', textAlign: 'left', fontSize: '13px',
  fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase',
  letterSpacing: '0.5px'
}

const td = { padding: '16px 20px', verticalAlign: 'middle' }

const btnEditar = {
  display: 'flex', alignItems: 'center', gap: '6px',
  padding: '6px 14px', borderRadius: '6px',
  border: '1px solid #e2e8f0', background: 'var(--card-bg)',
  color: 'var(--text-main)', cursor: 'pointer', fontSize: '13px',
  fontWeight: '500', boxShadow: 'var(--shadow-sm)'
}

const btnEliminar = {
  display: 'flex', alignItems: 'center', gap: '6px',
  padding: '6px 14px', borderRadius: '6px',
  border: '1px solid #fee2e2', background: '#fef2f2',
  color: 'var(--danger)', cursor: 'pointer', fontSize: '13px',
  fontWeight: '500', boxShadow: 'var(--shadow-sm)'
}

export default TablaUsuarios