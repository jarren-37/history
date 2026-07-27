import type { Metadata, Viewport } from "next";
import { Fraunces, EB_Garamond, Caveat } from "next/font/google";
import "./globals.css";
import { ServiceWorker } from "@/components/ServiceWorker";

// Decorative display serif for illuminated titles.
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
  title: "The Athenaeum — a hall of all knowledge",
  description:
    "The Athenaeum is a candlelit hall where every subject is its own world: Chronicle (History), Lexicon (English), and — soon — the Alchemist's Atelier (Chemistry) and the Inventor's Observatory (Physics). Learn through story and play, not memorisation.",
  manifest: "/manifest.webmanifest",
  applicationName: "The Athenaeum",
  appleWebApp: {
    capable: true,
    title: "Athenaeum",
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
        {/* Prevent theme flash: apply the right subject's stored theme before
            paint, chosen by the URL (each subject persists its own theme). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname;var k=p.indexOf('/history')===0?'chronicle:v1':p.indexOf('/english')===0?'lexicon:v1':'athenaeum:v1';var s=JSON.parse(localStorage.getItem(k)||'{}');var d=s.theme?s.theme==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
