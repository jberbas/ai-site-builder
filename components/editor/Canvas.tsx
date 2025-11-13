type Block = { type: string; props?: Record<string, any> };

export default function Canvas({ blocks }: { blocks: Block[] }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {blocks.map((b, i) => {
        // ---- Hero ----
        if (b.type === "Hero") {
          return (
            <section key={i} style={{ padding: 20, border: "1px dashed #ddd" }}>
              <h1 style={{ margin: 0, fontSize: 28 }}>
                {b.props?.headline ?? "Hero headline"}
              </h1>
              <p style={{ marginTop: 6 }}>
                {b.props?.subheadline ?? "Subheadline"}
              </p>
            </section>
          );
        }

        // ---- RichText ----
        if (b.type === "RichText") {
          return (
            <div key={i} style={{ padding: 20, border: "1px dashed #ddd" }}>
              <div>{b.props?.content ?? "Rich text…"}</div>
            </div>
          );
        }

        // ---- Pricing ----
        if (b.type === "Pricing") {
          const { headline, subheadline, plans = [] } = b.props || {};
          return (
            <section key={i} style={{ padding: 20, border: "1px dashed #ddd" }}>
              <h2 style={{ margin: 0, fontSize: 24 }}>
                {headline ?? "Pricing"}
              </h2>
              <p style={{ marginTop: 6, opacity: 0.8 }}>
                {subheadline ?? ""}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 12,
                  marginTop: 12,
                }}
              >
                {plans.map((pl: any, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      border: "1px solid #eee",
                      borderRadius: 10,
                      padding: 12,
                    }}
                  >
                    <div style={{ fontWeight: 700 }}>{pl.name}</div>
                    <div style={{ fontSize: 22, margin: "8px 0" }}>
                      {pl.price}
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {(pl.features || []).map((f: string, fi: number) => (
                        <li key={fi} style={{ marginBottom: 4 }}>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      style={{
                        marginTop: 10,
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid #111827",
                        background: "#111827",
                        color: "white",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      {pl.ctaLabel ?? "Choose"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        // ---- Features3 ----
        if (b.type === "Features3") {
          const { headline, subheadline, items = [] } = b.props || {};
          return (
            <section key={i} style={{ padding: 20, border: "1px dashed #ddd" }}>
              <h2 style={{ margin: 0, fontSize: 24 }}>
                {headline ?? "Features"}
              </h2>
              <p style={{ marginTop: 6, opacity: 0.8 }}>
                {subheadline ?? ""}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 12,
                  marginTop: 12,
                }}
              >
                {items.map((it: any, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      border: "1px solid #eee",
                      borderRadius: 10,
                      padding: 12,
                    }}
                  >
                    <div style={{ fontSize: 24 }}>{it.icon ?? "✨"}</div>
                    <div style={{ fontWeight: 700, marginTop: 6 }}>
                      {it.title}
                    </div>
                    <div style={{ marginTop: 6, opacity: 0.8 }}>{it.desc}</div>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        // ---- Fallback (unknown block) ----
        return (
          <pre
            key={i}
            style={{ padding: 20, border: "1px dashed #ddd", whiteSpace: "pre-wrap" }}
          >
            {JSON.stringify(b, null, 2)}
          </pre>
        );
      })}
    </div>
  );
}
