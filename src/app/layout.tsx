import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EmergencyHotlines } from "@/components/ui/EmergencyHotlines";
import { OfflineBanner } from "@/components/ui/OfflineBanner";
import { I18nProvider } from "@/i18n/I18nProvider";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Bayanihan Health Portal | Medical Assistance Finder",
  description: "Hanapin ang pinakamalapit na opisina para sa tulong medikal at alamin ang mga kinakailangang dokumento para sa PCSO, DSWD, at Malasakit Centers.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bayanihan Health",
  },
};

export const viewport: Viewport = {
  themeColor: "#0038A8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fil" className={inter.variable}>
      <body className="flex flex-col min-h-[100dvh] bg-slate-50">
        <I18nProvider>
          <header className="sticky top-0 z-40 bg-transparent">
            <EmergencyHotlines />
            <OfflineBanner />
            <Navbar />
          </header>
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-6 md:py-10">
            {children}
            {/* Mobile: spacer so content clears the fixed bottom nav */}
            <div className="md:hidden h-20" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} aria-hidden="true" />
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}