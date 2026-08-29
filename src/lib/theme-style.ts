import type { CSSProperties } from "react";

import type { CelebrationConfig } from "@/content/celebration";

export function getThemeStyle(theme: CelebrationConfig["theme"]): CSSProperties {
  return {
    "--canvas": theme?.canvas,
    "--surface": theme?.surface,
    "--ink": theme?.ink,
    "--muted": theme?.muted,
    "--accent": theme?.accent,
    "--accent-contrast": theme?.accentContrast,
    "--olive": theme?.olive,
    "--blush": theme?.blush,
    "--gold": theme?.gold,
    "--line": theme?.line,
    "--footer": theme?.footer,
  } as CSSProperties;
}
