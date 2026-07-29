"use client";

import { useAtelier } from "@/lib/chemistry/store";
import { SciNavBar, type SciNavLink } from "@/components/science/SciNavBar";

const LINKS: SciNavLink[] = [
  { href: "/chemistry/lab/bonding", label: "Bonding", icon: "⚛️" },
  { href: "/chemistry/lab/reaction", label: "Reactions", icon: "⚗️" },
  { href: "/chemistry/lab/energy", label: "Energy", icon: "🔥" },
  { href: "/chemistry/lab/electrolysis", label: "Electrolysis", icon: "⚡" },
  { href: "/chemistry/lab/organic", label: "Organic", icon: "🧬" },
  { href: "/chemistry/lab/periodic", label: "Table", icon: "🔮" },
  { href: "/chemistry/lab/separation", label: "Separation", icon: "🧫" },
  { href: "/chemistry/games", label: "Games", icon: "🎲" },
  { href: "/chemistry/masterpiece", label: "Masterpiece", icon: "🏆" },
];

export function NavBar() {
  const { soundOn, toggleSound, hydrated } = useAtelier();
  return (
    <SciNavBar
      brand="Atelier"
      motif="🧪"
      homeHref="/chemistry"
      links={LINKS}
      soundOn={soundOn}
      toggleSound={toggleSound}
      hydrated={hydrated}
    />
  );
}
