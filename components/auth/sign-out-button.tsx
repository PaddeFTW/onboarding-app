"use client";

import { useRouter } from "next/navigation";

import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const { t } = useLocale();
  return (
    <Button
      onClick={() => {
        void createClient().auth.signOut().then(() => {
          router.push("/login");
          router.refresh();
        });
      }}
      type="button"
      variant="outline"
    >
      {t("common.signOut")}
    </Button>
  );
}
