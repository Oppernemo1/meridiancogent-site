import Link from "next/link";
import { type PostMeta, formatDate } from "@/lib/post-meta";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative flex h-full flex-col border border-hairline bg-white transition-colors hover:border-graphite/40">
      <div className="flex flex-wrap gap-2 border-b border-hairline px-6 pt-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-label font-medium uppercase text-accent-dark"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        <h3 className="text-h3 leading-snug text-graphite">
          <Link
            href={`/resources/${post.slug}`}
            className="after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-heading-gap flex-1 text-small leading-relaxed text-muted">
          {post.description}
        </p>
        <p className="mt-5 text-small text-muted">
          {formatDate(post.date)}
          {post.readingTime ? ` · ${post.readingTime} read` : ""}
        </p>
      </div>
    </article>
  );
}
