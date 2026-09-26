import { EarlyAccessForm } from "meridiancogent-site";

// Homepage hero: single email field on paper.
export const EmailLight = () => (
  <div className="max-w-lg bg-paper p-6">
    <EarlyAccessForm source="homepage-hero" />
  </div>
);

// Site footer: same form on the graphite ground.
export const EmailDark = () => (
  <div className="max-w-lg bg-graphite p-6">
    <EarlyAccessForm theme="dark" source="footer" />
  </div>
);

// Talk to Us page: the full form inside its graphite panel.
export const FullDark = () => (
  <div className="max-w-xl bg-graphite p-6">
    <p className="text-h3 text-on-dark-primary">Request a demo</p>
    <p className="mt-2 text-small leading-relaxed text-on-dark-secondary">
      Some of the platform is live today and some is in build. We&apos;ll show
      you which is which.
    </p>
    <div className="mt-5">
      <EarlyAccessForm theme="dark" fields="full" source="early-access-page" />
    </div>
  </div>
);

// Guide pages: email-gated download.
export const GuideDownload = () => (
  <div className="max-w-lg bg-paper p-6">
    <EarlyAccessForm
      source="guide-tsa-exit"
      buttonLabel="Get the guide"
      successMessage="Your download is ready."
      download={{ href: "/guides/tsa-exit.pdf", label: "Download the PDF" }}
    />
  </div>
);
