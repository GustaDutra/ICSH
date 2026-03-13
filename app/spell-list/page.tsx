"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useMemo } from "react"
import { useLocalStorage } from "@/lib/useLocalStorage"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import SPELL from "@/app/spell-list/spells.json"


interface Spell {
  id: string
  nome: string
  nivel: number
  misterio: string[]
  alcance?: string
  duracao?: string
  descricao?: string
}


const SPELLS: Spell[] = SPELL

const MISTERIOS = [
  "Astral", "Cronomancia", "Espaçomancia", "Gravitomancia", "Runomancia",
  "Elemental Geral", "Água", "Fogo", "Terra", "Vento", "Elétrico", "Som",
  "Flora", "Areia", "Veneno", "Metal", "Gelo", "Cristal", "Magma", "Sombra",
  "Luz", "Advinhação", "Encantamento", "Étermancia", "Ilusão", "Invocação",
  "Necromancia", "Oniromancia", "Transmutação", "Umbramancia",
]

const NIVEIS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/* ── PROCURAR ICONS ── */
const MISTERIO_ICON: Record<string, string> = {
  "Astral": "✦", "Cronomancia": "⧗", "Espaçomancia": "⬡", "Gravitomancia": "◉",
  "Runomancia": "ᚱ", "Elemental Geral": "⬙", "Água": "", "Fogo": "",
  "Terra": "", "Vento": "", "Elétrico": "", "Som": "",
  "Flora": "✿", "Areia": "◇", "Veneno": "☠", "Metal": "",
  "Gelo": "❄", "Cristal": "◆", "Magma": "◱", "Sombra": "",
  "Luz": "", "Advinhação": "◉", "Encantamento": "", "Étermancia": "",
  "Ilusão": "", "Invocação": "⬡", "Necromancia": "", "Oniromancia": "",
  "Transmutação": "⬠", "Umbramancia": "",
}

/* TALVEZ mudar depois */
const MISTERIO_COLOR: Record<string, { bg: string; color: string }> = {
  "Evocação":     { bg: "var(--destructive)", color: "var(--destructive-foreground)" },
  "Abjuração":    { bg: "var(--info)",        color: "var(--info-foreground)" },
  "Transmutação": { bg: "var(--warning)",     color: "var(--warning-foreground)" },
  "Conjuração":   { bg: "var(--success)",     color: "var(--success-foreground)" },
  "Ilusão":       { bg: "var(--muted)",       color: "var(--muted-foreground)" },
  "Necromancia":  { bg: "var(--primary)",     color: "var(--primary-foreground)" },
  "Adivinhação":  { bg: "var(--secondary)",   color: "var(--secondary-foreground)" },
  "Encantamento": { bg: "oklch(65% 0.15 290)", color: "white" },
}


function MisterioBadge({ misterio }: { misterio?: string }) {
  if (!misterio) return null
  const style = MISTERIO_COLOR[misterio] ?? { bg: "var(--muted)", color: "var(--muted-foreground)" }
  return (
    <span style={{
      padding: "0.125rem 0.5rem",
      borderRadius: "var(--radius-pill)",
      background: style.bg,
      color: style.color,
      fontSize: "0.6875rem",
      fontWeight: 700,
      letterSpacing: "0.04em",
      whiteSpace: "nowrap",
    }}>
      {misterio}
    </span>
  )
}


function SpellCard({ spell, index }: { spell: Spell; index: number }) {
  return (
    <a
      href={`/spell-list/${spell.id}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        transition: "box-shadow 0.2s",
        cursor: "pointer",
        animationDelay: `${index * 40}ms`,
      }}
      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"}
      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = "none"}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", gap: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
          <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--foreground)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {spell.nome}
          </span>
        </div>
      </div>
    </a>
  )
}

function NivelSection({ nivel, misterio }: { nivel: number; misterio: string }) {
  const spells = SPELLS.filter(
    (s) => s.misterio.includes(misterio) && s.nivel === nivel
  )
  if (spells.length === 0) return null

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      {/* Level pill */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.625rem" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 28,
          background: "var(--primary)", color: "var(--primary-foreground)",
          borderRadius: "50%", fontSize: "0.75rem", fontWeight: 800, flexShrink: 0,
        }}>
          {nivel}
        </span>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
          Nível
        </span>
      </div>
      {/* Spell cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        {spells.map((spell, i) => (
          <SpellCard key={spell.id} spell={spell} index={i} />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
export default function SpellListPage() {
  const [search, setSearch] = useLocalStorage("arcano:search", "")
  const [dark, setDark] = useLocalStorage("arcano:dark", false)
  const [misterioFilter, setMisterioFilter] = useLocalStorage<string>("arcano:misterioFilter", "all")
  const [openAccordions, setOpenAccordions] = useLocalStorage<string[]>("arcano:openAccordions", [])

  const misterios = useMemo(() => {
    const set = new Set(SPELLS.flatMap((s) => s.misterio))
    return Array.from(set).sort()
  }, [])

  /* Which mysteries have any spell matching current search/filter */
  const activeMisterios = useMemo(() => {
    if (!search && misterioFilter === "all") return new Set(MISTERIOS)
    return new Set(
      SPELLS
        .filter((s) => {
          const matchSearch = !search || s.nome.toLowerCase().includes(search.toLowerCase()) || (s.descricao?.toLowerCase().includes(search.toLowerCase()))
          const matchMisterio = misterioFilter === "all" || s.misterio.includes(misterioFilter)
          return matchSearch && matchMisterio
        })
        .flatMap((s) => s.misterio)
    )
  }, [search, misterioFilter])

  const totalSpells = SPELLS.length
  const visibleSpells = useMemo(() => {
    return SPELLS.filter((s) => {
      const matchSearch = !search || s.nome.toLowerCase().includes(search.toLowerCase())
      const matchMisterio = misterioFilter === "all" || s.misterio.includes(misterioFilter)
      return matchSearch && matchMisterio
    }).length
  }, [search, misterioFilter  ])

  return (
    <div
      className={dark ? "dark" : ""}
      style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh", transition: "background 0.3s, color 0.3s", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      {/* ── HEADER ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "var(--card)",
        borderBottom: "1px solid var(--border)",
        padding: "1rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
        backdropFilter: "blur(8px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          {/* Logo */}
          <div style={{ width: 32, height: 32, background: "var(--primary)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "var(--primary-foreground)", fontSize: "1rem", lineHeight: 1 }}>✦</span>
          </div>
          <div>
            <h1 style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em", margin: 0, lineHeight: 1 }}>
              ICSH
            </h1>
            <p style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)", margin: 0 }}>Lista de Magias</p>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, maxWidth: 560 }}>
          {/* Search*/}
          <div style={{ position: "relative", flex: 1 }}>
            <svg style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar magia..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "0.5rem 0.75rem 0.5rem 2.25rem",
                background: "var(--muted)", border: "1.5px solid var(--border)",
                borderRadius: "var(--radius-pill)", fontSize: "0.875rem",
                color: "var(--foreground)", outline: "none", fontFamily: "inherit",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--ring)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* School filter 
          <select
            value={misterioFilter}
            onChange={(e) => setMisterioFilter(e.target.value)}
            style={{
              padding: "0.5rem 0.875rem",
              background: "var(--muted)", border: "1.5px solid var(--border)",
              borderRadius: "var(--radius-pill)", fontSize: "0.8125rem",
              color: "var(--foreground)", outline: "none", fontFamily: "inherit",
              cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            {misterios.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>*/}

          <div style={{ width: 180, flexShrink: 0 }}>
            <Select value={misterioFilter} onValueChange={setMisterioFilter}>
              <SelectTrigger style={{
                borderRadius: "var(--radius-pill)",
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                border: "none",
                fontSize: "0.8125rem",
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.82"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
              >
                <SelectValue placeholder="Filtrar Mistério" />
              </SelectTrigger>
              <SelectContent style={{ maxHeight: "14rem", overflowY: "auto", textAlign: "center" }}>
                <SelectItem value="all">Todos os Mistérios</SelectItem>
                <SelectSeparator />
                {misterios.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>


        
        {/* Dark mode */}
        <button
          onClick={() => setDark(!dark)}
          style={{
            padding: "0.5rem 0.875rem", borderRadius: "var(--radius-pill)",
            border: "1.5px solid var(--border)", background: "transparent",
            color: "var(--foreground)", fontSize: "0.8125rem", fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
          }}
        >
          {dark ? "☀" : "☾"}
        </button>
      </header>

      {/* ── BODY ── */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Stats bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 0.25rem" }}>
              Mistérios
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", margin: 0 }}>
              {activeMisterios.size} mistérios · {visibleSpells} de {totalSpells} magias
            </p>
          </div>
          {search || misterioFilter !== "all" ? (
            <button
              onClick={() => { setSearch(""); setMisterioFilter("all"); setOpenAccordions([]) }}
              style={{
                padding: "0.375rem 0.875rem", borderRadius: "var(--radius-pill)",
                border: "1.5px solid var(--border)", background: "transparent",
                color: "var(--muted-foreground)", fontSize: "0.8125rem", fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Limpar filtros ✕
            </button>
          ) : null}
        </div>

        {/* Accordions — one per Mistério */}
        <Accordion
          type="multiple"
          value={misterioFilter !== "all" ? [misterioFilter] : openAccordions}
          onValueChange={(vals) => { if (misterioFilter === "all") setOpenAccordions(vals) }}
        >
          {(misterioFilter !== "all" ? [misterioFilter] : MISTERIOS).map((misterio) => {
            const isActive = activeMisterios.has(misterio)
            const spellCount = SPELLS.filter((s) =>
              s.misterio.includes(misterio) &&
              (misterioFilter === "all" || s.misterio.includes(misterioFilter)) &&
              (!search || s.nome.toLowerCase().includes(search.toLowerCase()))
            ).length

            return (
              <AccordionItem
                key={misterio}
                value={misterio}
                style={{ opacity: isActive ? 1 : 0.35, transition: "opacity 0.2s" }}
              >
                <AccordionTrigger
                  style={{ padding: "1rem 0" }}
                  className={isActive ? "" : "pointer-events-none"}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                    {/* Icon */}
                    <span style={{
                      width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "var(--muted)", borderRadius: "var(--radius-sm)",
                      fontSize: "1rem", flexShrink: 0, fontFamily: "monospace",
                    }}>
                      {MISTERIO_ICON[misterio] ?? "◈"}
                    </span>
                    {/* Name */}
                    <span style={{ fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
                      {misterio}
                    </span>
                  </span>
                </AccordionTrigger>

                <AccordionContent>
                  <div style={{ padding: "0.5rem 0 0.75rem 2.875rem" }}>
                    {NIVEIS.map((nivel) => (
                      
                      <NivelSection
                        key={nivel}
                        nivel={nivel}
                        misterio={misterio}
                      />
                    ))}
                    {spellCount === 0 && (
                      <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", fontStyle: "italic" }}>
                        Nenhuma magia encontrada para este filtro.
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

      </div>
    </div>
  )
}