import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ChainDiagram } from "@/components/ChainDiagram";
import { Container } from "@/components/Container";
import { LineGraphMotif } from "@/components/LineGraphMotif";
import {
  formatDate,
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Wraps rendered markdown tables in a scrollable box so wide financial
// tables scroll horizontally on narrow viewports rather than overflowing.
//
// ChainDiagram takes its stages as <ChainStep> children rather than a nodes
// array, because next-mdx-remote blocks JS expressions in MDX props. It sits
// outside prose styling so it renders exactly as it does on /platform, in
// compact form, with plain-paragraph labels rather than outline headings.
function ChainStep({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

const mdxComponents = {
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="table-scroll">
      <table {...props} />
    </div>
  ),
  ChainStep,
  ChainDiagram: ({ title, children }: { title?: string; children?: ReactNode }) => (
    <div className="not-prose">
      <ChainDiagram
        compact
        labelAs="p"
        title={title}
        nodes={Children.toArray(children)
          .filter(isValidElement<{ children?: ReactNode }>)
          .map((step) => ({ title: step.props.children }))}
      />
    </div>
  ),
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    return {};
  }
  const { title, description, date } = post.frontmatter;
  const url = `/resources/${params.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${title} — ${SITE_NAME}`,
      description,
      publishedTime: date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description,
    },
  };
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const { frontmatter, content, readingTime } = post;
  const related = getRelatedPosts(params.slug, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: frontmatter.title,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-mark.png`,
      },
    },
    datePublished: frontmatter.date,
  };

  return (
    <article className="py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-label font-medium uppercase text-accent-dark"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-h1-sm md:text-h1">
            {frontmatter.title}
          </h1>

          <p className="mt-4 text-small text-muted">
            {formatDate(frontmatter.date)} · {readingTime} read
          </p>

          <LineGraphMotif
            variant="deal"
            tone="faint"
            strokeWidth={5}
            className="mt-8 h-16 w-full"
          />
        </div>

        <div className="prose prose-meridian md:prose-meridian-lg mx-auto mt-12">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-12 max-w-measure border-t border-black/10 pt-10">
            <h2 className="text-h2-sm md:text-h2">Related articles</h2>
            <ul className="mt-heading-gap space-y-6">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/resources/${item.slug}`}
                    className="group block"
                  >
                    <span className="text-h3 text-graphite underline-offset-4 group-hover:underline">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-small text-muted">
                      {formatDate(item.date)} · {item.tags.join(", ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </article>
  );
}
