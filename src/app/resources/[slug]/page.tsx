import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/Container";
import { LineGraphMotif } from "@/components/LineGraphMotif";
import {
  formatDate,
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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
    <article className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Container>
        <div className="mx-auto max-w-measure">
          <p className="text-sm text-muted">
            <Link
              href="/resources"
              className="underline underline-offset-4 hover:text-navy"
            >
              Resources
            </Link>
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-ice/40 px-2.5 py-0.5 text-xs font-medium text-navy"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 font-serif text-3xl leading-tight text-navy md:text-[2.6rem] md:leading-[1.15]">
            {frontmatter.title}
          </h1>

          <p className="mt-4 text-sm text-muted">
            {formatDate(frontmatter.date)} · {readingTime} read
          </p>

          <LineGraphMotif
            variant="deal"
            tone="faint"
            strokeWidth={5}
            className="mt-8 h-16 w-full"
          />
        </div>

        <div className="prose prose-meridian mx-auto mt-10 prose-headings:font-serif">
          <MDXRemote
            source={content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-20 max-w-measure border-t border-black/10 pt-10">
            <h2 className="font-serif text-xl text-navy">Related articles</h2>
            <ul className="mt-6 space-y-6">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/resources/${item.slug}`}
                    className="group block"
                  >
                    <span className="font-serif text-lg text-navy underline-offset-4 group-hover:underline">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
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
