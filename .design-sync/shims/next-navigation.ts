// Browser stand-in for next/navigation: outside Next there is no route, so
// the pathname is the site root (no nav item is marked active).
export function usePathname(): string {
  return "/";
}
