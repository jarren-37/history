import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROOMS, getRoom } from "@/content/english/rooms";
import { RoomView } from "@/components/english/RoomView";

export function generateStaticParams() {
  return ROOMS.map((r) => ({ id: r.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const room = getRoom(params.id);
  return {
    title: room ? `${room.name} — Lexicon` : "Lexicon",
    description: room?.tagline,
  };
}

export default function RoomPage({ params }: { params: { id: string } }) {
  const room = getRoom(params.id);
  if (!room) notFound();
  return <RoomView room={room} />;
}
