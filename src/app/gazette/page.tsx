import type { Metadata } from "next";
import { Feed } from "@/components/gazette/Feed";

export const metadata: Metadata = {
  title: "The Gazette — The Athenaeum",
  description:
    "A swipeable feed of real headlines from trusted newsrooms — The Straits Times, CNA, BBC, The Guardian and more — each linking to the full story.",
};

export default function GazettePage() {
  return <Feed />;
}
