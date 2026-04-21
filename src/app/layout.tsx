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
      <body className="flex flex-col min-h-[100dvh]">
        <I18nProvider>
          <EmergencyHotlines />
          <OfflineBanner />
          <Navbar />
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
