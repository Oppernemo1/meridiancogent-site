import { type ReactNode } from "react";
import { Container } from "./Container";
import { Sidebar, type SidebarSection } from "./Sidebar";

/**
 * Two-column body used below the hero on every page in Stage 3's layout
 * system: a sticky "on this page" TOC on the left (900px+ only) and the
 * page's `Section`s on the right. Below 900px the sidebar doesn't render
 * and the sections take the full content width.
 */
export function SidebarLayout({
  sections,
  children,
}: {
  sections: SidebarSection[];
  children: ReactNode;
}) {
  return (
    <Container>
      <div className="sidebar:grid sidebar:grid-cols-sidebar sidebar:gap-16">
        <Sidebar sections={sections} />
        <div>{children}</div>
      </div>
    </Container>
  );
}
