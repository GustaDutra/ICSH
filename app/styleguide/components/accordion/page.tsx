"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

/* ── tiny helpers ─────────────────────────────────────── */
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
          <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", marginTop: "0.375rem" }}>{description}</p>
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

/* ── DEMO DATA ─────────────────────────────────────────── */
const faqItems = [
  {
    value: "item-1",
    trigger: "What is the iDraft design system?",
    content: "iDraft is a monochromatic minimal design system built around jet-black and pure-white with a strict greyscale palette. It uses Plus Jakarta Sans for typography and 12px rounded corners throughout.",
  },
  {
    value: "item-2",
    trigger: "How do I get started with the components?",
    content: "Install shadcn/ui in your Next.js project, copy the globals.css tokens, then add components one by one using npx shadcn@latest add [component]. Each component automatically picks up your CSS variables.",
  },
  {
    value: "item-3",
    trigger: "Does the system support dark mode?",
    content: "Yes. All tokens are defined for both :root (light) and .dark (dark mode). Add the dark class to your root element to switch themes. The entire system inverts cleanly — white surfaces become dark charcoal and vice versa.",
  },
  {
    value: "item-4",
    trigger: "Can I customise the colour palette?",
    content: "Absolutely. Every colour is a CSS custom property. Update the oklch values in globals.css and every component inherits the change instantly — no Tailwind config rebuild required.",
  },
]

const projectItems = [
  { value: "p-1", trigger: "New Schedule", content: "Develop a new plan for Alina's education; Print a new timetable; Buy new stationery for the upcoming semester." },
  { value: "p-2", trigger: "Prototype Animation", content: "Completed. All animation prototypes have been reviewed and signed off by the design lead." },
  { value: "p-3", trigger: "Ai Project 2 Part", content: "In progress — 2 of 8 tasks complete. Next milestone: complete model fine-tuning by end of sprint." },
]

/* ── MAIN ─────────────────────────────────────────────── */
export default function AccordionShowcase() {
  const [dark, setDark] = useState(false)

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
              Accordion
            </h1>
            <p style={{ fontSize: "0.9375rem", color: "var(--muted-foreground)", margin: 0 }}>
              A vertically stacked set of interactive headings that each reveal an associated section of content.
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

        {/* 1. Single (default) */}
        <Section title="Single — Collapse others" description="Only one item can be open at a time. Default behavior, type='single'.">
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "0 1.5rem", boxShadow: "var(--shadow-sm)" }}>
            <Accordion type="single" collapsible defaultValue="item-1">
              {faqItems.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                    {item.trigger}
                  </AccordionTrigger>
                  <AccordionContent style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        {/* 2. Multiple */}
        <Section title="Multiple — Keep open" description="Multiple items can be open simultaneously. type='multiple'.">
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "0 1.5rem", boxShadow: "var(--shadow-sm)" }}>
            <Accordion type="multiple" defaultValue={["p-1", "p-3"]}>
              {projectItems.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                    {item.trigger}
                  </AccordionTrigger>
                  <AccordionContent style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        {/* 3. Dark card variant */}
        <Section title="Dark Surface Variant" description="Accordion on a dark (primary) card surface — as seen in the iDraft dashboard.">
          <div style={{
            background: "var(--primary)", color: "var(--primary-foreground)",
            border: "1px solid var(--border)", borderRadius: "var(--radius-lg)",
            padding: "0 1.5rem", boxShadow: "var(--shadow-md)",
          }}>
            <Accordion type="single" collapsible>
              {[
                { value: "d-1", trigger: "28 Projects", content: "View all active projects across every team and integration. Use the filter panel to sort by status, deadline, or assignee." },
                { value: "d-2", trigger: "14 In Progress", content: "These projects have active tasks running. Each has at least one assignee and an upcoming milestone within the next 14 days." },
                { value: "d-3", trigger: "11 Completed", content: "Archived projects that have met all acceptance criteria. Accessible via Open Archive in the top-right of the task panel." },
              ].map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  style={{ borderColor: "oklch(25% 0 0)" }}
                >
                  <AccordionTrigger
                    style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--primary-foreground)" }}
                    className="[&>svg]:text-current"
                  >
                    {item.trigger}
                  </AccordionTrigger>
                  <AccordionContent style={{ color: "oklch(70% 0 0)", lineHeight: 1.7 }}>
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        {/* 4. With icons */}
        <Section title="With Leading Icons" description="Enrich triggers with contextual icons for quick visual scanning.">
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "0 1.5rem", boxShadow: "var(--shadow-sm)" }}>
            <Accordion type="single" collapsible>
              {[
                { value: "i-1", icon: "📅", trigger: "Calendar & Scheduling", content: "Connect to your calendar to auto-populate task deadlines and meeting blocks. Supports Google Calendar, Outlook, and Apple Calendar." },
                { value: "i-2", icon: "🔗", trigger: "Integrations", content: "Slack, Notion, and more — all connected via the integrations panel. Add a new plugin by clicking + Add new plugin in the sidebar." },
                { value: "i-3", icon: "⚙️", trigger: "Settings & Preferences", content: "Manage your profile, notification settings, team memberships, and billing from the Settings page." },
              ].map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger style={{ fontSize: "0.9375rem", fontWeight: 600, gap: "0.75rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1rem", lineHeight: 1 }}>{item.icon}</span>
                      {item.trigger}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent style={{ color: "var(--muted-foreground)", lineHeight: 1.7, paddingLeft: "1.75rem" }}>
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        {/* 5. Flush / borderless */}
        <Section title="Flush / Borderless" description="Remove the card wrapper for an inline, borderless style — great for settings panels.">
          <Accordion type="single" collapsible>
            {[
              { value: "f-1", trigger: "Notification preferences", content: "Choose which events trigger email, push, or in-app notifications. You can mute individual projects or entire teams." },
              { value: "f-2", trigger: "Appearance", content: "Switch between light and dark mode, or use your system default. Font size scaling is available under Accessibility settings." },
              { value: "f-3", trigger: "Privacy & data", content: "Control what data iDraft stores and for how long. Export or delete your data at any time from this panel." },
            ].map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
                  {item.trigger}
                </AccordionTrigger>
                <AccordionContent style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        {/* 6. Props Table */}
        <Section title="Props">
          <div style={{ overflowX: "auto", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                  <th style={{ padding: "0.625rem 1rem", textAlign: "left", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>Prop</th>
                  <th style={{ padding: "0.625rem 1rem", textAlign: "left", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>Type</th>
                  <th style={{ padding: "0.625rem 1rem", textAlign: "left", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>Default</th>
                  <th style={{ padding: "0.625rem 1rem", textAlign: "left", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <PropRow name="type" type='"single" | "multiple"' defaultVal='"single"' description="Whether only one or multiple items can be open simultaneously." />
                <PropRow name="collapsible" type="boolean" defaultVal="false" description='When type="single", allows closing the active item by clicking it again.' />
                <PropRow name="defaultValue" type="string | string[]" defaultVal="—" description="The initially expanded item(s). Uncontrolled." />
                <PropRow name="value" type="string | string[]" defaultVal="—" description="Controlled expanded item(s). Use with onValueChange." />
                <PropRow name="onValueChange" type="(value) => void" defaultVal="—" description="Callback fired when expanded items change." />
                <PropRow name="disabled" type="boolean" defaultVal="false" description="Prevents all items from being opened or closed." />
                <PropRow name="orientation" type='"vertical" | "horizontal"' defaultVal='"vertical"' description="The orientation of the accordion." />
              </tbody>
            </table>
          </div>
        </Section>

        {/* 7. Usage */}
        <Section title="Usage">
          <CodeBlock code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Single — only one open at a time
<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is iDraft?</AccordionTrigger>
    <AccordionContent>
      A monochromatic minimal design system.
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Multiple — many open simultaneously
<Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Projects</AccordionTrigger>
    <AccordionContent>28 active projects.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Completed</AccordionTrigger>
    <AccordionContent>11 completed.</AccordionContent>
  </AccordionItem>
</Accordion>`} />
        </Section>

        {/* 8. Install */}
        <Section title="Installation">
          <CodeBlock code={`npx shadcn@latest add accordion`} />
          <div style={{ marginTop: "1rem", padding: "1rem 1.25rem", background: "var(--muted)", borderRadius: "var(--radius-sm)", fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--foreground)" }}>Dependencies:</strong> @radix-ui/react-accordion · lucide-react
            <br />
            <strong style={{ color: "var(--foreground)" }}>File created:</strong> /components/ui/accordion.tsx
            <br />
            <strong style={{ color: "var(--foreground)" }}>Keyboard:</strong> Space / Enter toggles · ↑↓ navigates items · Home/End jumps to first/last
          </div>
        </Section>

      </div>
    </div>
  )
}
