import Link from "next/link";
import { type PostMeta, formatDate } from "@/lib/post-meta";
import { LineGraphMotif, type MotifVariant } from "./LineGraphMotif";

const TAG_TO_MOTIF: Record<string, MotifVariant> = {
  TSA: "deal",
  Integration: "separation",
  "Carve-out": "advisory",
  Playbooks: "portfolio",
};

export function PostCard({ post }: { post: PostMeta }) {
  const motif = TAG_TO_MOTIF[post.tags[0]] ?? "deal";

  return (
    <article className="group relative flex h-full flex-col border border-black/10 bg-white transition-colors hover:border-navy/40">
      <div className="flex items-center justify-between border-b border-black/5 px-6 pt-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-micro font-medium uppercase tracking-wide text-navy"
            >
              {tag}
            </span>
          ))}
        </div>
        <LineGraphMotif
          variant={motif}
          tone="faint"
          className="h-8 w-16 shrink-0"
          strokeWidth={6}
        />
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        <h3 className="font-serif text-h4 leading-snug text-navy">
          <Link
            href={`/resources/${post.slug}`}
            className="after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-small leading-relaxed text-muted">
          {post.description}
        </p>
        <p className="mt-5 text-micro text-muted">
          {formatDate(post.date)}
          {post.readingTime ? ` · ${post.readingTime} read` : ""}
        </p>
      </div>
    </article>
  );
}
