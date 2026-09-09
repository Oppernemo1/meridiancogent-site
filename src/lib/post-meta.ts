// Client-safe: types and pure helpers only. No filesystem access here, so this
// module can be imported from Client Components.

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime?: string;
};

export type PostMeta = PostFrontmatter & { slug: string };

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 225))} min`;
}
