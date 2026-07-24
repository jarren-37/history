"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CornerFlourish, Candle, DustMotes } from "./Ornaments";

/**
 * The home experience: a thick leather-bound book resting on a candlelit desk.
 * The student clicks the brass lock; the clasp releases and the heavy cover
 * swings open with weight — then `onOpened` reveals the table of contents.
 */
export function BookCover({ onOpened }: { onOpened: () => void }) {
  const [state, setState] = useState<"closed" | "opening">("closed");
  const reduce = useReducedMotion();

  const open = () => {
    if (state !== "closed") return;
    if (reduce) {
      onOpened();
      return;
    }
    setState("opening");
  };

  return (
    <div className="relative flex min-h-[calc(100vh-40px)] flex-col items-center justify-center px-4">
      <DustMotes count={22} />

      {/* candle to the side */}
      <div className="pointer-events-none absolute bottom-[12%] right-[8%] hidden h-40 w-20 sm:block md:right-[14%]">
        <Candle className="h-full w-full" />
      </div>

      {/* warm desk glow under the book */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,190,110,0.22), transparent 62%)",
          filter: "blur(30px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        style={{ perspective: "2200px" }}
      >
        {/* soft cast shadow on the desk */}
        <div
          className="absolute -bottom-8 left-1/2 h-10 w-[80%] -translate-x-1/2 rounded-[50%]"
          style={{ background: "rgba(0,0,0,0.5)", filter: "blur(18px)" }}
        />

        {/* the book */}
        <div
          className="relative"
          style={{
            width: "min(76vw, 340px)",
            height: "min(101vw, 452px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* page block (right edge shows paper thickness) */}
          <div
            className="absolute inset-0 rounded-r-[10px] rounded-l-[6px]"
            style={{
              background:
                "repeating-linear-gradient(90deg,#efe1c0 0px,#efe1c0 2px,#e2d0a4 2px,#e2d0a4 4px)",
              transform: "translateX(8px)",
              boxShadow: "inset -6px 0 12px rgba(120,85,40,0.35)",
            }}
          />
          {/* first parchment page revealed under the cover */}
          <div className="absolute inset-0 overflow-hidden rounded-[8px] page">
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <p className="font-hand text-2xl text-[var(--ink-soft)]">
                …the story begins…
              </p>
            </div>
          </div>

          {/* FRONT COVER — swings open on the spine (left) */}
          <motion.div
            onClick={open}
            initial={false}
            animate={
              state === "opening"
                ? { rotateY: -162 }
                : reduce
                ? { rotateY: 0 }
                : { rotateY: [0, -3, 0] }
            }
            transition={
              state === "opening"
                ? { duration: 1.5, ease: [0.5, 0, 0.2, 1] }
                : { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }
            onAnimationComplete={() => {
              if (state === "opening") setTimeout(onOpened, 120);
            }}
            className="group absolute inset-0 cursor-pointer rounded-[10px]"
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            role="button"
            aria-label="Open the book"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
          >
            {/* leather */}
            <div
              className="leather absolute inset-0 overflow-hidden rounded-[10px]"
              style={{
                borderRadius: "6px 12px 12px 6px",
                boxShadow:
                  "inset 0 0 0 1px rgba(255,215,150,0.15), inset 8px 0 14px rgba(0,0,0,0.4), 0 20px 50px -18px rgba(0,0,0,0.7)",
              }}
            >
              {/* spine band */}
              <div
                className="absolute inset-y-0 left-0 w-5"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.4), rgba(255,210,140,0.1))",
                }}
              />
              {/* raised bands on spine */}
              {[18, 38, 62, 82].map((t) => (
                <div
                  key={t}
                  className="absolute left-0 h-2 w-5"
                  style={{ top: `${t}%`, background: "rgba(255,210,140,0.18)" }}
                />
              ))}

              {/* gold ruled frame */}
              <div
                className="absolute inset-4 rounded-md"
                style={{ border: "1.5px solid var(--gold)", opacity: 0.7 }}
              />
              <div
                className="absolute inset-[22px] rounded-sm"
                style={{ border: "1px solid var(--gold)", opacity: 0.4 }}
              />

              {/* corner flourishes */}
              <CornerFlourish className="absolute left-3 top-3 h-10 w-10" />
              <CornerFlourish className="absolute right-3 top-3 h-10 w-10 -scale-x-100" />
              <CornerFlourish className="absolute bottom-3 left-3 h-10 w-10 -scale-y-100" />
              <CornerFlourish className="absolute bottom-3 right-3 h-10 w-10 -scale-100" />

              {/* title block */}
              <div className="absolute inset-x-0 top-[26%] flex flex-col items-center px-6 text-center">
                <p className="gold-text font-display text-[11px] font-bold uppercase tracking-[0.35em]">
                  A History Of
                </p>
                <h1 className="gold-text mt-3 font-display text-4xl font-black leading-[0.95] sm:text-5xl">
                  Project
                  <br />
                  Chronicle
                </h1>
                <div className="mt-4 h-px w-24 bg-[var(--gold)] opacity-60" />
                <p className="mt-3 max-w-[80%] font-hand text-lg text-[#e8cfa0]">
                  the war &amp; the long cold peace
                </p>
              </div>

              {/* emblem */}
              <div className="absolute inset-x-0 bottom-[16%] flex justify-center">
                <svg viewBox="0 0 60 60" className="h-14 w-14" aria-hidden>
                  <circle cx="30" cy="30" r="26" fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity="0.7" />
                  <path d="M30 10 L30 50 M14 22 Q30 14 46 22 M14 38 Q30 46 46 38" stroke="var(--gold)" strokeWidth="1.2" fill="none" opacity="0.8" />
                  <circle cx="30" cy="30" r="4" fill="var(--gold)" />
                </svg>
              </div>

              {/* hint */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="absolute inset-x-0 bottom-4 text-center font-hand text-base text-[#e8cfa0]"
              >
                click the lock to open
              </motion.div>
            </div>

            {/* BRASS CLASP + LOCK on the right edge */}
            <div
              className="absolute right-[-10px] top-1/2 -translate-y-1/2"
              style={{ transform: "translateZ(2px)" }}
            >
              <motion.div
                animate={
                  state === "opening"
                    ? { rotate: -35, x: 6, opacity: 0 }
                    : { rotate: 0, x: 0, opacity: 1 }
                }
                transition={{ duration: 0.5 }}
                className="grid h-14 w-9 place-items-center rounded-md"
                style={{
                  background: "linear-gradient(180deg,#e6c15a,#8a5f1a)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,240,190,0.6)",
                }}
              >
                <div className="h-5 w-5 rounded-full border-2 border-[#5c3d0f] bg-[#c9a227]" />
                <div className="absolute bottom-1 h-2 w-1 rounded-sm bg-[#5c3d0f]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative mt-16 text-center font-hand text-xl text-[#e6c9a0]/80"
      >
        Singapore O-Level Combined History · 2261
      </motion.p>
    </div>
  );
}
