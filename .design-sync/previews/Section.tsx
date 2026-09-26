import { Section, DataPanel } from "meridiancogent-site";

const link = "text-accent-dark underline underline-offset-4 hover:text-muted";

// Copy from /platform: the TSA section with its floated data panel.
export const WithPanel = () => (
  <Section
    id="tsa"
    label="TSA exposure"
    heading="Transitional services, modelled as exposure"
    panel={
      <DataPanel
        label="Modelled"
        rows={[
          { label: "Service catalogue", value: "Multi-currency" },
          { label: "Exposure", value: "With step-up" },
          { label: "Exit risk", value: "Months ahead" },
        ]}
      />
    }
  >
    <p>
      A <a href="/resources/what-is-a-tsa" className={link}>TSA</a> is not a
      document to be stored. It is a live cost with an end date that may or
      may not hold.
    </p>
    <p>
      The platform holds the service catalogue across multiple currencies,
      models exposure and overrun including step-up pricing, and connects each
      service to the separation work that has to finish before it can end.
    </p>
  </Section>
);

export const ProseOnly = () => (
  <Section id="scenarios" label="Scenarios" heading="What happens if this slips?">
    <p>
      It is one thing to know a transitional service exits in September. It is
      another to know what happens to cost, readiness and the rest of the plan
      if the work behind that exit slips by a quarter.
    </p>
    <p>
      The point is not to record what the TSA costs.{" "}
      <a href="/resources/the-real-cost-of-a-late-tsa-exit" className={link}>
        It is to know, in March, that the September exit will not happen.
      </a>
    </p>
  </Section>
);

// Opening section: label only, no heading, no rule above it.
export const LabelOnly = () => (
  <Section id="intro" label="Principles" divider={false}>
    <p>
      MeridianCogent is a control environment for separation offices and
      integration teams: track obligations, manage TSAs, measure Day 1
      readiness, and hold the plan to the commitments made.
    </p>
  </Section>
);
