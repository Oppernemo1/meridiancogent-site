"use client";

import { useMemo, useState } from "react";
import { type PostMeta } from "@/lib/post-meta";
import { TOPIC_TAGS } from "@/lib/site";
import { PostCard } from "./PostCard";

const FILTERS = ["All", ...TOPIC_TAGS];

export function ResourceIndex({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<string>("All");

  const visible = useMemo(() => {
    if (active === "All") return posts;
    return posts.filter((p) => p.tags.includes(active));
  }, [posts, active]);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter articles by topic"
      >
        {FILTERS.map((tag) => {
          const isActive = tag === active;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "border-navy bg-navy text-white"
                  : "border-black/15 bg-white text-muted hover:border-navy/40 hover:text-navy"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {visible.length} {visible.length === 1 ? "article" : "articles"}
        {active !== "All" ? ` in ${active}` : ""}
      </p>

      {visible.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted">
          No articles in this topic yet. Check back soon.
        </p>
      )}
    </div>
  );
}
