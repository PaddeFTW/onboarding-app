import { GuidedOnboardingProvider } from "@/components/providers/guided-onboarding-provider";

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuidedOnboardingProvider>{children}</GuidedOnboardingProvider>;
}
