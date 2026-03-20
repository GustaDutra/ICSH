"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMemo } from "react"
import { useLocalStorage } from "@/lib/useLocalStorage"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import RITUAL from "@/app/ritual-list/rituals.json"

interface Ritual {
  id: string
  nome: string
  nivel: number
  conjuradores: number
  tempo: string
  componentes: string
  teste: string
  descricao?: string
  nivel_superior?: string
}

const RITUALS: Ritual[] = RITUAL as Ritual[]
const NIVEIS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const TESTES = ["Misticismo", "N/A"]

function RitualCard({ ritual, index }: { ritual: Ritual; index: number }) {
  return (
    <a
      href={`/ritual-list/${ritual.id}`}
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
        <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {ritual.nome}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          {ritual.conjuradores > 1 && (
            <span style={{
              fontSize: "0.6875rem", fontWeight: 700,
              padding: "0.125rem 0.5rem", borderRadius: "var(--radius-pill)",
              background: "var(--primary)", color: "var(--primary-foreground)",
              whiteSpace: "nowrap",
            }}>
              {ritual.conjuradores} conjuradores
            </span>
          )}
        </div>
      </div>
    </a>
  )
}

function NivelSection({ nivel, rituals }: { nivel: number; rituals: Ritual[] }) {
  const filtered = rituals.filter((r) => r.nivel === nivel)
  if (filtered.length === 0) return null

  return (
    <div style={{ marginBottom: "1.25rem" }}>
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
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        {filtered.map((ritual, i) => (
          <RitualCard key={ritual.id} ritual={ritual} index={i} />
        ))}
      </div>
    </div>
  )
}

export default function RitualListPage() {
  const [search, setSearch] = useLocalStorage("arcano:ritual:search", "")
  const [dark, setDark] = useLocalStorage("arcano:dark", false)
  const [nivelFilter, setNivelFilter] = useLocalStorage<string>("arcano:ritual:nivelFilter", "all")
  const [testeFilter, setTesteFilter] = useLocalStorage<string>("arcano:ritual:testeFilter", "all")
  const [openAccordions, setOpenAccordions] = useLocalStorage<string[]>("arcano:ritual:openAccordions", [])

  const visibleRituals = useMemo(() => {
    return RITUALS.filter((r) => {
      const matchSearch = !search ||
        r.nome.toLowerCase().includes(search.toLowerCase()) ||
        r.teste?.toLowerCase().includes(search.toLowerCase()) ||
        r.componentes?.toLowerCase().includes(search.toLowerCase()) ||
        r.descricao?.toLowerCase().includes(search.toLowerCase())
      const matchNivel = nivelFilter === "all" || r.nivel === Number(nivelFilter)
      const matchTeste = testeFilter === "all" || r.teste === testeFilter
      return matchSearch && matchNivel && matchTeste
    })
  }, [search, nivelFilter, testeFilter])

  // Which levels have visible rituals (for accordion opacity)
  const activeLevels = useMemo(() => new Set(visibleRituals.map((r) => r.nivel)), [visibleRituals])

  const hasFilters = search || nivelFilter !== "all" || testeFilter !== "all"

  // When filtering by level, only show that level's accordion
  const accordionLevels = nivelFilter !== "all"
    ? [Number(nivelFilter)]
    : NIVEIS.filter((n) => RITUALS.some((r) => r.nivel === n))

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
          <div style={{ width: 32, height: 32, background: "var(--primary)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "var(--primary-foreground)", fontSize: "1rem", lineHeight: 1 }}>✦</span>
          </div>
          <div>
            <h1 style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em", margin: 0, lineHeight: 1 }}>
              ICSH
            </h1>
            <p style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)", margin: 0 }}>Lista de Rituais</p>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, maxWidth: 640 }}>
          {/* Search */}
          <div style={{ position: "relative", flex: 1 }}>
            <svg style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar ritual..."
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

          {/* Nivel filter */}
          <div style={{ width: 150, flexShrink: 0 }}>
            <Select value={nivelFilter} onValueChange={setNivelFilter}>
              <SelectTrigger style={{
                borderRadius: "var(--radius-pill)",
                background: "var(--primary)", color: "var(--primary-foreground)",
                border: "none", fontSize: "0.8125rem", fontFamily: "inherit",
                cursor: "pointer", transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.82"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
              >
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent style={{ maxHeight: "14rem", overflowY: "auto", textAlign: "center" }}>
                <SelectItem value="all">Todos os Níveis</SelectItem>
                <SelectSeparator />
                {NIVEIS.filter((n) => RITUALS.some((r) => r.nivel === n)).map((n) => (
                  <SelectItem key={n} value={String(n)}>Nível {n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Teste filter */}
          <div style={{ width: 150, flexShrink: 0 }}>
            <Select value={testeFilter} onValueChange={setTesteFilter}>
              <SelectTrigger style={{
                borderRadius: "var(--radius-pill)",
                background: "var(--primary)", color: "var(--primary-foreground)",
                border: "none", fontSize: "0.8125rem", fontFamily: "inherit",
                cursor: "pointer", transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.82"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
              >
                <SelectValue placeholder="Teste" />
              </SelectTrigger>
              <SelectContent style={{ textAlign: "center" }}>
                <SelectItem value="all">Todos os Testes</SelectItem>
                <SelectSeparator />
                {TESTES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
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

                {/* Nav tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
          <a href="/spell-list" style={{
            padding: "0.5rem 1.25rem", borderRadius: "var(--radius-pill)",
            background: "var(--primary)", color: "var(--primary-foreground)",
            fontSize: "0.875rem", fontWeight: 700, textDecoration: "none",
            border: "1.5px solid transparent", transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.82"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
          >
            Magias
          </a>
          <a href="/ritual-list" style={{
            padding: "0.5rem 1.25rem", borderRadius: "var(--radius-pill)",
            background: "transparent", color: "var(--muted-foreground)",
            fontSize: "0.875rem", fontWeight: 700, textDecoration: "none",
            border: "1.5px solid var(--border)", transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "var(--muted)"; el.style.color = "var(--foreground)" }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--muted-foreground)" }}
          >
            Rituais
          </a>
        </div>

        {/* Stats bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 0.25rem" }}>
              Rituais
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", margin: 0 }}>
              {visibleRituals.length} de {RITUALS.length} rituais
            </p>
          </div>
          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setNivelFilter("all"); setTesteFilter("all"); setOpenAccordions([]) }}
              style={{
                padding: "0.375rem 0.875rem", borderRadius: "var(--radius-pill)",
                border: "1.5px solid var(--border)", background: "transparent",
                color: "var(--muted-foreground)", fontSize: "0.8125rem", fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Limpar filtros ✕
            </button>
          )}
        </div>

        {/* Accordions — one per level */}
        <Accordion
          type="multiple"
          value={nivelFilter !== "all" ? [nivelFilter] : openAccordions}
          onValueChange={(vals) => { if (nivelFilter === "all") setOpenAccordions(vals) }}
        >
          {accordionLevels.map((nivel) => {
            const isActive = activeLevels.has(nivel)
            const nivelKey = String(nivel)

            return (
              <AccordionItem
                key={nivelKey}
                value={nivelKey}
                style={{ opacity: isActive ? 1 : 0.35, transition: "opacity 0.2s" }}
              >
                <AccordionTrigger
                  style={{ padding: "1rem 0" }}
                  className={isActive ? "" : "pointer-events-none"}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                    <span style={{
                      width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "var(--muted)", borderRadius: "var(--radius-sm)",
                      fontSize: "0.875rem", fontWeight: 800, flexShrink: 0,
                    }}>
                      {nivel}
                    </span>
                    <span style={{ fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
                      Nível {nivel}
                    </span>
                  </span>
                </AccordionTrigger>

                <AccordionContent>
                  <div style={{ padding: "0.5rem 0 0.75rem 2.875rem" }}>
                    <NivelSection nivel={nivel} rituals={visibleRituals} />
                    {!activeLevels.has(nivel) && (
                      <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", fontStyle: "italic" }}>
                        Nenhum ritual encontrado para este filtro.
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        {visibleRituals.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--muted-foreground)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✦</div>
            <p style={{ fontSize: "0.9375rem" }}>Nenhum ritual encontrado.</p>
          </div>
        )}

      </div>
    </div>
  )
}