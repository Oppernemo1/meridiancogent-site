import { Gelasio } from "next/font/google";

// Weights 400 and 600 are the only ones rendered anywhere on the site:
// 400 for standard h1/h2/h5/h6 (globals.css), 600 for h1/h2 inside
// `.prose-meridian` blocks (tailwind.config.ts).
export const gelasio = Gelasio({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
});
