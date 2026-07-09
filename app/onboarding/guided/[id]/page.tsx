import { GuidedOnboardingView } from "@/components/onboarding/guided/GuidedOnboardingView";

export default async function GuidedOnboardingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <GuidedOnboardingView id={id} />;
}
