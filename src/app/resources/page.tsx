import type { Metadata } from "next";
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
    <div className="py-20 md:py-28">
      <Container>
        <header className="max-w-measure">
          <h1 className="font-serif text-display-sm text-navy md:text-display">
            Resources
          </h1>
          <p className="mt-5 text-body-lg leading-relaxed text-muted">
            {DESCRIPTION}
          </p>
        </header>

        <div className="mt-16">
          <ResourceIndex posts={posts} />
        </div>
      </Container>
    </div>
  );
}
