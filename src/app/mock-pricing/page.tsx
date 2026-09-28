import type { Metadata } from "next";
import { PricingMockPage } from "@/components/PricingMockPage";
import { pricingMetadata } from "@/components/PricingPage";

/**
 * Review mock of the restructured /pricing. Same metadata as /pricing
 * (canonical /pricing), but kept out of search and the sitemap while it is
 * a mock. EUR by default; the switch works as on /pricing.
 */
export const metadata: Metadata = {
  ...pricingMetadata,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PricingMockPage currency="EUR" />;
}
