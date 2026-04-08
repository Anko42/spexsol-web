// Shared timing constants for the splash and the post-splash page entry.
// Imported by Splash, SiteHeader, and __root so they cannot drift.

export const REVEAL_S = 0.55
export const WORDMARK_S = 0.5
export const HOLD_S = 1.5
// Curtain lift: backdrop + lockup translate up together as one piece.
export const CURTAIN_S = 0.7
// Page content fades + rises in once the curtain is on its way out.
export const PAGE_ENTRY_S = 0.5
// Header brand fades in once the splash is dismissed.
export const HEADER_BRAND_S = 0.45

// Expo-out, used for in-splash reveals.
export const EASE = [0.16, 1, 0.3, 1] as const
// Curtain easing — strong start, soft finish.
export const CURTAIN_EASE = [0.7, 0, 0.2, 1] as const

export const TOTAL_HOLD_MS = HOLD_S * 1000
// Settled = curtain has fully cleared the viewport.
export const SETTLE_MS = TOTAL_HOLD_MS + CURTAIN_S * 1000 + 50
