import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <p className="text-6xl">🧭</p>
        <h1 className="mt-4 font-display text-3xl font-black">
          This page is lost to history
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-[var(--text-soft)]">
          The page you're looking for isn't part of the story. Let's head back to
          the library.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-2xl bg-gradient-to-r from-[var(--c-primary)] to-[var(--c-deep)] px-6 py-3 font-bold text-white transition-transform hover:scale-105"
        >
          ← Back to the library
        </Link>
      </div>
    </div>
  );
}
