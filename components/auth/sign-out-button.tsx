"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
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
      Logga ut
    </Button>
  );
}
