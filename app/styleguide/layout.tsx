"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navigation } from "./navigation"

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className="w-64 border-r border-border bg-card flex flex-col gap-8 fixed top-0 left-0 h-screen overflow-y-auto"
        style={{ padding: "2rem 1.5rem" }}
      >
        {/* Logo */}
        <div>
          <Link href="/styleguide" className="flex items-center gap-2 group">
            <div
              style={{
                width: 28,
                height: 28,
                background: "var(--primary)",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8l3 3M11 8l-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.02em" }}>
              iDraft DS
            </span>
          </Link>
          <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
            Design System v1.0
          </p>
        </div>

        {/* Navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {navigation.map((section) => (
            <div key={section.title}>
              <h3
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  marginBottom: "0.5rem",
                }}
              >
                {section.title}
              </h3>
              {section.items.length === 0 ? (
                <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", fontStyle: "italic", paddingLeft: "0.75rem" }}>
                  Coming soon
                </p>
              ) : (
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.25rem", listStyle: "none", margin: 0, padding: 0 }}>
                  {section.items.map((item) => {
                    const active = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          style={{
                            display: "block",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "var(--radius-sm)",
                            fontSize: "0.875rem",
                            fontWeight: active ? 600 : 400,
                            textDecoration: "none",
                            transition: "background 0.15s, color 0.15s",
                            background: active ? "var(--primary)" : "transparent",
                            color: active ? "var(--primary-foreground)" : "var(--foreground)",
                          }}
                          onMouseEnter={(e) => {
                            if (!active) (e.currentTarget as HTMLElement).style.background = "var(--muted)"
                          }}
                          onMouseLeave={(e) => {
                            if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"
                          }}
                        >
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ marginTop: "auto", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)" }}>
            Extracted from iDraft UI
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: "16rem", minHeight: "100vh", overflow: "auto" }}>
        {children}
      </main>
    </div>
  )
}
