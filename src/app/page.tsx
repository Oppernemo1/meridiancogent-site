import { HomePage, homeMetadata } from "@/components/HomePage";

export const metadata = homeMetadata;

export default function Page() {
  return <HomePage currency="EUR" />;
}
