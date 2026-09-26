import { Container } from "meridiancogent-site";

// The centred 1100px content column with the site's side gutters. The
// hairline outline is preview-only, to show the column's bounds.
export const ContentColumn = () => (
  <div className="bg-paper py-8">
    <Container>
      <div className="border border-dashed border-hairline py-6 text-center text-small text-muted">
        max-w-content · px-6 / md:px-8
      </div>
    </Container>
  </div>
);

// Typical use: a page intro inside the column.
export const PageIntro = () => (
  <div className="bg-paper py-10">
    <Container>
      <p className="text-label font-semibold uppercase text-accent-dark">Platform</p>
      <h1 className="mt-2 max-w-measure text-h1-sm md:text-h1">
        M&amp;A execution, without the spreadsheet chaos
      </h1>
      <p className="mt-heading-gap max-w-measure text-body-sm leading-relaxed text-ink md:text-body">
        A control environment for separation offices and integration teams:
        track obligations, manage TSAs, measure Day 1 readiness, and hold the
        plan to the commitments made.
      </p>
    </Container>
  </div>
);
