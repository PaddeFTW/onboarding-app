import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppBrand } from "@/components/app-brand";
import { Toaster } from "@/components/ui/sonner";
import { OnboardingProvider } from "@/components/providers/onboarding-provider";
import { GuidedOnboardingProvider } from "@/components/providers/guided-onboarding-provider";
import { Installer } from "@/components/installer";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onboarding",
  description: "En lugn och välkomnande app för onboarding av nya medarbetare.",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
  },
};

const themeBootScript = `
(function () {
  try {
    var stored = localStorage.getItem("app.theme") || "system";
    var dark = stored === "dark" || (stored === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <LocaleProvider>
            <OnboardingProvider>
              <GuidedOnboardingProvider>
                <AppBrand />
                {children}
                <Toaster />
                <Installer />
              </GuidedOnboardingProvider>
            </OnboardingProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
