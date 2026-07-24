import type { Metadata, Viewport } from "next";
import { Fraunces, EB_Garamond, Caveat } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { NavBar } from "@/components/NavBar";
import { ServiceWorker } from "@/components/ServiceWorker";
import { Ambience } from "@/components/Ambience";

// Decorative display serif for illuminated chapter titles.
const display = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  variable: "--font-display",
  display: "swap",
});

// Classic printed-book body serif.
const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Handwritten quill for margin notes and annotations.
const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hand",
  display: "swap",
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${serif.variable} ${hand.variable}`}
    >
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
          <Ambience />
          <ServiceWorker />
        </AppProvider>
      </body>
    </html>
  );
}
