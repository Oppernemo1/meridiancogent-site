// Browser stand-in for next/link: Claude Design has no Next router, so Link
// renders the plain anchor it produces in the site's static output.
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string | { pathname?: string };
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  children?: ReactNode;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, prefetch: _p, replace: _r, scroll: _s, ...rest },
  ref,
) {
  const url = typeof href === "string" ? href : href.pathname ?? "#";
  return <a ref={ref} href={url} {...rest} />;
});

export default Link;
