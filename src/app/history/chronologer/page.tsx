import type { Metadata } from "next";
import { Chronologer } from "@/components/history/Chronologer";

export const metadata: Metadata = {
  title: "The Chronologer — Chronicle",
  description:
    "Reassemble the scattered pages of the Chronicle by putting the events of 1919–1991 back in chronological order.",
};

export default function ChronologerPage() {
  return <Chronologer />;
}
