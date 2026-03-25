function TablaUsuarios({ usuarios, onEditar, onEliminar, cargando }) {
  const getBadge = (rol) => {
    switch (rol) {
      case "admin":
        return <span className="badge badge-admin">admin</span>;
      case "editor":
        return <span className="badge badge-editor">editor</span>;
      default:
        return <span className="badge badge-viewer">viewer</span>;
    }
  };

  if (cargando) {
    return (
      <div
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius)",
          padding: "4rem",
          textAlign: "center",
          fontFamily: "'DM Mono', monospace",
          fontSize: "12px",
          color: "var(--text-muted)",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
        }}
      >
        Cargando...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius)",
        overflowX: "auto",
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}
      >
        <thead>
          <tr
            style={{
              background: "var(--bg-elevated)",
              borderBottom: "1px solid var(--border-color)",
            }}
          >
            {[
              "#",
              "Nombre / Correo",
              "Teléfono",
              "Edad",
              "Dirección",
              "Rol",
              "Acciones",
            ].map((h, i) => (
              <th
                key={i}
                style={{
                  padding: "14px 18px",
                  textAlign: i === 6 ? "right" : "left",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  fontWeight: "500",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  color: "var(--text-muted)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    marginBottom: "12px",
                    opacity: 0.2,
                  }}
                >
                  ◈
                </div>
                Sin resultados — prueba con otro término.
              </td>
            </tr>
          ) : (
            usuarios.map((u) => (
              <tr
                key={u.id}
                className="table-row"
                style={{ borderTop: "1px solid var(--border-color)" }}
              >
                {/* ID */}
                <td
                  style={{
                    padding: "15px 18px",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                  }}
                >
                  {String(u.id).padStart(2, "0")}
                </td>

                {/* Nombre + email */}
                <td style={{ padding: "15px 18px" }}>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "var(--text-main)",
                      fontSize: "14px",
                    }}
                  >
                    {u.nombre}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      marginTop: "2px",
                    }}
                  >
                    {u.email}
                  </div>
                </td>

                {/* Teléfono */}
                <td
                  style={{
                    padding: "15px 18px",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "12px",
                    color: "#9ca3af",
                  }}
                >
                  {u.telefono || (
                    <span style={{ color: "var(--text-dim)" }}>—</span>
                  )}
                </td>

                {/* Edad */}
                <td
                  style={{
                    padding: "15px 18px",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "12px",
                    color: "#9ca3af",
                  }}
                >
                  {u.edad || (
                    <span style={{ color: "var(--text-dim)" }}>—</span>
                  )}
                </td>

                {/* Dirección */}
                <td
                  style={{
                    padding: "15px 18px",
                    fontSize: "13px",
                    color: "#9ca3af",
                    maxWidth: "180px",
                  }}
                >
                  {u.direccion || (
                    <span
                      style={{
                        color: "var(--text-dim)",
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      —
                    </span>
                  )}
                </td>

                {/* Rol */}
                <td style={{ padding: "15px 18px" }}>{getBadge(u.rol)}</td>

                {/* Acciones */}
                <td style={{ padding: "15px 18px", textAlign: "right" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "8px",
                    }}
                  >
                    <button
                      onClick={() => onEditar(u)}
                      style={{
                        background: "transparent",
                        color: "#9ca3af",
                        border: "1px solid var(--border-bright)",
                        padding: "5px 14px",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: "0.6px",
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--primary-dim)";
                        e.currentTarget.style.color = "var(--primary)";
                        e.currentTarget.style.borderColor =
                          "var(--border-purple)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#9ca3af";
                        e.currentTarget.style.borderColor =
                          "var(--border-bright)";
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Editar
                    </button>
                    <button
                      onClick={() => onEliminar(u.id)}
                      style={{
                        background: "transparent",
                        color: "#f8717144",
                        border: "1px solid rgba(248,113,113,0.15)",
                        padding: "5px 14px",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: "0.6px",
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--danger-dim)";
                        e.currentTarget.style.color = "var(--danger)";
                        e.currentTarget.style.borderColor =
                          "rgba(248,113,113,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#f8717144";
                        e.currentTarget.style.borderColor =
                          "rgba(248,113,113,0.15)";
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
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
  );
}

export default TablaUsuarios;
