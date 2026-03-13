"use client"

import { useState } from "react"

/* ── tiny helpers ─────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "3.5rem" }}>
      <h2
        style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          marginBottom: "1.25rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function Swatch({
  label,
  cssVar,
  value,
  dark = false,
}: {
  label: string
  cssVar: string
  value: string
  dark?: boolean
}) {
  const [copied, setCopied] = useState(false)
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem", cursor: "pointer" }}
      onClick={() => {
        navigator.clipboard.writeText(cssVar)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      }}
    >
      <div
        style={{
          background: `var(${cssVar})`,
          height: 56,
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border)",
          transition: "transform 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.03)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
      />
      <div>
        <p style={{ fontSize: "0.75rem", fontWeight: 600, margin: 0 }}>{label}</p>
        <p style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)", margin: 0, fontFamily: "monospace" }}>
          {copied ? "Copied!" : cssVar}
        </p>
        <p style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)", margin: 0 }}>{value}</p>
      </div>
    </div>
  )
}

function SwatchRow({ swatches }: { swatches: { label: string; cssVar: string; value: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "0.75rem" }}>
      {swatches.map((s) => <Swatch key={s.cssVar} {...s} />)}
    </div>
  )
}

/* ── COMPONENT PREVIEWS ───────────────────────────────── */
function ButtonPreview() {
  const variants = [
    { label: "Primary", bg: "var(--primary)", color: "var(--primary-foreground)", border: "none" },
    { label: "Secondary", bg: "var(--secondary)", color: "var(--secondary-foreground)", border: "none" },
    { label: "Outline", bg: "transparent", color: "var(--foreground)", border: "1px solid var(--border)" },
    { label: "Ghost", bg: "transparent", color: "var(--foreground)", border: "none" },
    { label: "Destructive", bg: "var(--destructive)", color: "var(--destructive-foreground)", border: "none" },
  ]
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
      {variants.map((v) => (
        <button
          key={v.label}
          style={{
            padding: "0.5rem 1.125rem",
            borderRadius: "var(--radius-pill)",
            background: v.bg,
            color: v.color,
            border: v.border || "none",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.82")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          {v.label}
        </button>
      ))}
    </div>
  )
}

function BadgePreview() {
  const badges = [
    { label: "In Progress", bg: "var(--foreground)", color: "var(--background)" },
    { label: "Completed", bg: "var(--success)", color: "var(--success-foreground)" },
    { label: "Stopped", bg: "var(--destructive)", color: "var(--destructive-foreground)" },
    { label: "Draft", bg: "var(--muted)", color: "var(--muted-foreground)" },
    { label: "New", bg: "var(--info)", color: "var(--info-foreground)" },
  ]
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
      {badges.map((b) => (
        <span
          key={b.label}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "var(--radius-pill)",
            background: b.bg,
            color: b.color,
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.01em",
          }}
        >
          {b.label}
        </span>
      ))}
    </div>
  )
}

function CardPreview() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
      {/* Dark card (like Overall Information) */}
      <div
        style={{
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <p style={{ fontSize: "0.75rem", fontWeight: 600, margin: "0 0 0.75rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.06em" }}>Overall Information</p>
        <p style={{ fontSize: "2.25rem", fontWeight: 800, margin: "0 0 0.25rem", letterSpacing: "-0.03em" }}>43</p>
        <p style={{ fontSize: "0.75rem", margin: 0, opacity: 0.6 }}>Tasks done for all time</p>
      </div>

      {/* White card (like Month Goals) */}
      <div
        style={{
          background: "var(--card)",
          color: "var(--card-foreground)",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <p style={{ fontSize: "0.75rem", fontWeight: 600, margin: "0 0 0.75rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Month Goals</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {["Read 2 books ✓", "Sports every day", "Complete the course"].map((item, i) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${i === 0 ? "var(--primary)" : "var(--border)"}`, background: i === 0 ? "var(--primary)" : "transparent", flexShrink: 0 }} />
              <span style={{ fontSize: "0.8125rem", textDecoration: i === 0 ? "none" : "none", opacity: i === 0 ? 1 : 0.6 }}>{item.replace(" ✓", "")}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Muted card */}
      <div
        style={{
          background: "var(--muted)",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem",
          border: "1.5px dashed var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>+</span>
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--muted-foreground)" }}>Add task</span>
      </div>
    </div>
  )
}

function AlertPreview() {
  const alerts = [
    { type: "Success", bg: "var(--success)", fg: "var(--success-foreground)", icon: "✓", msg: "Task completed successfully" },
    { type: "Warning", bg: "var(--warning)", fg: "var(--warning-foreground)", icon: "⚠", msg: "2 projects are stopped" },
    { type: "Error", bg: "var(--destructive)", fg: "var(--destructive-foreground)", icon: "✕", msg: "Failed to sync with Notion" },
    { type: "Info", bg: "var(--info)", fg: "var(--info-foreground)", icon: "i", msg: "+20% compared to last month" },
  ]
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
      {alerts.map((a) => (
        <div
          key={a.type}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1rem",
            borderRadius: "var(--radius)",
            background: a.bg,
            color: a.fg,
          }}
        >
          <span style={{ fontWeight: 700, width: 18, textAlign: "center", flexShrink: 0 }}>{a.icon}</span>
          <div>
            <p style={{ margin: 0, fontSize: "0.8125rem", fontWeight: 700 }}>{a.type}</p>
            <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.85 }}>{a.msg}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function RadioGroupPreview() {
  const [selected, setSelected] = useState("sport")
  const options = ["sport", "study", "project"]
  return (
    <div style={{ display: "flex", gap: "1.5rem" }}>
      {options.map((opt) => (
        <label key={opt} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <div
            onClick={() => setSelected(opt)}
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: `2px solid ${selected === opt ? "var(--primary)" : "var(--border)"}`,
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.15s",
            }}
          >
            {selected === opt && (
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)" }} />
            )}
          </div>
          <span style={{ fontSize: "0.875rem", fontWeight: 500, textTransform: "capitalize" }}>{opt}</span>
        </label>
      ))}
    </div>
  )
}

/* ── MAIN PAGE ────────────────────────────────────────── */
export default function StyleguidePage() {
  const [dark, setDark] = useState(false)

  return (
    <div
      className={dark ? "dark" : ""}
      style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "3rem 2.5rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "3rem" }}>
          <div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                margin: "0 0 0.375rem",
              }}
            >
              Design Tokens
            </h1>
            <p style={{ fontSize: "0.9375rem", color: "var(--muted-foreground)", margin: 0 }}>
              iDraft · Monochromatic minimal design system
            </p>
          </div>
          <button
            onClick={() => setDark(!dark)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "var(--radius-pill)",
              border: "1.5px solid var(--border)",
              background: "var(--card)",
              color: "var(--foreground)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {dark ? "☀" : "☾"} {dark ? "Light mode" : "Dark mode"}
          </button>
        </div>

        {/* 1. Primary Scale */}
        <Section title="Primary Scale">
          <SwatchRow
            swatches={[
              { label: "50", cssVar: "--primary-50", value: "oklch(97% 0 0)" },
              { label: "100", cssVar: "--primary-100", value: "oklch(93% 0 0)" },
              { label: "200", cssVar: "--primary-200", value: "oklch(86% 0 0)" },
              { label: "300", cssVar: "--primary-300", value: "oklch(74% 0 0)" },
              { label: "400", cssVar: "--primary-400", value: "oklch(58% 0 0)" },
              { label: "500", cssVar: "--primary-500", value: "oklch(42% 0 0)" },
              { label: "600", cssVar: "--primary-600", value: "oklch(30% 0 0)" },
              { label: "700", cssVar: "--primary-700", value: "oklch(22% 0 0)" },
              { label: "800", cssVar: "--primary-800", value: "oklch(16% 0 0)" },
              { label: "900", cssVar: "--primary-900", value: "oklch(10% 0 0)" },
            ]}
          />
        </Section>

        {/* 2. Grey Scale */}
        <Section title="Grey Scale">
          <SwatchRow
            swatches={[
              { label: "50", cssVar: "--grey-50", value: "oklch(97.5% 0 0)" },
              { label: "100", cssVar: "--grey-100", value: "oklch(95% 0 0)" },
              { label: "200", cssVar: "--grey-200", value: "oklch(91% 0 0)" },
              { label: "300", cssVar: "--grey-300", value: "oklch(85% 0 0)" },
              { label: "400", cssVar: "--grey-400", value: "oklch(74% 0 0)" },
              { label: "500", cssVar: "--grey-500", value: "oklch(60% 0 0)" },
              { label: "600", cssVar: "--grey-600", value: "oklch(48% 0 0)" },
              { label: "700", cssVar: "--grey-700", value: "oklch(36% 0 0)" },
              { label: "800", cssVar: "--grey-800", value: "oklch(24% 0 0)" },
              { label: "900", cssVar: "--grey-900", value: "oklch(14% 0 0)" },
            ]}
          />
        </Section>

        {/* 3. Semantic Colors */}
        <Section title="Semantic Colors">
          <SwatchRow
            swatches={[
              { label: "Success", cssVar: "--success", value: "oklch(52% 0.17 145)" },
              { label: "Warning", cssVar: "--warning", value: "oklch(68% 0.17 65)" },
              { label: "Destructive", cssVar: "--destructive", value: "oklch(52% 0.21 27)" },
              { label: "Info", cssVar: "--info", value: "oklch(55% 0.18 240)" },
            ]}
          />
        </Section>

        {/* 4. Surface Colors */}
        <Section title="Surface & UI Colors">
          <SwatchRow
            swatches={[
              { label: "Background", cssVar: "--background", value: "Page BG" },
              { label: "Card", cssVar: "--card", value: "Card surface" },
              { label: "Primary", cssVar: "--primary", value: "Brand / active" },
              { label: "Secondary", cssVar: "--secondary", value: "Subtle fill" },
              { label: "Muted", cssVar: "--muted", value: "Disabled / muted" },
              { label: "Border", cssVar: "--border", value: "Dividers" },
              { label: "Sidebar", cssVar: "--sidebar", value: "Sidebar BG" },
            ]}
          />
        </Section>

        {/* 5. Chart Colors */}
        <Section title="Chart Colors">
          <SwatchRow
            swatches={[
              { label: "Chart 1", cssVar: "--chart-1", value: "Primary data" },
              { label: "Chart 2", cssVar: "--chart-2", value: "Secondary" },
              { label: "Chart 3", cssVar: "--chart-3", value: "Tertiary" },
              { label: "Chart 4", cssVar: "--chart-4", value: "Quaternary" },
              { label: "Chart 5", cssVar: "--chart-5", value: "Quinary" },
            ]}
          />
        </Section>

        {/* 6. Typography */}
        <Section title="Typography">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { label: "Display / H1", size: "2.5rem", weight: 800, text: "Hi, Dilan!", tracking: "-0.04em" },
              { label: "Heading / H2", size: "1.75rem", weight: 700, text: "Overall Information", tracking: "-0.03em" },
              { label: "Heading / H3", size: "1.25rem", weight: 600, text: "Weekly Progress", tracking: "-0.02em" },
              { label: "Body / Large", size: "1rem", weight: 400, text: "Complete the course before the deadline arrives this quarter." },
              { label: "Body / Default", size: "0.875rem", weight: 400, text: "Tasks done for all time — 43 completed across all projects." },
              { label: "Body / Small", size: "0.8125rem", weight: 400, text: "2 projects are stopped. Review them in your dashboard." },
              { label: "Caption / Label", size: "0.75rem", weight: 600, text: "INTEGRATIONS · TEAMS · SETTINGS", tracking: "0.08em" },
            ].map((t) => (
              <div key={t.label} style={{ display: "grid", gridTemplateColumns: "9rem 1fr", alignItems: "baseline", gap: "1.5rem" }}>
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--muted-foreground)", fontFamily: "monospace", whiteSpace: "nowrap" }}>{t.label}</span>
                <span
                  style={{
                    fontSize: t.size,
                    fontWeight: t.weight,
                    letterSpacing: t.tracking || "normal",
                    lineHeight: 1.2,
                    color: "var(--foreground)",
                  }}
                >
                  {t.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem", padding: "1rem 1.25rem", background: "var(--muted)", borderRadius: "var(--radius-sm)" }}>
            <p style={{ margin: 0, fontSize: "0.8125rem", fontFamily: "monospace", color: "var(--muted-foreground)" }}>
              font-family: <strong>"Plus Jakarta Sans"</strong>, "DM Sans", system-ui, sans-serif
            </p>
          </div>
        </Section>

        {/* 7. Border Radius */}
        <Section title="Border Radius">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-end" }}>
            {[
              { label: "sm", var: "--radius-sm", val: "8px" },
              { label: "Default", var: "--radius", val: "12px" },
              { label: "lg", var: "--radius-lg", val: "16px" },
              { label: "xl", var: "--radius-xl", val: "20px" },
              { label: "Pill", var: "--radius-pill", val: "9999px" },
            ].map((r) => (
              <div key={r.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    background: "var(--primary)",
                    borderRadius: `var(${r.var})`,
                    margin: "0 auto 0.5rem",
                  }}
                />
                <p style={{ margin: 0, fontSize: "0.75rem", fontWeight: 600 }}>{r.label}</p>
                <p style={{ margin: 0, fontSize: "0.6875rem", color: "var(--muted-foreground)", fontFamily: "monospace" }}>{r.val}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 8. Shadows */}
        <Section title="Shadows">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-end" }}>
            {[
              { label: "xs", var: "--shadow-xs" },
              { label: "sm", var: "--shadow-sm" },
              { label: "md", var: "--shadow-md" },
              { label: "lg", var: "--shadow-lg" },
              { label: "xl", var: "--shadow-xl" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    background: "var(--card)",
                    borderRadius: "var(--radius)",
                    boxShadow: `var(${s.var})`,
                    margin: "0 auto 0.75rem",
                  }}
                />
                <p style={{ margin: 0, fontSize: "0.75rem", fontWeight: 600 }}>shadow-{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 9. Buttons */}
        <Section title="Buttons">
          <ButtonPreview />
        </Section>

        {/* 10. Badges */}
        <Section title="Badges">
          <BadgePreview />
        </Section>

        {/* 11. Cards */}
        <Section title="Cards">
          <CardPreview />
        </Section>

        {/* 12. Alerts */}
        <Section title="Alerts">
          <AlertPreview />
        </Section>

        {/* 13. Radio Group */}
        <Section title="Radio Group">
          <RadioGroupPreview />
        </Section>

        {/* 14. Design Summary */}
        <Section title="Design Summary">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { label: "Primary Color", value: "#222222 — Jet Black" },
              { label: "Font", value: "Plus Jakarta Sans" },
              { label: "Style", value: "Modern Minimal" },
              { label: "Border Radius", value: "Rounded 12px" },
              { label: "Palette", value: "Strict Monochromatic" },
              { label: "Overall Feel", value: "Editorial · Clean · Focused" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "1rem 1.125rem",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                <p style={{ margin: "0 0 0.25rem", fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted-foreground)" }}>
                  {item.label}
                </p>
                <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 600 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  )
}
