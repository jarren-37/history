import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { NavBar } from "@/components/NavBar";
import { ServiceWorker } from "@/components/ServiceWorker";

export const metadata: Metadata = {
  title: "Project Chronicle — The History Storybook",
  description:
    "An interactive animated storybook for Singapore O-Level Combined History (2261). Learn through story, not memorisation.",
  manifest: "/manifest.webmanifest",
  applicationName: "Project Chronicle",
  appleWebApp: {
    capable: true,
    title: "Chronicle",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash: apply stored theme before paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=JSON.parse(localStorage.getItem('chronicle:v1')||'{}');var d=s.theme?s.theme==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <AppProvider>
          <NavBar />
          <main className="min-h-screen">{children}</main>
          <ServiceWorker />
        </AppProvider>
      </body>
    </html>
  );
}
