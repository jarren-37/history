"use client";

import { useObservatory } from "@/lib/physics/store";
import { SciNavBar, type SciNavLink } from "@/components/science/SciNavBar";

const LINKS: SciNavLink[] = [
  { href: "/physics/lab/forces", label: "Forces", icon: "🚀" },
  { href: "/physics/lab/circuits", label: "Circuits", icon: "🔌" },
  { href: "/physics/lab/waves", label: "Waves", icon: "🌊" },
  { href: "/physics/lab/gravity", label: "Gravity", icon: "🪐" },
  { href: "/physics/lab/magnetism", label: "Magnetism", icon: "🧲" },
  { href: "/physics/games", label: "Games", icon: "🎲" },
  { href: "/physics/masterpiece", label: "Masterpiece", icon: "🏆" },
];

export function NavBar() {
  const { soundOn, toggleSound, hydrated } = useObservatory();
  return (
    <SciNavBar
      brand="Observatory"
      motif="⚡"
      homeHref="/physics"
      links={LINKS}
      soundOn={soundOn}
      toggleSound={toggleSound}
      hydrated={hydrated}
    />
  );
}
