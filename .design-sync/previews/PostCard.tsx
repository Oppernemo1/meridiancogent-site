import { PostCard } from "meridiancogent-site";

// Frontmatter from content/resources/*.mdx.
const posts = [
  {
    slug: "what-is-a-tsa",
    title: "What Is a Transition Service Agreement (TSA)?",
    description:
      "A clear, practitioner-level explanation of TSAs — what they cover, how long they run, real cost data, and why they're one of the most consequential documents in any carve-out.",
    date: "2026-09-04",
    tags: ["TSA"],
    readingTime: "10 min",
  },
  {
    slug: "stranded-costs",
    title: "Stranded Costs: The Divestiture Number That Shows Up a Year Late",
    description:
      "Half of companies that divest see profitability fall in the year after. The overhead that does not leave with the business is a large part of why — and it is knowable before signing.",
    date: "2026-09-14",
    tags: ["Carve-out"],
    readingTime: "9 min",
  },
  {
    slug: "the-real-cost-of-a-late-tsa-exit",
    title: "The Real Cost of a Late TSA Exit",
    description:
      "TSA extensions rarely look expensive in the moment. Here's the exact escalation math behind why they quietly erode deal value more than almost any other post-close risk.",
    date: "2026-08-26",
    tags: ["TSA", "Playbooks"],
    readingTime: "9 min",
  },
];

export const Single = () => (
  <div className="max-w-sm bg-paper p-6">
    <PostCard post={posts[0]} />
  </div>
);

// The /resources index grid.
export const Grid = () => (
  <div className="bg-paper p-6">
    <div className="grid gap-6 md:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  </div>
);
