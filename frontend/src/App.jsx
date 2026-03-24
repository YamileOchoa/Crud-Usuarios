import { useState, useEffect } from 'react'
import axios from 'axios'
import Buscador from '../components/Buscador'
import TablaUsuarios from '../components/TablaUsuarios'
import ModalUsuario from '../components/ModalUsuario'
import './index.css'

const API = 'http://localhost:3000/api/usuarios'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [usuarioEditando, setUsuarioEditando] = useState(null)
  const [buscando, setBuscando] = useState(false)

  const cargarUsuarios = async (q = '') => {
    try {
      setBuscando(true)
      const res = await axios.get(`${API}?q=${q}`)
      setUsuarios(res.data)
    } catch (error) {
      console.error('Error cargando usuarios:', error)
    } finally {
      setBuscando(false)
    }
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const handleNuevo = () => {
    setUsuarioEditando(null)
    setModalAbierto(true)
  }

  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario)
    setModalAbierto(true)
  }

  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario? (Eliminado lógico)')) return
    try {
      await axios.delete(`${API}/${id}`)
      cargarUsuarios() // Recargamos para reflejar el estado oculto
    } catch (error) {
      alert('Hubo un error al eliminar el usuario')
    }
  }

  const handleGuardar = async (datos) => {
    try {
      if (usuarioEditando) {
        await axios.put(`${API}/${usuarioEditando.id}`, datos)
      } else {
        await axios.post(API, datos)
      }
      setModalAbierto(false)
      cargarUsuarios()
    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error)
      } else {
        alert('Ocurrió un error al guardar.')
      }
    }
  }

  const handleBuscar = (q) => {
    cargarUsuarios(q)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 2rem' }}>
      {/* Header section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
              Gestión de Usuarios
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '4px' }}>
              Administra tu base de datos de usuarios fácilmente.
            </p>
          </div>
          <button onClick={handleNuevo} style={{
            background: 'var(--primary)',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 'var(--radius)',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '600',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Usuario
          </button>
        </div>

        {/* Filter/Search Bar Section */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          <Buscador onBuscar={handleBuscar} />
        </div>
      </div>

      {/* Main Table Content */}
      <TablaUsuarios
        usuarios={usuarios}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        cargando={buscando}
      />

      {modalAbierto && (
        <ModalUsuario
          usuario={usuarioEditando}
          onGuardar={handleGuardar}
          onCerrar={() => setModalAbierto(false)}
        />
      )}
    </div>
  )
}

export default App