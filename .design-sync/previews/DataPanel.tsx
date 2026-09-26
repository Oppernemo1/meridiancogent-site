import { DataPanel } from "meridiancogent-site";

// Copy from /platform (TSA section) and /security (Access scope).
export const Modelled = () => (
  <div style={{ width: 165 }}>
    <DataPanel
      label="Modelled"
      rows={[
        { label: "Service catalogue", value: "Multi-currency" },
        { label: "Exposure", value: "With step-up" },
        { label: "Exit risk", value: "Months ahead" },
      ]}
    />
  </div>
);

export const AccessScope = () => (
  <div style={{ width: 165 }}>
    <DataPanel
      label="Access scope"
      rows={[
        { label: "Organisation", value: "No" },
        { label: "Program", value: "Yes" },
        { label: "Advisor", value: "Bounded" },
      ]}
    />
  </div>
);
