import { useState } from "react";

function Buscador({ onBuscar }) {
  const [termino, setTermino] = useState("");

  const handleBuscar = (e) => {
    e.preventDefault();
    onBuscar(termino);
  };

  const limpiar = () => {
    setTermino("");
    onBuscar("");
  };

  return (
    <form
      onSubmit={handleBuscar}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "var(--bg-surface)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-sm)",
        padding: "5px 5px 5px 14px",
        maxWidth: "380px",
        width: "100%",
        transition: "border-color 0.2s",
      }}
      onFocusCapture={(e) =>
        (e.currentTarget.style.borderColor = "var(--border-purple)")
      }
      onBlurCapture={(e) =>
        (e.currentTarget.style.borderColor = "var(--border-color)")
      }
    >
      {/* Search icon */}
      <svg
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={{ color: "var(--text-muted)", flexShrink: 0 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        placeholder="Buscar por nombre, correo..."
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: "13px",
          color: "var(--text-main)",
          fontFamily: "'DM Mono', monospace",
          padding: "6px 0",
          width: "100%",
          boxShadow: "none",
        }}
      />

      {/* Limpiar */}
      {termino && (
        <button
          type="button"
          onClick={limpiar}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "11px",
            fontFamily: "'DM Mono', monospace",
            cursor: "pointer",
            flexShrink: 0,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text-main)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          ✕
        </button>
      )}

      {/* Buscar */}
      <button
        type="submit"
        style={{
          background: "var(--primary)",
          color: "#fff",
          border: "none",
          padding: "7px 16px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "700",
          letterSpacing: "0.4px",
          flexShrink: 0,
          boxShadow: "0 0 10px var(--primary-glow)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--primary-hover)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "var(--primary)")
        }
      >
        Buscar
      </button>
    </form>
  );
}

export default Buscador;
