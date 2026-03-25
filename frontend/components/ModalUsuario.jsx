import { useState, useEffect } from "react";

function ModalUsuario({ usuario, onGuardar, onCerrar }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    edad: "",
    direccion: "",
    rol: "viewer",
  });

  useEffect(() => {
    if (usuario) setForm(usuario);
  }, [usuario]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email) {
      alert("Nombre y email son obligatorios");
      return;
    }
    onGuardar(form);
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'DM Mono', monospace",
    fontSize: "10px",
    fontWeight: "500",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    marginBottom: "7px",
  };

  const inputStyle = {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border-color)",
    borderRadius: "var(--radius-sm)",
    padding: "10px 14px",
    fontSize: "14px",
    color: "var(--text-main)",
    outline: "none",
    width: "100%",
    fontFamily: "'DM Mono', monospace",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-bright)",
          borderRadius: "var(--radius)",
          padding: "2rem",
          width: "100%",
          maxWidth: "480px",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(168,85,247,0.08)",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.75rem",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                color: "var(--primary)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              {usuario ? "— editar —" : "— nuevo —"}
            </div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "800",
                color: "var(--text-main)",
                letterSpacing: "-0.5px",
              }}
            >
              {usuario ? usuario.nombre : "Crear Usuario"}
            </h2>
          </div>
          <button
            onClick={onCerrar}
            style={{
              background: "transparent",
              border: "1px solid var(--border-bright)",
              color: "var(--text-muted)",
              borderRadius: "var(--radius-sm)",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-hover)";
              e.currentTarget.style.color = "var(--text-main)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-muted)";
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
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Nombre */}
          <div>
            <label style={labelStyle}>
              Nombre <span style={{ color: "var(--primary)" }}>*</span>
            </label>
            <input
              name="nombre"
              type="text"
              value={form.nombre || ""}
              onChange={handleChange}
              placeholder="Juan Pérez"
              style={inputStyle}
            />
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>
              Email <span style={{ color: "var(--primary)" }}>*</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email || ""}
              onChange={handleChange}
              placeholder="juan@correo.com"
              style={inputStyle}
            />
          </div>

          {/* Teléfono */}
          <div>
            <label style={labelStyle}>Teléfono</label>
            <input
              name="telefono"
              type="text"
              value={form.telefono || ""}
              onChange={handleChange}
              placeholder="+51 999 000 000"
              style={inputStyle}
            />
          </div>

          {/* Edad + Rol en fila */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Edad</label>
              <input
                name="edad"
                type="number"
                value={form.edad || ""}
                onChange={handleChange}
                placeholder="25"
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 2 }}>
              <label style={labelStyle}>Rol</label>
              <select
                name="rol"
                value={form.rol}
                onChange={handleChange}
                style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
              >
                <option value="admin">Administrador</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer (Lector)</option>
              </select>
            </div>
          </div>

          {/* Dirección */}
          <div>
            <label style={labelStyle}>Dirección</label>
            <input
              name="direccion"
              type="text"
              value={form.direccion || ""}
              onChange={handleChange}
              placeholder="Av. Principal 123"
              style={inputStyle}
            />
          </div>

          {/* Divider */}
          <div
            style={{
              borderTop: "1px solid var(--border-color)",
              marginTop: "0.5rem",
              paddingTop: "1.25rem",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <button
              type="button"
              onClick={onCerrar}
              style={{
                background: "transparent",
                color: "var(--text-muted)",
                border: "1px solid var(--border-color)",
                padding: "10px 20px",
                borderRadius: "var(--radius-sm)",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.3px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-hover)";
                e.currentTarget.style.color = "var(--text-main)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                background: "var(--primary)",
                color: "#fff",
                border: "none",
                padding: "10px 24px",
                borderRadius: "var(--radius-sm)",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.3px",
                boxShadow: "0 0 16px var(--primary-glow)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--primary-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--primary)";
              }}
            >
              {usuario ? "Guardar Cambios" : "Crear Usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalUsuario;
