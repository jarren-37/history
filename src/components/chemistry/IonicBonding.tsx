"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAtelier } from "@/lib/chemistry/store";
import { getStation } from "@/content/chemistry/stations";
import { playZap, playChime } from "@/lib/sound";
import {
  SciPanel,
  StationTopBar,
  StationHeading,
  WhyGate,
  CompleteButton,
} from "@/components/science/ui";

type Phase = "idle" | "reacting" | "done";

/** Place `n` electron dots evenly around a circle. */
function shell(cx: number, cy: number, r: number, n: number, phase = 0) {
  return Array.from({ length: n }, (_, i) => {
    const a = phase + (i / n) * Math.PI * 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
}

function Atom({
  cx,
  label,
  shells,
  charge,
  color,
}: {
  cx: number;
  label: string;
  shells: number[];
  charge?: string;
  color: string;
}) {
  const cy = 150;
  const radii = [26, 44, 62];
  return (
    <g>
      {radii.slice(0, shells.length).map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="var(--sci-border)" strokeWidth="1" />
      ))}
      <circle cx={cx} cy={cy} r={18} fill={color} />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill="#0c0c0c">
        {label}
      </text>
      {charge && (
        <text x={cx + 22} y={cy - 22} textAnchor="middle" fontSize="18" fontWeight="800" fill="var(--sci-accent)">
          {charge}
        </text>
      )}
      {shells.map((count, si) =>
        shell(cx, cy, radii[si], count, si * 0.6).map((p, i) => (
          <circle key={`${si}-${i}`} cx={p.x} cy={p.y} r="4" fill="var(--sci-accent2)" />
        ))
      )}
    </g>
  );
}

export function IonicBonding() {
  const { isDone, complete } = useAtelier();
  const st = getStation("bonding")!;
  const [phase, setPhase] = useState<Phase>("idle");
  const [understood, setUnderstood] = useState(false);
  const done = isDone("bonding");

  function react() {
    if (phase !== "idle") return;
    setPhase("reacting");
    playZap();
    setTimeout(() => {
      playChime(true);
      setPhase("done");
    }, 1700);
  }

  // Na outer electron start (on Na's 3rd shell) → Cl outer shell target.
  const naOuter = shell(170, 150, 62, 1, 0.6 * 2)[0];
  const clTarget = shell(430, 150, 62, 8, 0.6 * 2)[7];

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/chemistry" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        Sodium has a single, lonely electron in its outer shell. Chlorine needs
        exactly one more to be complete. Watch what happens when they meet.
      </StationHeading>

      <SciPanel className="overflow-hidden">
        <svg viewBox="0 0 600 300" className="w-full">
          {/* atoms */}
          <Atom
            cx={170}
            label="Na"
            shells={phase === "done" ? [2, 8] : [2, 8, 1]}
            charge={phase === "done" ? "+" : undefined}
            color="#e0913f"
          />
          <Atom
            cx={430}
            label="Cl"
            shells={phase === "done" ? [2, 8, 8] : [2, 8, 7]}
            charge={phase === "done" ? "−" : undefined}
            color="#4bbf7a"
          />
          {/* flying electron */}
          {phase === "reacting" && (
            <motion.circle
              r="5"
              fill="#fff"
              initial={{ cx: naOuter.x, cy: naOuter.y }}
              animate={{ cx: clTarget.x, cy: clTarget.y }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 6px #fff)" }}
            />
          )}
          {/* ionic attraction when done */}
          {phase === "done" && (
            <motion.line
              x1="212" y1="150" x2="388" y2="150"
              stroke="var(--sci-accent)" strokeWidth="2" strokeDasharray="6 6"
              initial={{ opacity: 0 }} animate={{ opacity: 0.8 }}
            />
          )}
        </svg>

        <div className="mt-2 text-center">
          {phase === "idle" && (
            <button
              onClick={react}
              className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105"
              style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}
            >
              ⚡ Bring them together
            </button>
          )}
          {phase === "reacting" && <p className="opacity-80">The electron leaps across…</p>}
          {phase === "done" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="font-display text-xl font-bold" style={{ color: "var(--sci-accent)" }}>
                Na⁺ and Cl⁻ — an ionic bond!
              </p>
              <p className="mt-1 text-sm opacity-80">
                Opposite charges attract. Millions of these ions stack into a
                giant lattice — a crystal of common salt, NaCl.
              </p>
            </motion.div>
          )}
        </div>
      </SciPanel>

      {phase === "done" && (
        <div className="mt-4">
          <WhyGate
            question="Why did sodium give its electron away rather than keep it?"
            options={[
              "Losing 1 electron leaves Na with a full, stable outer shell",
              "Sodium electrons are negatively charged and heavy",
              "Chlorine physically pulls the whole atom apart",
              "It happens completely at random",
            ]}
            answer={0}
            explain="Atoms react to reach a full outer shell. Na loses 1 electron to expose a full shell beneath; Cl gains 1 to fill its outer shell. Both become stable ions."
            onResolved={() => setUnderstood(true)}
          />
        </div>
      )}

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!understood}
          onComplete={() => complete("bonding", st.xp)}
          nextHref="/chemistry/lab/reaction"
          hint="Complete the reaction and the question first."
        />
      </div>
    </div>
  );
}
