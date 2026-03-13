export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [
      { name: "Design Tokens", href: "/styleguide" },
    ],
  },
  {
    title: "Components",
    items: [
      { name: "Accordion",        href: "/styleguide/components/accordion" },
      { name: "Select",           href: "/styleguide/components/select" },
      { name: "Input",            href: "/styleguide/components/input" },
      { name: "Skeleton",         href: "/styleguide/components/skeleton" },    
    ],
  },
]
