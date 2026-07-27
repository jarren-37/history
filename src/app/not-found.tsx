import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <p className="text-6xl">🗝️</p>
        <h1 className="mt-4 font-display text-3xl font-black">
          This hall does not exist
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-[var(--text-soft)]">
          The shelves shift in the night, and the page you seek has wandered off.
          Let the Keeper guide you back.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-2xl bg-gradient-to-r from-[#e6c15a] to-[#b8892b] px-6 py-3 font-bold text-[#2a1a0a] transition-transform hover:scale-105"
        >
          ← Back to the Great Hall
        </Link>
      </div>
    </div>
  );
}
