import { Suspense } from "react";

import { CompanyRegistryAdmin } from "@/components/company/CompanyRegistryAdmin";
import { LoadingState } from "@/components/loading-state";
import { PageContainer } from "@/components/page-container";

export default function ForetagsregisterPage() {
  return (
    <Suspense
      fallback={
        <PageContainer>
          <LoadingState />
        </PageContainer>
      }
    >
      <CompanyRegistryAdmin />
    </Suspense>
  );
}
