// Core brand tokens — keep these keys stable, other files import them directly.
export const COLORS = {
  primary: "#5B21B6",
  sidebar: "#0F172A",
  background: "#F8FAFC",
  card: "#FFFFFF",
  accent: "#DDD6FE",
  text: "#111827",
};

// Derived tokens used for the premium-SaaS treatment (gradients, glass, glow).
// Kept separate so COLORS above stays a stable, minimal contract for the rest of the app.
export const GRADIENTS = {
  primary: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 50%, #4C1D95 100%)",
  text: "linear-gradient(90deg, #C4B5FD 0%, #A78BFA 50%, #7C3AED 100%)",
  mesh: "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.35), transparent 40%), radial-gradient(circle at 80% 30%, rgba(91,33,182,0.30), transparent 45%), radial-gradient(circle at 50% 80%, rgba(167,139,250,0.20), transparent 50%)",
  cta: "linear-gradient(135deg, #1E1B4B 0%, #0F172A 60%, #1E1033 100%)",
};

export const GLASS = {
  light: "rgba(255,255,255,0.6)",
  lightBorder: "rgba(255,255,255,0.8)",
  dark: "rgba(255,255,255,0.06)",
  darkBorder: "rgba(255,255,255,0.12)",
};