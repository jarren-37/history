import { AtelierProvider } from "@/lib/chemistry/store";
import { NavBar } from "@/components/chemistry/NavBar";
import { Ambience } from "@/components/chemistry/Ambience";
import { CHEMISTRY_THEME, CHEMISTRY_BG } from "@/content/science/themes";

/** The Alchemist's Atelier (Chemistry) — its own nocturnal, copper-lit world. */
export default function ChemistryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AtelierProvider>
      <div style={{ ...CHEMISTRY_THEME, background: CHEMISTRY_BG, minHeight: "100vh" }}>
        <NavBar />
        <main className="min-h-screen">{children}</main>
      </div>
      <Ambience />
    </AtelierProvider>
  );
}
