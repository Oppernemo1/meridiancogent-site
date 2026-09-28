import { PricingPage, pricingMetadata } from "@/components/PricingPage";

/**
 * USD variant of /pricing. Not linked anywhere: middleware rewrites /pricing
 * here for US visitors, and redirects direct requests for this path back to
 * /pricing, so the public URL is always /pricing.
 */
export const metadata = pricingMetadata;

export default function Page() {
  return <PricingPage currency="USD" />;
}
