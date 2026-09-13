import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ResourceIndex } from "@/components/ResourceIndex";
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
    <div className="py-10 md:py-14">
      <Container>
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

        <div className="mt-16">
          <ResourceIndex posts={posts} />
        </div>
      </Container>
    </div>
  );
}
