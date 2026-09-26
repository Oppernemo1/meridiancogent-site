// Sync entry: the site components published to Claude Design. Real source,
// bundled as-is; only next/link and next/navigation are swapped for browser
// stand-ins (see tsconfig.json paths).
import "./shims/process-env"; // must stay first: runs before site.ts loads
export { Container } from "../src/components/Container";
export { Section } from "../src/components/Section";
export { DataPanel } from "../src/components/DataPanel";
export { PostCard } from "../src/components/PostCard";
export { Header } from "../src/components/Header";
export { Footer } from "../src/components/Footer";
export { EarlyAccessForm } from "../src/components/EarlyAccessForm";
