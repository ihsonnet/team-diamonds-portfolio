import { redirect } from "next/navigation";
import { MAGAZINE_URL } from "@/lib/externalLinks";

export default function MagazinePage() {
  redirect(MAGAZINE_URL);
}
