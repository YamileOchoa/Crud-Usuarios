import { useState } from 'react'

function Buscador({ onBuscar }) {
  const [termino, setTermino] = useState('')

  const handleBuscar = (e) => {
    e.preventDefault()
    onBuscar(termino)
  }

  return (
    <form onSubmit={handleBuscar} style={{
      display: 'flex', gap: '8px', 
      background: 'white', padding: '6px', 
      borderRadius: 'var(--radius)', 
      width: '100%', maxWidth: '400px',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--border-color)'
    }}>
      <input
        type="text"
        placeholder="Buscar por nombre, correo o teléfono..."
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          padding: '8px 12px',
          fontSize: '14px',
          background: 'transparent'
        }}
      />
      <button type="submit" style={{
        background: 'var(--primary)',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px'
      }}>
        Buscar
      </button>
      {termino && (
        <button 
          type="button" 
          onClick={() => { setTermino(''); onBuscar(''); }} 
          style={{
            background: '#f1f5f9',
            color: 'var(--text-muted)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          Limpiar
        </button>
      )}
    </form>
  )
}

export default Buscador
