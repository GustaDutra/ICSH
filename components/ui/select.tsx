"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { style?: React.CSSProperties }
>(({ className, children, style, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(className)}
    style={{
      display: "flex",
      height: "2.25rem",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      whiteSpace: "nowrap",
      borderRadius: "var(--radius-sm)",
      border: "1px solid var(--border)",
      background: "transparent",
      paddingInline: "0.75rem",
      paddingBlock: "0.5rem",
      fontSize: "0.875rem",
      boxShadow: "var(--shadow-sm)",
      outline: "none",
      cursor: "pointer",
      gap: "0.5rem",
      ...style,
    }}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown style={{ width: 16, height: 16, opacity: 0.5, flexShrink: 0, transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(className)}
    style={{ display: "flex", cursor: "default", alignItems: "center", justifyContent: "center", paddingBlock: "0.25rem" }}
    {...props}
  >
    <ChevronUp style={{ width: 14, height: 14 }} />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(className)}
    style={{ display: "flex", cursor: "default", alignItems: "center", justifyContent: "center", paddingBlock: "0.25rem" }}
    {...props}
  >
    <ChevronDown style={{ width: 14, height: 14 }} />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & { style?: React.CSSProperties }
>(({ className, children, position = "popper", style, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(className)}
      style={{
        position: "relative",
        zIndex: 50,
        minWidth: "8rem",
        overflow: "hidden",
        borderRadius: "var(--radius)",
        border: "1px solid oklch(22% 0 0)",
        background: "oklch(14% 0 0)",
        color: "oklch(95% 0 0)",
        boxShadow: "0 8px 24px oklch(0% 0 0 / 0.4)",
      }}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        style={{
          padding: "0.375rem",
          width: "100%",
          minWidth: "var(--radix-select-trigger-width)",
          maxHeight: style?.maxHeight ?? "24rem",
          overflowY: "auto",
          textAlign: style?.textAlign,
        }}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(className)}
    style={{ padding: "0.375rem 0.5rem", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(50% 0 0)" }}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn("select-item", className)}
    style={{
      position: "relative",
      display: "flex",
      width: "100%",
      cursor: "default",
      userSelect: "none",
      alignItems: "center",
      borderRadius: "0.375rem",
      paddingBlock: "0.4375rem",
      paddingLeft: "0.625rem",
      paddingRight: "2rem",
      fontSize: "0.875rem",
      color: "oklch(92% 0 0)",
      outline: "none",
    }}
    {...props}
  >
    <span style={{ position: "absolute", right: "0.5rem", display: "flex", width: "0.875rem", height: "0.875rem", alignItems: "center", justifyContent: "center" }}>
      <SelectPrimitive.ItemIndicator>
        <Check style={{ width: 14, height: 14, color: "oklch(92% 0 0)" }} />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(className)}
    style={{ margin: "0.25rem -0.375rem", height: "1px", background: "oklch(22% 0 0)" }}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select, SelectGroup, SelectValue, SelectTrigger, SelectContent,
  SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton,
}