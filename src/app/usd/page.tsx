import { HomePage, homeMetadata } from "@/components/HomePage";

/**
 * USD variant of the homepage (only the pricing strip differs). Not linked
 * anywhere: middleware rewrites / here for US visitors, and redirects direct
 * requests for this path back to /, so the public URL is always /.
 */
export const metadata = homeMetadata;

export default function Page() {
  return <HomePage currency="USD" />;
}
