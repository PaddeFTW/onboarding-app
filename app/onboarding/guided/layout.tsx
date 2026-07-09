import { GuidedOnboardingProvider } from "@/components/providers/guided-onboarding-provider";

export default function GuidedOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuidedOnboardingProvider>{children}</GuidedOnboardingProvider>;
}
