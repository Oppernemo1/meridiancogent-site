import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { CostMechanismBlocks } from "@/components/CostMechanismBlocks";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { LineGraphMotif } from "@/components/LineGraphMotif";
import { GUIDES, getGuide } from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ guide: g.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { guide: string };
}): Metadata {
  const guide = getGuide(params.guide);
  if (!guide) return {};
  const url = `/resources/guides/${guide.slug}`;

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${guide.metaTitle} — ${SITE_NAME}`,
      description: guide.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.metaTitle} — ${SITE_NAME}`,
      description: guide.metaDescription,
    },
  };
}

export default function GuidePage({
  params,
}: {
  params: { guide: string };
}) {
  const guide = getGuide(params.guide);
  if (!guide) notFound();

  // The download is free but email-gated, so the offer is described without a
  // price property — asserting price 0 would claim an offer that isn't one.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: guide.title,
    description: guide.metaDescription,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-mark.png` },
    },
  };

  return (
    <article className="py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container>
        <div className="mx-auto max-w-measure">
          <p className="text-small text-muted">
            <Link
              href="/resources"
              className="underline underline-offset-4 hover:text-graphite"
            >
              Resources
            </Link>
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="text-label font-medium uppercase text-accent-dark">
              {guide.tag}
            </span>
            <span className="text-label font-medium uppercase text-accent-dark">
              Guide
            </span>
          </div>

          <h1 className="mt-4 text-h1-sm md:text-h1">{guide.title}</h1>

          <p className="mt-4 text-body-sm leading-relaxed text-muted md:text-body">
            {guide.standfirst}
          </p>

          <p className="mt-4 text-small text-muted">
            PDF · {guide.pages} pages · free
          </p>

          <LineGraphMotif
            variant="deal"
            tone="faint"
            strokeWidth={5}
            className="mt-8 h-16 w-full"
          />
        </div>

        {/* What it covers — the crawlable substance */}
        <div className="prose prose-meridian md:prose-meridian-lg mx-auto mt-12">
          {guide.intro.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>

        {guide.diagram === "cost-mechanisms" && <CostMechanismBlocks />}

        {/* Sourced figures printed in the guide */}
        <div className="mx-auto mt-12 max-w-measure">
          <h2 className="text-h2-sm md:text-h2">The numbers it works from</h2>
          <dl className="mt-5 divide-y divide-hairline border-t border-hairline">
            {guide.figures.map((fig) => (
              <div key={fig.label} className="py-4">
                <dt className="text-body-sm font-semibold leading-snug text-graphite">
                  {fig.value}
                </dt>
                <dd className="mt-1 text-small leading-relaxed text-muted">
                  {fig.label} ({fig.source})
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Section headings from the guide itself */}
        <div className="mx-auto mt-12 max-w-measure">
          <h2 className="text-h2-sm md:text-h2">What&apos;s inside</h2>
          <dl className="mt-5 divide-y divide-hairline border-t border-hairline">
            {guide.contents.map((item) => (
              <div key={item.heading} className="py-4">
                <dt className="text-body-sm font-semibold leading-snug text-graphite">
                  {item.heading}
                </dt>
                <dd className="mt-1 text-small leading-relaxed text-muted">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-small leading-relaxed text-muted">
            Sources cited in the guide: {guide.sources}
          </p>
        </div>

        {/* Download */}
        <div className="mx-auto mt-12 max-w-measure border-t border-hairline pt-10">
          <h2 className="text-h2-sm md:text-h2">Get the guide</h2>
          <p className="mt-heading-gap text-body-sm leading-relaxed text-ink md:text-body">
            Enter your email and the PDF is yours immediately — no confirmation
            step. You&apos;ll also get occasional updates from MeridianCogent,
            with a one-click unsubscribe in every email.
          </p>
          <div className="mt-6 max-w-lg">
            <EarlyAccessForm
              source={`guide-${guide.slug}`}
              buttonLabel="Get the guide"
              successMessage="Your download is ready."
              download={{ href: guide.pdf, label: "Download the PDF" }}
            />
          </div>
        </div>

        {/* The articles this guide is drawn from */}
        <div className="mx-auto mt-12 max-w-measure border-t border-black/10 pt-10">
          <h2 className="text-h2-sm md:text-h2">The writing behind it</h2>
          <ul className="mt-heading-gap space-y-6">
            {guide.related.map((item) => (
              <li key={item.slug}>
                <Link href={`/resources/${item.slug}`} className="group block">
                  <span className="text-h3 text-graphite underline-offset-4 group-hover:underline">
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </article>
  );
}
