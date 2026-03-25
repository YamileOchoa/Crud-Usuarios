import { useState, useEffect } from "react";
import axios from "axios";
import Buscador from "../components/Buscador";
import TablaUsuarios from "../components/TablaUsuarios";
import ModalUsuario from "../components/ModalUsuario";
import "./index.css";

const API = "https://crud-usuarios-backend-lri9.onrender.com/api/usuarios";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [buscando, setBuscando] = useState(false);

  const cargarUsuarios = async (q = "") => {
    try {
      setBuscando(true);
      const res = await axios.get(`${API}?q=${q}`);
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setBuscando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleNuevo = () => {
    setUsuarioEditando(null);
    setModalAbierto(true);
  };
  const handleEditar = (u) => {
    setUsuarioEditando(u);
    setModalAbierto(true);
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar este usuario? (Eliminado lógico)")) return;
    try {
      await axios.delete(`${API}/${id}`);
      cargarUsuarios();
    } catch {
      alert("Hubo un error al eliminar el usuario");
    }
  };

  const handleGuardar = async (datos) => {
    try {
      if (usuarioEditando) {
        await axios.put(`${API}/${usuarioEditando.id}`, datos);
      } else {
        await axios.post(API, datos);
      }
      setModalAbierto(false);
      cargarUsuarios();
    } catch (error) {
      alert(error.response?.data?.error || "Ocurrió un error al guardar.");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
      {/* ── HEADER ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "2.5rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "6px",
            }}
          >
            {/* small purple dot accent */}
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--primary)",
                boxShadow: "0 0 10px var(--primary)",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                color: "var(--text-muted)",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Sistema de gestión
            </span>
          </div>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "800",
              color: "var(--text-main)",
              letterSpacing: "-1px",
            }}
          >
            Usuarios
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "14px",
              marginTop: "4px",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {usuarios.length} registro{usuarios.length !== 1 ? "s" : ""} en
            total
          </p>
        </div>

        <button
          onClick={handleNuevo}
          style={{
            background: "var(--primary)",
            color: "#fff",
            border: "none",
            padding: "11px 22px",
            borderRadius: "var(--radius-sm)",
            fontSize: "14px",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 0 20px var(--primary-glow)",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--primary-hover)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--primary)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 6v12M6 12h12"
            />
          </svg>
          Nuevo Usuario
        </button>
      </div>

      {/* ── TOOLBAR ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "1.25rem",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: "1.5rem",
        }}
      >
        <Buscador onBuscar={(q) => cargarUsuarios(q)} />

        {/* count chip */}
        <div
          style={{
            background: "var(--primary-dim)",
            color: "var(--primary)",
            border: "1px solid var(--border-purple)",
            borderRadius: "4px",
            fontFamily: "'DM Mono', monospace",
            fontSize: "12px",
            padding: "4px 12px",
          }}
        >
          {usuarios.length} usuarios
        </div>
      </div>

      {/* ── TABLE ── */}
      <TablaUsuarios
        usuarios={usuarios}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        cargando={buscando}
      />

      {/* ── MODAL ── */}
      {modalAbierto && (
        <ModalUsuario
          usuario={usuarioEditando}
          onGuardar={handleGuardar}
          onCerrar={() => setModalAbierto(false)}
        />
      )}
    </div>
  );
}

export default App;
