import { ChecklistView } from "@/components/onboarding/ChecklistView";

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ChecklistView id={id} />;
}
