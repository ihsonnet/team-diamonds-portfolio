// lib/utils.ts
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

// You can place the shared UI components (SectionKicker, SectionTitle, SoftSeparator) 
// in a separate file like components/ui/SectionUI.tsx