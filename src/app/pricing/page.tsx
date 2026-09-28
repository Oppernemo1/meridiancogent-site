import { PricingPage, pricingMetadata } from "@/components/PricingPage";

export const metadata = pricingMetadata;

export default function Page() {
  return <PricingPage currency="EUR" />;
}
