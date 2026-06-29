import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PageContainer } from "@/components/page-container";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { NewOnboardingForm } from "@/components/onboarding/NewOnboardingForm";

export default function NewOnboardingPage() {
  return (
    <PageContainer className="flex flex-col gap-8 sm:gap-10">
      <Button variant="ghost" size="sm" className="-ml-3 w-fit" asChild>
        <Link href="/">
          <ArrowLeft />
          Tillbaka
        </Link>
      </Button>

      <SectionHeader
        size="page"
        title="Ny onboarding"
        description="Fyll i uppgifterna nedan för att starta ett nytt onboarding-program."
      />

      <NewOnboardingForm />
    </PageContainer>
  );
}
