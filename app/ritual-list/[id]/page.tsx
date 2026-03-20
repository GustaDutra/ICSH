"use client"
import React from "react"
import { useLocalStorage } from "@/lib/useLocalStorage"
import RITUAL from "@/app/ritual-list/rituals.json"
import Markdown from "react-markdown"

type Ritual = {
  id: string
  nome: string
  nivel: number
  conjuradores: number
  tempo: string
  componentes: string
  teste: string
  descricao: string
  nivel_superior: string
}

function IconSun() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  )
}

function IconMoon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function IconBookmark({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function IconArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  )
}

function StatCell({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ padding: "0.875rem 0" }}>
      <p style={{
        fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "var(--foreground)", marginBottom: "0.375rem",
      }}>
        {label}
      </p>
      <p style={{ fontSize: "0.9375rem", color: "var(--muted-foreground)", margin: 0, lineHeight: 1.5 }}>
        {value || "—"}
      </p>
    </div>
  )
}

function Badge({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "0.25rem 0.75rem",
      borderRadius: "var(--radius-pill)",
      fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.04em",
      background: "var(--muted)", color: "var(--muted-foreground)",
      whiteSpace: "nowrap",
      ...style,
    }}>
      {children}
    </span>
  )
}

function IconBtn({ onClick, active, title, children }: {
  onClick: () => void; active?: boolean; title?: string; children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 36, height: 36,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius-pill)",
        border: "1.5px solid var(--border)",
        background: active ? "var(--primary)" : "transparent",
        color: active ? "var(--primary-foreground)" : "var(--foreground)",
        cursor: "pointer",
        transition: "background 0.15s, color 0.15s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "var(--muted)" }}
      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent" }}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div style={{ height: "1px", background: "var(--border)" }} />
}

function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "1rem", textAlign: "center", padding: "2rem" }}>
      <div style={{ fontSize: "3rem", lineHeight: 1 }}>✦</div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Ritual não encontrado</h1>
      <p style={{ color: "var(--muted-foreground)", fontSize: "0.9375rem" }}>O grimório não contém este ritual.</p>
      <a href="/ritual-list" style={{ marginTop: "0.5rem", padding: "0.5rem 1.25rem", borderRadius: "var(--radius-pill)", background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>
        ← Voltar à lista
      </a>
    </div>
  )
}

export default function RitualPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params)
  const ritual = (RITUAL as Ritual[]).find((r) => String(r.id) === String(unwrappedParams.id))

  const [dark, setDark] = useLocalStorage("arcano:dark", false)
  const [bookmarked, setBookmarked] = useLocalStorage<string[]>("arcano:ritual:bookmarks", [])
  const isBookmarked = bookmarked.includes(unwrappedParams.id)
  const toggleBookmark = () =>
    setBookmarked(isBookmarked
      ? bookmarked.filter((b) => b !== unwrappedParams.id)
      : [...bookmarked, unwrappedParams.id]
    )

  if (!ritual) return <NotFound />

  const nivelLabel = `${ritual.nivel}° Nível`
  const hasNivelSuperior = ritual.nivel_superior?.trim().length > 0
  const paragraphs = ritual.descricao.split("\n\n").map(p => p.trim()).filter(Boolean)

  return (
    <div
      className={dark ? "dark" : ""}
      style={{
        background: "var(--background)", color: "var(--foreground)",
        minHeight: "100vh", transition: "background 0.3s, color 0.3s",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ── HEADER ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "var(--card)", borderBottom: "1px solid var(--border)",
        padding: "0.875rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
        transition: "background 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <a
            href="/ritual-list"
            style={{
              display: "flex", alignItems: "center", gap: "0.375rem",
              fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none",
              color: "var(--muted-foreground)", padding: "0.375rem 0.75rem",
              borderRadius: "var(--radius-pill)", border: "1.5px solid var(--border)",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--muted)"; el.style.color = "var(--foreground)" }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--muted-foreground)" }}
          >
            <IconArrowLeft />
            Lista de Rituais
          </a>
          <div style={{ width: 1, height: 20, background: "var(--border)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 24, height: 24, background: "var(--primary)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "var(--primary-foreground)" }}>✦</div>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "-0.02em" }}>ICSH</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <IconBtn onClick={toggleBookmark} active={isBookmarked} title={isBookmarked ? "Remover dos favoritos" : "Adicionar aos favoritos"}>
            <IconBookmark filled={isBookmarked} />
          </IconBtn>
          <IconBtn onClick={() => setDark(!dark)} title={dark ? "Modo claro" : "Modo escuro"}>
            {dark ? <IconSun /> : <IconMoon />}
          </IconBtn>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* ── HERO ── */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem", alignItems: "center" }}>
            <Badge>{nivelLabel}</Badge>
            {ritual.teste && ritual.teste !== "N/A" && (
              <Badge style={{ background: "var(--secondary)", color: "var(--secondary-foreground)" }}>
                Teste: {ritual.teste}
              </Badge>
            )}
            {isBookmarked && (
              <Badge style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                ★ Favoritado
              </Badge>
            )}
          </div>

          <h1 style={{
            fontSize: "clamp(1.875rem, 5vw, 2.75rem)",
            fontWeight: 800, letterSpacing: "-0.04em",
            lineHeight: 1.05, margin: "0 0 0.5rem",
          }}>
            {ritual.nome}
          </h1>
        </div>

        <Divider />

        {/* ── STAT BLOCK ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "0 2rem",
          borderBottom: "1px solid var(--border)",
        }}>
          <StatCell label="Nível" value={nivelLabel} />
          <StatCell label="Conjuradores" value={ritual.conjuradores} />
          <StatCell label="Tempo de Conjuração" value={ritual.tempo} />
          <StatCell label="Teste" value={ritual.teste} />
          <StatCell label="Componentes" value={ritual.componentes || "—"} />
        </div>

        <Divider />

        {/* ── DESCRIPTION ── */}
        <div style={{ margin: "1.75rem 0" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {paragraphs.map((para, i) => (
              <div key={i} style={{ fontSize: "0.9375rem", lineHeight: 1.8, color: "var(--foreground)", margin: 0 }}>
                <Markdown>{para}</Markdown>
              </div>
            ))}
          </div>
        </div>

        {/* ── EM NÍVEIS SUPERIORES ── */}
        {hasNivelSuperior && (
          <>
            <Divider />
            <div style={{ margin: "1.75rem 0" }}>
              <h2 style={{
                fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "1rem",
              }}>
                Em Níveis Superiores
              </h2>
              <div style={{
                padding: "1.125rem 1.375rem",
                background: "var(--primary)", color: "var(--primary-foreground)",
                borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)",
                display: "flex", gap: "0.875rem", alignItems: "flex-start",
              }}>
                <span style={{ fontSize: "1.25rem", lineHeight: 1, flexShrink: 0, marginTop: "0.125rem" }}>✦</span>
                <div style={{ fontSize: "0.9375rem", lineHeight: 1.75, margin: 0, opacity: 0.92 }}>
                  <Markdown>{ritual.nivel_superior}</Markdown>
                </div>
              </div>
            </div>
          </>
        )}

        <Divider />

        {/* ── FOOTER ── */}
        <div style={{ marginTop: "1.75rem", display: "flex", justifyContent: "flex-end" }}>
          <a
            href="/ritual-list"
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.875rem", fontWeight: 700, textDecoration: "none",
              padding: "0.5rem 1.25rem",
              background: "var(--primary)", color: "var(--primary-foreground)",
              borderRadius: "var(--radius-pill)", transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.82"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
          >
            ← Voltar aos Rituais
          </a>
        </div>

      </div>
    </div>
  )
}