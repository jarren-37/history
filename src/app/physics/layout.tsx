import { ObservatoryProvider } from "@/lib/physics/store";
import { NavBar } from "@/components/physics/NavBar";
import { Ambience } from "@/components/physics/Ambience";
import { PHYSICS_THEME, PHYSICS_BG } from "@/content/science/themes";

/** The Inventor's Observatory (Physics) — its own steampunk, electric-blue world. */
export default function PhysicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ObservatoryProvider>
      <div style={{ ...PHYSICS_THEME, background: PHYSICS_BG, minHeight: "100vh" }}>
        <NavBar />
        <main className="min-h-screen">{children}</main>
      </div>
      <Ambience />
    </ObservatoryProvider>
  );
}
