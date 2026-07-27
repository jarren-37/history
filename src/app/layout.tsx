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
  title: "Lexicon — The Vocabulary Adventure",
  description:
    "An enchanted library where words are treasures. Discover, collect and master English vocabulary for the Singapore O-Level — and for life. Learn through play, not memorisation.",
  manifest: "/manifest.webmanifest",
  applicationName: "Lexicon",
  appleWebApp: {
    capable: true,
    title: "Lexicon",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3a2412" },
    { media: "(prefers-color-scheme: dark)", color: "#14130a" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
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
            __html: `(function(){try{var s=JSON.parse(localStorage.getItem('lexicon:v1')||'{}');var d=s.theme?s.theme==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
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
