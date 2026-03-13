"use client"
import React from "react"
import { useLocalStorage } from "@/lib/useLocalStorage"
import SPELL from "@/app/spell-list/spells.json"


type Spell = {
  id: string
  misterio: string | string[]
  nivel: number
  nome: string
  Tempo: string
  Alcance: string
  Componentes: string
  duracao: string
  descricao: string
  nivel_superior: string
}

const ESCOLA_STYLE: Record<string, { bg: string; color: string }> = {
  Evocação:     { bg: "var(--destructive)", color: "var(--destructive-foreground)" },
  Abjuração:    { bg: "var(--info)",        color: "var(--info-foreground)" },
  Transmutação: { bg: "var(--warning)",     color: "var(--warning-foreground)" },
  Conjuração:   { bg: "var(--success)",     color: "var(--success-foreground)" },
  Ilusão:       { bg: "var(--muted)",       color: "var(--muted-foreground)" },
  Necromancia:  { bg: "var(--primary)",     color: "var(--primary-foreground)" },
  Adivinhação:  { bg: "var(--secondary)",   color: "var(--secondary-foreground)" },
  Encantamento: { bg: "oklch(65% 0.15 290)", color: "white" },
}

const NIVEL_LABEL: Record<number, string> = {
  0: "Truque",
  1: "1° nível", 2: "2° nível", 3: "3° nível",
  4: "4° nível", 5: "5° nível", 6: "6° nível",
  7: "7° nível", 8: "8° nível", 9: "9° nível", 10: "10° nível",
}

/* ── Icons ── */
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

/* ── Stat cell — matches the image layout ── */
function StatCell({
  label,
  value,
  icon,
  borderBottom = false,
}: {
  label: string
  value: string
  icon?: React.ReactNode
  borderBottom?: boolean
}) {
  return (
    <div style={{
      padding: "0.875rem 0",
      borderBottom: borderBottom ? "1px solid var(--border)" : "none",
    }}>
      <p style={{
        fontSize: "0.6875rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--foreground)",
        marginBottom: "0.375rem",
      }}>
        {label}
      </p>
      <p style={{
        fontSize: "0.9375rem",
        color: "var(--muted-foreground)",
        display: "flex",
        alignItems: "center",
        gap: "0.375rem",
        margin: 0,
      }}>
        {icon && <span style={{ color: "var(--foreground)" }}>{icon}</span>}
        {value}
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

function IconBtn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  title?: string
  children: React.ReactNode
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
        transition: "background 0.15s, color 0.15s, border-color 0.15s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (!active) (e.currentTarget as HTMLElement).style.background = "var(--muted)"
      }}
      onMouseLeave={(e) => {
        if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"
      }}
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
      <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Magia não encontrada</h1>
      <p style={{ color: "var(--muted-foreground)", fontSize: "0.9375rem" }}>O grimório não contém esta magia.</p>
      <a href="/spell-list" style={{ marginTop: "0.5rem", padding: "0.5rem 1.25rem", borderRadius: "var(--radius-pill)", background: "var(--primary)", color: "var(--primary-foreground)", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none" }}>
        ← Voltar à lista
      </a>
    </div>
  )
}

export default function SpellPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params)  // Unwrap the Promise
  const spell = (SPELL as Spell[]).find((s) => String(s.id) === String(unwrappedParams.id))
  // Find the spell matching the URL ID

  const [dark, setDark] = useLocalStorage("arcano:dark", false)
  const [bookmarked, setBookmarked] = useLocalStorage<string[]>("arcano:bookmarks", [])
  const isBookmarked = bookmarked.includes(unwrappedParams.id)
  const toggleBookmark = () =>
    setBookmarked(isBookmarked
      ? bookmarked.filter((b) => b !== unwrappedParams.id)
      : [...bookmarked, unwrappedParams.id]
    )

  if (!spell) return <NotFound />


  const misterios = Array.isArray(spell.misterio) ? spell.misterio : [spell.misterio]
  const nivelLabel = NIVEL_LABEL[spell.nivel] ?? `${spell.nivel}° Nível`
  const hasNivelSuperior = spell.nivel_superior?.trim().length > 0
  const paragraphs = spell.descricao.split("\n\n").map(p => p.trim()).filter(Boolean)

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
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "1rem",
        transition: "background 0.3s",
      }}>
        {/* Left: back + logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <a
            href="/spell-list"
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
            Lista de Magias
          </a>
          <div style={{ width: 1, height: 20, background: "var(--border)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 24, height: 24, background: "var(--primary)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "var(--primary-foreground)", transition: "background 0.3s" }}>✦</div>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "-0.02em" }}>Arcano</span>
          </div>
        </div>

        {/* Right: bookmark + dark mode */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <IconBtn
            onClick={toggleBookmark}
            active={isBookmarked}
            title={isBookmarked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <IconBookmark filled={isBookmarked} />
          </IconBtn>
          <IconBtn
            onClick={() => setDark(!dark)}
            title={dark ? "Modo claro" : "Modo escuro"}
          >
            {dark ? <IconSun /> : <IconMoon />}
          </IconBtn>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* ── HERO ── */}
        <div style={{ marginBottom: "1.75rem" }}>
          {/* Badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem", alignItems: "center" }}>
            {misterios.map(m => (
              <Badge key={m} style={{ background: "var(--secondary)", color: "var(--secondary-foreground)" }}>{m}</Badge>
            ))}
            {isBookmarked && (
              <Badge style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                ★ Favoritado
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: "clamp(1.875rem, 5vw, 2.75rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            margin: "0 0 0.5rem",
          }}>
            {spell.nome}
          </h1>

          {/* Subtitle */}
        </div>

        <Divider />

        {/* ── STAT BLOCK — mirrors the image exactly ── */}
        <div style={{ margin: "0" }}>
          {/* Row 1 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0 2rem",
            borderBottom: "1px solid var(--border)",
          }}>
            <StatCell label="Nível" value={nivelLabel} borderBottom={false} />
            <StatCell label="Tempo de Conjuração" value={spell.Tempo} borderBottom={false} />
            <StatCell label="Alcance / Área" value={spell.Alcance} borderBottom={false} />
            <StatCell label="Componentes" value={spell.Componentes} borderBottom={false} />
          </div>

          {/* Row 2 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0 2rem",
          }}>
            <StatCell
              label="Duração"
              value={spell.duracao}
              icon={
                spell.duracao.toLowerCase().includes("concentra") ? (
                  <span style={{ fontSize: "0.75rem", fontWeight: 800 }}>◆</span>
                ) : undefined
              }
            />
          </div>
        </div>

        <Divider />

        {/* ── DESCRIPTION ── */}
        <div style={{ margin: "1.75rem 0" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {paragraphs.map((para, i) => (
              <p key={i} style={{
                fontSize: "0.9375rem",
                lineHeight: 1.8,
                color: "var(--foreground)",
                margin: 0,
              }}>
                {para}
              </p>
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
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, margin: 0, opacity: 0.92 }}>
                  {spell.nivel_superior}
                </p>
              </div>
            </div>
          </>
        )}

        <Divider />

        {/* ── FOOTER ── */}
        <div style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {misterios.map(m => (
              <a
                key={m}
                href={`/spell-list?misterio=${encodeURIComponent(m)}`}
                style={{
                  fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)",
                  textDecoration: "none", padding: "0.25rem 0.75rem",
                  border: "1.5px solid var(--border)", borderRadius: "var(--radius-pill)",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--muted)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                Ver todas de {m} →
              </a>
            ))}
          </div>
          <a
            href="/spell-list"
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
            ← Voltar ao Grimório
          </a>
        </div>

      </div>
    </div>
  )
}