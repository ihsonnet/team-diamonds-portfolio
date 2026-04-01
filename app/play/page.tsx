import { redirect } from "next/navigation";
import { DEMO_VIDEO_URL } from "@/lib/externalLinks";

export default function PlayPage() {
  redirect(DEMO_VIDEO_URL);
}
