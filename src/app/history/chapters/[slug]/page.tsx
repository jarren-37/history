import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CHAPTERS, getChapter } from "@/content/history/chapters";
import { StoryReader } from "@/components/history/StoryReader";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const chapter = getChapter(params.slug);
  if (!chapter) return { title: "Chapter · Project Chronicle" };
  return {
    title: `${chapter.title} · Project Chronicle`,
    description: chapter.subtitle,
  };
}

export default function ChapterPage({ params }: { params: { slug: string } }) {
  const chapter = getChapter(params.slug);
  if (!chapter) notFound();
  return <StoryReader chapter={chapter} />;
}
