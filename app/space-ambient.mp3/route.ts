import { createSilentWav } from "@/lib/silentAudio";

const SILENT_AUDIO = createSilentWav(1000);

export function GET() {
  return new Response(SILENT_AUDIO, {
    headers: {
      "Content-Type": "audio/wav",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
