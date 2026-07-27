import { AppProvider } from "@/lib/english/store";
import { NavBar } from "@/components/english/NavBar";
import { Ambience } from "@/components/english/Ambience";

/**
 * Lexicon (English) — its own self-contained world inside The Athenaeum,
 * with its own state, navigation and ambient audio.
 */
export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <NavBar />
      <main className="min-h-screen">{children}</main>
      <Ambience />
    </AppProvider>
  );
}
