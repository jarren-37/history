"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAtelier } from "@/lib/chemistry/store";
import { getStation } from "@/content/chemistry/stations";
import { playBubble, playChime } from "@/lib/sound";
import {
  SciPanel,
  StationTopBar,
  StationHeading,
  WhyGate,
  CompleteButton,
} from "@/components/science/ui";

export function ReactionCauldron() {
  const { isDone, complete } = useAtelier();
  const st = getStation("reaction")!;
  const [poured, setPoured] = useState(false);
  const [tested, setTested] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const done = isDone("reaction");

  function pour() {
    if (poured) return;
    setPoured(true);
    playBubble();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <StationTopBar backHref="/chemistry" />
      <StationHeading icon={st.icon} topic={st.topic} title={st.name}>
        Zinc granules rest at the bottom of the cauldron. Pour in hydrochloric
        acid and watch the reaction come alive.
      </StationHeading>

      <SciPanel>
        <div className="flex items-end justify-center gap-8">
          {/* beaker */}
          <svg viewBox="0 0 180 220" width="180" height="220">
            <path d="M30 20 h120 v10 l-14 160 a10 10 0 0 1 -10 10 h-72 a10 10 0 0 1 -10 -10 l-14 -160 z"
              fill="none" stroke="var(--sci-ink)" strokeWidth="2" opacity="0.7" />
            {/* liquid */}
            {poured && (
              <motion.path
                d="M36 70 l10 118 a8 8 0 0 0 8 8 h64 a8 8 0 0 0 8 -8 l10 -118 z"
                fill="var(--sci-accent)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
              />
            )}
            {/* zinc granules */}
            {[70, 90, 110].map((x, i) => (
              <motion.rect
                key={i}
                x={x} width="12" height="8" rx="2"
                fill="#9aa7b0"
                animate={poured ? { y: [188, 188], width: [12, 5], opacity: [1, 0.5] } : { y: 188 }}
                transition={{ duration: 6, delay: i * 0.3 }}
              />
            ))}
            {/* rising hydrogen bubbles */}
            {poured &&
              Array.from({ length: 9 }).map((_, i) => (
                <motion.circle
                  key={i}
                  cx={60 + (i % 5) * 15}
                  r={2 + (i % 3)}
                  fill="#fff"
                  opacity={0.8}
                  initial={{ cy: 185 }}
                  animate={{ cy: 75, opacity: [0.9, 0] }}
                  transition={{ duration: 1.4 + (i % 4) * 0.3, repeat: Infinity, delay: i * 0.25 }}
                />
              ))}
          </svg>

          {/* delivery tube + test tube collecting gas */}
          <svg viewBox="0 0 90 220" width="90" height="220">
            <path d="M-30 90 q60 -30 60 20 v10" fill="none" stroke="var(--sci-ink)" strokeWidth="2" opacity="0.5" />
            <rect x="18" y="40" width="34" height="150" rx="16" fill="none" stroke="var(--sci-ink)" strokeWidth="2" opacity="0.7" />
            {/* gas fills from top */}
            {poured && (
              <motion.rect
                x="20" width="30" rx="14"
                fill="var(--sci-accent2)"
                opacity="0.3"
                initial={{ y: 188, height: 0 }}
                animate={{ y: 44, height: 144 }}
                transition={{ duration: 4, ease: "easeOut" }}
              />
            )}
            <text x="35" y="210" textAnchor="middle" fontSize="10" fill="var(--sci-ink)" opacity="0.7">H₂</text>
          </svg>
        </div>

        <div className="mt-3 text-center">
          {!poured ? (
            <button
              onClick={pour}
              className="rounded-full px-6 py-3 font-display font-extrabold shadow-lg transition-transform hover:scale-105"
              style={{ background: "var(--sci-accent)", color: "#0c0c0c" }}
            >
              🧴 Pour the acid
            </button>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="font-mono text-lg font-bold" style={{ color: "var(--sci-accent)" }}>
                Zn + 2HCl → ZnCl₂ + H₂↑
              </p>
              <p className="mt-1 text-sm opacity-80">Fizzing! The zinc dissolves and a gas bubbles up the tube.</p>
              {!tested ? (
                <button
                  onClick={() => { setTested(true); playChime(true); }}
                  className="mt-3 rounded-full border-2 px-5 py-2 font-bold transition-transform hover:scale-105"
                  style={{ borderColor: "var(--sci-accent)", color: "var(--sci-ink)" }}
                >
                  🔥 Test the gas with a lit splint
                </button>
              ) : (
                <p className="mt-3 font-hand text-2xl" style={{ color: "var(--sci-accent)" }}>
                  &ldquo;Squeaky pop!&rdquo; — it&apos;s hydrogen. ✓
                </p>
              )}
            </motion.div>
          )}
        </div>
      </SciPanel>

      {poured && (
        <div className="mt-4">
          <WhyGate
            question="Why is a gas forming when zinc meets the acid?"
            options={[
              "Zinc is more reactive, so it displaces hydrogen from the acid",
              "The acid is boiling and turning to steam",
              "Zinc melts and evaporates into a gas",
              "The beaker traps air and releases it",
            ]}
            answer={0}
            explain="Zinc is more reactive than hydrogen, so it takes the acid's place and pushes hydrogen out as H₂ gas. The 'squeaky pop' test confirms hydrogen."
            onResolved={() => setUnderstood(true)}
          />
        </div>
      )}

      <div className="mt-5">
        <CompleteButton
          done={done}
          xp={st.xp}
          disabled={!understood}
          onComplete={() => complete("reaction", st.xp)}
          nextHref="/chemistry/lab/energy"
          hint="Pour the acid and answer the question first."
        />
      </div>
    </div>
  );
}
