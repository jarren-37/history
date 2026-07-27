import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CHARACTERS, getCharacter } from "@/content/history/characters";
import { getChapter } from "@/content/history/chapters";
import { getPalette, paletteVars } from "@/content/history/palettes";
import { CharacterPortrait } from "@/components/history/CharacterPortrait";

export function generateStaticParams() {
  return CHARACTERS.map((c) => ({ id: c.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const c = getCharacter(params.id);
  if (!c) return { title: "Character · Project Chronicle" };
  return { title: `${c.name} · Project Chronicle`, description: c.tagline };
}

const SENTIMENT_LABEL: Record<string, string> = {
  friendly: "🤝",
  tense: "⚡",
  hostile: "⚔️",
};

const LISTS = [
  { key: "goals", title: "Goals", icon: "🎯" },
  { key: "beliefs", title: "Beliefs", icon: "💭" },
  { key: "actions", title: "Key actions", icon: "⚡" },
  { key: "consequences", title: "Consequences", icon: "🌊" },
] as const;

export default function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const c = getCharacter(params.id);
  if (!c) notFound();
  const p = getPalette(c.palette);

  return (
    <div style={paletteVars(c.palette)} className="pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-8">
        <div className="aurora" />
        <div className="relative mx-auto max-w-3xl">
          <Link
            href="/history/characters"
            className="inline-flex items-center gap-2 font-hand text-lg text-[#d8b978] hover:text-[#f2d98a]"
          >
            ← All characters
          </Link>
          <div className="mt-4 flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <CharacterPortrait
              id={c.id}
              size={132}
              className="shrink-0 drop-shadow-md"
            />
            <div>
              <p className="font-hand text-lg text-[#d8b978]">
                {c.country} · {c.years}
              </p>
              <h1 className="gold-text mt-1 font-display text-4xl font-black sm:text-5xl">
                {c.name}
              </h1>
              <p className="mt-2 font-serif text-lg italic text-[#e4cfa2]">
                {c.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-8 max-w-3xl space-y-6 px-4">
        {/* Bio */}
        <div className="card rounded-3xl p-6">
          <p className="text-lg leading-relaxed text-[var(--text-soft)]">
            {c.bio}
          </p>
        </div>

        {/* Attribute lists */}
        <div className="grid gap-4 sm:grid-cols-2">
          {LISTS.map((section) => (
            <div key={section.key} className="card rounded-3xl p-5">
              <p className="mb-3 flex items-center gap-2 font-display text-lg font-extrabold">
                <span>{section.icon}</span>
                {section.title}
              </p>
              <ul className="space-y-2">
                {c[section.key].map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--c-primary)]" />
                    <span className="text-[var(--text-soft)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Relationships */}
        {c.relationships.length > 0 && (
          <div className="card rounded-3xl p-6">
            <p className="mb-4 flex items-center gap-2 font-display text-lg font-extrabold">
              <span>🔗</span> Relationships
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {c.relationships.map((rel, i) => {
                const other = getCharacter(rel.to);
                if (!other) return null;
                return (
                  <Link
                    key={i}
                    href={`/history/characters/${other.id}`}
                    className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--c-surface)] px-4 py-3 transition-transform hover:-translate-y-0.5"
                  >
                    <CharacterPortrait
                      id={other.id}
                      size={40}
                      breathing={false}
                      ring={false}
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-bold">
                        {other.name}
                      </span>
                      <span className="text-xs font-semibold text-[var(--text-faint)]">
                        {SENTIMENT_LABEL[rel.sentiment]} {rel.relation}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Appears in */}
        <div className="card rounded-3xl p-6">
          <p className="mb-4 flex items-center gap-2 font-display text-lg font-extrabold">
            <span>📖</span> Appears in
          </p>
          <div className="flex flex-wrap gap-2">
            {c.chapters.map((slug) => {
              const ch = getChapter(slug);
              if (!ch) return null;
              const cp = getPalette(ch.palette);
              return (
                <Link
                  key={slug}
                  href={`/history/chapters/${slug}`}
                  className="flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-bold transition-colors hover:bg-[var(--c-surface)]"
                >
                  <span>{cp.motif}</span> {ch.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
