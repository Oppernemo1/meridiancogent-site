import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ResourceIndex } from "@/components/ResourceIndex";
import { BackgroundLines } from "@/components/LineGraphMotif";
import { GUIDES, guideHref } from "@/lib/guides";
import { getAllPosts } from "@/lib/posts";

const TITLE = "Resources";
const DESCRIPTION =
  "Practitioner-level writing on TSAs, carve-out separation, integration, and Day 1 readiness — from the MeridianCogent team.";

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
        {/* Practitioner guides — each links to its own page, never straight to
            the PDF: the page is what carries the content and the download. */}
        <section aria-labelledby="guides-heading" className="mt-4">
          <h2 id="guides-heading" className="text-h2-sm md:text-h2">
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

        <div className="mt-16">
          <ResourceIndex posts={posts} />
        </div>
      </Container>
    </div>
  );
}
