import { AppProvider } from "@/lib/history/store";
import { NavBar } from "@/components/history/NavBar";
import { Ambience } from "@/components/history/Ambience";

/**
 * Chronicle (History) — its own self-contained world inside The Athenaeum,
 * with its own state, navigation and ambient audio.
 */
export default function HistoryLayout({
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
