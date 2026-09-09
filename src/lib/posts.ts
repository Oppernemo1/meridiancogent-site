import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  estimateReadingTime,
  type PostFrontmatter,
  type PostMeta,
} from "./post-meta";

export type { PostFrontmatter, PostMeta } from "./post-meta";
export { formatDate, estimateReadingTime } from "./post-meta";

const CONTENT_DIR = path.join(process.cwd(), "content", "resources");

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
};

export function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  return {
    slug,
    frontmatter,
    content,
    readingTime: frontmatter.readingTime || estimateReadingTime(content),
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const { frontmatter } = getPostBySlug(slug);
      return { slug, ...frontmatter };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getRelatedPosts(slug: string, count = 3): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  const others = all.filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, count);

  return others
    .map((post) => ({
      post,
      score: post.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score || +new Date(b.post.date) - +new Date(a.post.date),
    )
    .slice(0, count)
    .map((entry) => entry.post);
}
