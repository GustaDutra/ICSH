"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/* ── helpers ──────────────────────────────────────────────── */
function Section({ title, description, children }: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section style={{ marginBottom: "3rem" }}>
      <div style={{ marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border)" }}>
        <h2 style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-foreground)", margin: 0 }}>
          {title}
        </h2>
        {description && (
          <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", marginTop: "0.375rem", margin: "0.375rem 0 0" }}>{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div style={{ position: "relative", marginTop: "1rem" }}>
      <pre style={{
        background: "var(--primary)",
        color: "var(--primary-foreground)",
        borderRadius: "var(--radius)",
        padding: "1.25rem 1.5rem",
        fontSize: "0.8125rem",
        fontFamily: "ui-monospace, 'Cascadia Code', monospace",
        overflowX: "auto",
        lineHeight: 1.6,
        margin: 0,
      }}>
        <code>{code}</code>
      </pre>
      <button
        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
        style={{
          position: "absolute", top: "0.75rem", right: "0.75rem",
          padding: "0.25rem 0.625rem",
          background: "oklch(30% 0 0)",
          color: "var(--primary-foreground)",
          border: "none", borderRadius: "var(--radius-sm)",
          fontSize: "0.6875rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  )
}

function PropRow({ name, type, defaultVal, description }: {
  name: string; type: string; defaultVal: string; description: string
}) {
  return (
    <tr style={{ borderBottom: "1px solid var(--border)" }}>
      <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", fontSize: "0.8125rem", fontWeight: 600, color: "var(--foreground)", whiteSpace: "nowrap" }}>{name}</td>
      <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", color: "var(--info)" }}>{type}</td>
      <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{defaultVal}</td>
      <td style={{ padding: "0.75rem 1rem", fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>{description}</td>
    </tr>
  )
}

function DemoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)" }}>
      <span style={{ width: 120, fontSize: "0.8125rem", color: "var(--muted-foreground)", flexShrink: 0 }}>{label}</span>
      {children}
    </div>
  )
}

/* ── MAIN ─────────────────────────────────────────────────── */
export default function SelectShowcase() {
  const [dark, setDark] = useState(false)
  const [controlled, setControlled] = useState("")
  const [misterio, setMisterio] = useState("all")
  const [level, setLevel] = useState("all")
  const [font, setFont] = useState("")

  return (
    <div
      className={dark ? "dark" : ""}
      style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 2.5rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "3rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted-foreground)", background: "var(--muted)", padding: "0.25rem 0.625rem", borderRadius: "var(--radius-pill)" }}>
                shadcn/ui
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--success-foreground)", background: "var(--success)", padding: "0.25rem 0.625rem", borderRadius: "var(--radius-pill)" }}>
                Installed
              </span>
            </div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 0.375rem" }}>
              Select
            </h1>
            <p style={{ fontSize: "0.9375rem", color: "var(--muted-foreground)", margin: 0 }}>
              Displays a list of options for the user to pick from — triggered by a button, powered by Radix UI.
            </p>
          </div>
          <button
            onClick={() => setDark(!dark)}
            style={{
              padding: "0.5rem 1rem", borderRadius: "var(--radius-pill)",
              border: "1.5px solid var(--border)", background: "var(--card)",
              color: "var(--foreground)", fontSize: "0.8125rem", fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: "0.5rem",
            }}
          >
            {dark ? "☀" : "☾"} {dark ? "Light" : "Dark"}
          </button>
        </div>

        {/* 1. Default */}
        <Section title="Default" description="Basic uncontrolled select with a placeholder.">
          <div style={{ width: 200 }}>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar mistério" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="astral">Astral</SelectItem>
                <SelectItem value="fogo">Fogo</SelectItem>
                <SelectItem value="gelo">Gelo</SelectItem>
                <SelectItem value="necromancia">Necromancia</SelectItem>
                <SelectItem value="transmutacao">Transmutação</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Section>

        {/* 2. Controlled */}
        <Section title="Controlled" description="Value managed by React state via value + onValueChange.">
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ width: 200 }}>
              <Select value={controlled} onValueChange={setControlled}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolher nível" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}° Nível</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
              {controlled ? `Nível selecionado: ${controlled}` : "Nenhum selecionado"}
            </span>
            {controlled && (
              <button
                onClick={() => setControlled("")}
                style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}
              >
                Limpar ✕
              </button>
            )}
          </div>
        </Section>

        {/* 3. With reset option + separator */}
        <Section title="With Reset Option" description='A dedicated "all" sentinel as the first item, separated from the real options. This is the pattern used in the spell-list page filter.'>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ width: 200 }}>
              <Select value={misterio} onValueChange={setMisterio}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar Mistério" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Mistérios</SelectItem>
                  <SelectSeparator />
                  {["Astral", "Cronomancia", "Fogo", "Gelo", "Necromancia", "Transmutação"].map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
              {misterio === "all" ? "Mostrando todos" : `Filtrado: ${misterio}`}
            </span>
          </div>
        </Section>

        {/* 4. Groups + labels */}
        <Section title="Groups & Labels" description="Use SelectGroup and SelectLabel to organise long option lists into named categories.">
          <div style={{ width: 220 }}>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar elemento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Elementais</SelectLabel>
                  <SelectItem value="agua">Água</SelectItem>
                  <SelectItem value="fogo">Fogo</SelectItem>
                  <SelectItem value="terra">Terra</SelectItem>
                  <SelectItem value="vento">Vento</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Energia</SelectLabel>
                  <SelectItem value="eletrico">Elétrico</SelectItem>
                  <SelectItem value="som">Som</SelectItem>
                  <SelectItem value="luz">Luz</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Arcano</SelectLabel>
                  <SelectItem value="necromancia">Necromancia</SelectItem>
                  <SelectItem value="ilusao">Ilusão</SelectItem>
                  <SelectItem value="transmutacao">Transmutação</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </Section>

        {/* 5. States */}
        <Section title="States" description="Default, with value, disabled trigger, and disabled item.">
          <div style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
            <DemoRow label="Empty">
              <div style={{ width: 200 }}>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Opção A</SelectItem>
                    <SelectItem value="b">Opção B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DemoRow>
            <DemoRow label="With value">
              <div style={{ width: 200 }}>
                <Select defaultValue="necromancia">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="necromancia">Necromancia</SelectItem>
                    <SelectItem value="ilusao">Ilusão</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DemoRow>
            <DemoRow label="Disabled trigger">
              <div style={{ width: 200 }}>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Não disponível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="x">X</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DemoRow>
            <DemoRow label="Disabled item">
              <div style={{ width: 200 }}>
                <Select defaultValue="a">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Disponível</SelectItem>
                    <SelectItem value="b" disabled>Indisponível</SelectItem>
                    <SelectItem value="c">Disponível</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DemoRow>
          </div>
        </Section>

        {/* 6. Pill variant */}
        <Section title="Pill Variant" description="Rounded trigger matching the header search bar style — set via style prop on SelectTrigger.">
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ width: 180 }}>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger style={{ borderRadius: "var(--radius-pill)", background: "var(--muted)", borderColor: "var(--border)" }}>
                  <SelectValue placeholder="Filtrar nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os níveis</SelectItem>
                  <SelectSeparator />
                  {[1,2,3,4,5].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}° Nível</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div style={{ width: 200 }}>
              <Select value={font} onValueChange={setFont}>
                <SelectTrigger style={{ borderRadius: "var(--radius-pill)", background: "var(--muted)", borderColor: "var(--border)" }}>
                  <SelectValue placeholder="Tipografia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jakarta">Plus Jakarta Sans</SelectItem>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="mono">Monospace</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Section>

        {/* 7. Props */}
        <Section title="Props">
          <div style={{ overflowX: "auto", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                  {["Prop", "Type", "Default", "Description"].map((h) => (
                    <th key={h} style={{ padding: "0.625rem 1rem", textAlign: "left", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <PropRow name="value" type="string" defaultVal="—" description="Controlled selected value. Use with onValueChange." />
                <PropRow name="defaultValue" type="string" defaultVal="—" description="Initial value for uncontrolled usage." />
                <PropRow name="onValueChange" type="(value: string) => void" defaultVal="—" description="Callback fired when the selected value changes." />
                <PropRow name="disabled" type="boolean" defaultVal="false" description="Disables the entire select trigger and dropdown." />
                <PropRow name="placeholder" type="string" defaultVal="—" description="Text shown in SelectValue when no value is selected." />
                <PropRow name="open" type="boolean" defaultVal="—" description="Controlled open state of the dropdown." />
                <PropRow name="onOpenChange" type="(open: boolean) => void" defaultVal="—" description="Callback fired when open state changes." />
              </tbody>
            </table>
          </div>
        </Section>

        {/* 8. Usage */}
        <Section title="Usage">
          <CodeBlock code={`import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectLabel, SelectSeparator,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"

// Basic — wrap in a div to control width
<div style={{ width: 200 }}>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Selecionar mistério" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="astral">Astral</SelectItem>
      <SelectItem value="fogo">Fogo</SelectItem>
    </SelectContent>
  </Select>
</div>

// Controlled with reset sentinel
const [filter, setFilter] = useState("all")

<div style={{ width: 200 }}>
  <Select value={filter} onValueChange={setFilter}>
    <SelectTrigger>
      <SelectValue placeholder="Filtrar Mistério" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">Todos os Mistérios</SelectItem>
      <SelectSeparator />
      <SelectItem value="fogo">Fogo</SelectItem>
    </SelectContent>
  </Select>
</div>

// Pill style — via style prop on SelectTrigger
<SelectTrigger style={{ borderRadius: "var(--radius-pill)", background: "var(--muted)" }}>
  <SelectValue placeholder="Filtrar nível" />
</SelectTrigger>`} />
        </Section>

        {/* 9. Installation */}
        <Section title="Installation">
          <CodeBlock code={`npx shadcn@latest add select`} />
          <div style={{ marginTop: "1rem", padding: "1rem 1.25rem", background: "var(--muted)", borderRadius: "var(--radius-sm)", fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--foreground)" }}>Dependencies:</strong> @radix-ui/react-select · lucide-react
            <br />
            <strong style={{ color: "var(--foreground)" }}>File created:</strong> /components/ui/select.tsx
            <br />
            <strong style={{ color: "var(--foreground)" }}>Keyboard:</strong> Space / Enter opens · ↑↓ navigates options · typing jumps to matching item · Esc closes
          </div>
        </Section>

      </div>
    </div>
  )
}
