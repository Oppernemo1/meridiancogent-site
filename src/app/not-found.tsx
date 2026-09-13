import Link from "next/link";
import { Container } from "@/components/Container";
import { LineGraphMotif } from "@/components/LineGraphMotif";

export default function NotFound() {
  return (
    <div className="py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <LineGraphMotif
            variant="advisory"
            tone="faint"
            strokeWidth={5}
            className="mx-auto h-20 w-40"
          />
          <p className="mt-6 text-small font-semibold uppercase tracking-wider text-muted">
            404
          </p>
          <h1 className="mt-2 text-h1-sm md:text-h1">
            This page isn&apos;t here.
          </h1>
          <p className="mt-4 text-body-sm leading-relaxed text-muted md:text-body">
            The link may be out of date, or the page may have moved. From here
            you can head back to the homepage or browse the resources.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/"
              className="bg-graphite px-5 py-3 text-body font-semibold text-on-dark-primary transition-colors hover:bg-graphite/90"
            >
              Back to home
            </Link>
            <Link
              href="/resources"
              className="text-body font-medium text-accent-dark underline underline-offset-4 hover:text-muted"
            >
              Browse resources
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
