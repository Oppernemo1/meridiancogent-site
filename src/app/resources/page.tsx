import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ResourceIndex } from "@/components/ResourceIndex";
import { BackgroundLines } from "@/components/LineGraphMotif";
import { GUIDES, guideHref } from "@/lib/guides";
import { getAllPosts } from "@/lib/posts";

const TITLE = "Resources";
const DESCRIPTION =
  "Working guides and practitioner-level writing on TSAs, carve-out separation, integration and Day 1 readiness — from the MeridianCogent team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/resources" },
  openGraph: {
    url: "/resources",
    title: `${TITLE} — MeridianCogent`,
    description: DESCRIPTION,
  },
  twitter: {
    title: `${TITLE} — MeridianCogent`,
    description: DESCRIPTION,
  },
};

export default function ResourcesPage() {
  const posts = getAllPosts();

  return (
    <div className="pb-10 md:pb-14">
      {/* Hero */}
      <section className="relative overflow-hidden py-10 md:py-14">
        <BackgroundLines className="pointer-events-none absolute inset-0 h-full w-full" />
        <Container className="relative">
          <header className="max-w-measure">
            <h1 className="text-h1-sm md:text-h1">
              Resources
            </h1>
            <p className="mt-heading-gap text-body-sm leading-relaxed text-muted md:text-body">
              {DESCRIPTION}
            </p>
            <p className="mt-4 text-small">
              <Link
                href="/platform"
                className="font-medium text-accent-dark underline underline-offset-4 hover:text-muted"
              >
                See how the platform itself is built
              </Link>
            </p>
          </header>
        </Container>
      </section>

      <Container>
        {/* Two sibling sections under the page h1. Both headings are fixed at
            text-h2-sm — no md:text-h2 step — so neither competes with the h1
            and neither outweighs the other. Keep them identical if either
            changes. No eyebrow labels: an eyebrow should add information
            beyond the heading, and "Guides"/"Articles" would only restate. */}

        {/* Practitioner guides — each links to its own page, never straight to
            the PDF: the page is what carries the content and the download. */}
        <section aria-labelledby="guides-heading">
          <h2 id="guides-heading" className="text-h2-sm">
            Practitioner guides
          </h2>
          <p className="mt-heading-gap max-w-measure text-body-sm leading-relaxed text-muted md:text-body">
            Working documents drawn from the articles below — built to be
            useful with a spreadsheet and a named owner, not a platform.
          </p>
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((guide) => (
              <li key={guide.slug}>
                <div aria-hidden="true" className="h-px w-10 bg-accent" />
                <h3 className="mt-3 text-h3 text-graphite">
                  <Link
                    href={guideHref(guide.slug)}
                    className="underline-offset-4 hover:underline"
                  >
                    {guide.title}
                  </Link>
                </h3>
                <p className="mt-2 text-small leading-relaxed text-muted">
                  {guide.standfirst}
                </p>
                <p className="mt-2 text-small text-muted">
                  PDF · {guide.pages} pages · free
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* "Articles" rather than "All articles": the heading names the
            section, while the live count beneath the filter names the state. */}
        <section aria-labelledby="articles-heading" className="mt-12">
          <h2 id="articles-heading" className="text-h2-sm">
            Articles
          </h2>
          <div className="mt-6">
            <ResourceIndex posts={posts} />
          </div>
        </section>
      </Container>
    </div>
  );
}
